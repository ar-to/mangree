var gulp = require('gulp');//main
var filter = require('gulp-filter');//filters files with globs
var pump = require('pump');//used only on uglify
var sass = require('gulp-sass');//using
var autoprefixer = require('gulp-autoprefixer');//using
var pug = require('gulp-pug');//using
var pugInheritance = require('gulp-pug-inheritance');//compile only changed files
var sourcemaps = require('gulp-sourcemaps');//using
var requirejsOptimize = require('gulp-requirejs-optimize');//using;optimizes modules individually & bundle (minify)
var path = require("path");//using for callback for pug task
var browserSync = require('browser-sync').create();
//build packages
var useref = require('gulp-useref');//https://www.npmjs.com/package/gulp-useref
var uglify = require('gulp-uglify');//used only as needed for dist js vendor files; https://www.npmjs.com/package/gulp-uglify
var gulpIf = require('gulp-if');//https://github.com/robrich/gulp-if
var cssnano = require('gulp-cssnano');//https://www.npmjs.com/package/gulp-cssnano
var imagemin = require('gulp-imagemin');//https://www.npmjs.com/package/gulp-imagemin
var cache = require('gulp-cache');//to help speed up image optimization; https://www.npmjs.com/package/gulp-cache
//cleaning
var del = require('del');//delete files/directories w/globs; https://www.npmjs.com/package/del
//build
var runSequence = require('run-sequence');//run tasks in order; https://www.npmjs.com/package/run-sequence

var paths = {
  sass: ['./src/sass/**/*.sass'],
  //sass: ['./src/sass/main.sass'],
  pugPartials: ['./src//pug/**/*.pug'],
  pugMain: ['./src/pug/*.pug'],
  //pug: ['./src/pug/**/!(_)*.pug'],//takes all files in all directories; exclude by !(_)*.pug if not using gulp-filter; does not work with watch
  require: ['./src/js/**/*.js'],
  html: ['./dist/*.html'],
  css: ['./dist/**/*.css'],
  js: ['./dist/js/*.js']
};
//$ gulp sass works
gulp.task('sass', function () {
  //return gulp.src('./sass/**/*.scss')
  return gulp.src(paths.sass)
  //sourcemaps works
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())//add prefixes to css for browser not supporting new features; see http://shouldiprefix.com/
    .pipe(sourcemaps.write('../sourcemaps'))//writes sourcemaps to directory:relative to dest!!
    .pipe(gulp.dest('./dist/css'));//relative to gulpfile

});
//$ gulp pug works
gulp.task('pug', function(done) {
  //gulp.src('./pug/**/*.pug')
 return gulp.src(paths.pugMain)
  //return gulp.src(paths.pug)//used when gulp.dest w/o callback is used; comment .on();
  //filter out partials (folders and files starting with "_" )
    //.pipe(filter(function (file) {
            //return !/\/_/.test(file.path) && !/^_/.test(file.relative);//only works on OSX?? but needs to remove !(_) from paths.pug
    //}))
    .pipe(pug({
      //pug options as objects
      pretty: ['true'],//beautifies compiled *.html
    }))
    //.pipe(pugInheritance({basedir: './src/pug/', skip: 'node_modules'}))
    .pipe(gulp.dest('./dist/'));//used with return gulp.src
    //.pipe(gulp.dest(callback))//remove return from gulp.src() to avoid returning stream and confusing gulp
    //.on('end', done);
});

gulp.task('requireopt', function () {
    /*return gulp.src('./src/modules/*.js')
        .pipe(requirejsOptimize())
        .pipe(gulp.dest('./dist2'));*/
    return gulp.src('./src/js/require.config.js')//relative to gulpfile
    .pipe(sourcemaps.init())//pipes inside here will contain sourcemps; comment to remove
    .pipe(requirejsOptimize(function(file) {
      return {
        baseUrl: "./src/js/lib",//relative to gulpfile
        //mainConfigFile is relative to gulpfile; used to tell optimizer to read the main.js file 
        //used for requirejs module loading; needed for shim see:http://www.requirejs.org/docs/optimization.html#mainConfigFile
        mainConfigFile: './src/js/require.config.js',//relative to gulpfile
        paths: {
          nav: 'modules/navmod',//relative to baseUrl
          smoothscll: 'modules/smoothscroll',
          nav_color: 'modules/nav_color'
        },
        include: ['../require.config'],//relative to baseUrl
        name: "../../../tools/almond",//relative to baseURL
        out: "mangree.js"//relative to gulpfile.js or gulp.dest()
      };
    }))
    .pipe(sourcemaps.write('../sourcemaps'))//writes sourcemaps to directory:relative to gulp.dest()!!; comment to remove
    .pipe(gulp.dest('./dist/js'));//output directory
});

//$ gulp watch works
gulp.task('watch', ['sass', 'pug', 'requireopt'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.pugPartials, ['pug']);
  gulp.watch(paths.pugMain, ['pug']);
  gulp.watch(paths.require, ['requireopt']);
});
gulp.task('watchsass', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});
//only pug watch
gulp.task('watchpug', ['pug'], function() {
  gulp.watch(paths.pug, ['pug']);
});
//js watch
gulp.task('watchjs', ['requireopt'], function() {
  gulp.watch(paths.require, ['requireopt']);
});
//not used unless folders are desired for compiled *.html files
/*function callback(file) {//not being used!!
  if (file.path.search('index') !== -1) {//if path is index then return to directory
    //return './www/app/';
    return './dist/templates/';//excluded index.html goes here
  }
  var folder = path.basename(file.path).replace(/\..*html/, '/');
  //return './www/app/' + folder;
  return './dist/templates/' + folder;//used to organize compiled *.html into folders
}*/
//copy global files to dist
gulp.task('css-files', function() {
  gulp.src('./src/css/*.css')
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('js-files', function() {
  gulp.src(['./src/js/*.js', '!./src/js/require.config.js'])
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('img-files', function() {
  gulp.src('./src/images/**/*.+(png|jpg|gif|svg)')
  .pipe(gulp.dest('./dist/images'));
});

gulp.task('copy-all', function (callback) {
  runSequence(
    'css-files', 
    'js-files', 
    'img-files',
    callback
  )
})

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
      //browser: ["chrome", "firefox", "microsoft edge"],
      browser: ["chrome"],
      server: {
          baseDir: "./dist/"
      }
    });
});

//tasks for optimization/production
//based on https://css-tricks.com/gulp-for-beginners/

//useref for concatenating js/css files from different directories
gulp.task('useref', function(){
  return gulp.src('dist/index.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('public'))
});
//optimize images w/options for each type plus cache to speed up process
gulp.task('images', function(){
  return gulp.src('dist/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('public/images'))
});
//clear cache
gulp.task('cache:clear', function (done) {
return cache.clearAll(done)
})
//clean: delete directory when not in use
gulp.task('clean:dist', function() {
  return del.sync('dist');
})
gulp.task('clean:public', function() {
  return del.sync('public');
})

//===Build tasks

//$ gulp ; creates dist folder with all files + global copies
gulp.task('default', ['sass', 'pug', 'requireopt', 'copy-all']);

//Run server to auto update browser upon file changes
// Static server for changes to dist, copies global files & reloads browser when compiled files are changed
gulp.task('serve', ['browser-sync', 'css-files', 'js-files', 'img-files'], function() {
  gulp.watch(paths.sass, ['sass']);//sass not compiling and browser not reloading
  gulp.watch(paths.pugPartials, ['pug']);
  gulp.watch(paths.pugMain, ['pug']);
  gulp.watch(paths.require, ['requireopt']);
  gulp.watch(paths.html, browserSync.reload);
  gulp.watch(paths.css, browserSync.reload);
  gulp.watch(paths.js, browserSync.reload);
});

//build public folder
gulp.task('public', ['useref', 'images']);

//clean by deleting dist, public and clearing cache
gulp.task('clean-all', ['cache:clear', 'clean:dist', 'clean:public']);

//builds for production the public folder
gulp.task('build', function (callback) {
  runSequence(
    ['clean:dist', 'clean:public'],
    'default',
    'public',
    callback
  )
})