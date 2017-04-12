var gulp = require('gulp');//main
var filter = require('gulp-filter');//filters files with globs
var uglify = require('gulp-uglify');//used only as needed for dist js vendor files
var pump = require('pump');//used only on uglify
var sass = require('gulp-sass');//using
var autoprefixer = require('gulp-autoprefixer');//using
var pug = require('gulp-pug');//using
var pugInheritance = require('gulp-pug-inheritance');//compile only changed files
var sourcemaps = require('gulp-sourcemaps');//using
var requirejsOptimize = require('gulp-requirejs-optimize');//using;optimizes modules individually & bundle (minify)
var path = require("path");//using for callback for pug task
var browserSync = require('browser-sync').create();

var paths = {
  //sass: ['./src/sass/**/*.sass'],
  sass: ['./src/sass/main.sass'],
  pugPartials: ['./src//pug/**/*.pug'],
  pugMain: ['./src/pug/*.pug'],
  //pug: ['./src/pug/**/!(_)*.pug'],//takes all files in all directories; exclude by !(_)*.pug if not using gulp-filter; does not work with watch
  require: ['./src/js/**/*.js'],
  html: ['./dist/*.html'],
  css: ['./dist/**/*.css'],
  js: ['./dist/js/*.js']
};
//works: minifyJS and uses pump to handle error similar to a sourcemap but for gulp to compensate for unclear pipe errors
//bundle.js is already minified but additional files may need it
gulp.task('compress', function (cb) {
  pump([
        gulp.src('./dist/js/*.js'),//change directory for specific js files to minify
        uglify(),
        gulp.dest('./dist/minify')
    ],
    cb
  );
});
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
//requirejsOptimize works : minifies and concatenates modules w/almond into a single working bundle file
gulp.task('requireopt', function () {
    /*return gulp.src('./src/modules/*.js')
        .pipe(requirejsOptimize())
        .pipe(gulp.dest('./dist2'));*/
    return gulp.src('./src/js/require.config.js')//relative to gulpfile
    .pipe(sourcemaps.init())//pipes inside here will contain sourcemps; comment to remove
    .pipe(requirejsOptimize(function(file) {
      return {
        baseUrl: "./src/js",//relative to gulpfile
        mainConfigFile: './src/js/require.config.js',//relative to gulpfile
        paths: {
          nav: 'lib/modules/navmod',//relative to baseUrl
          smoothscll: 'lib/modules/smoothscroll',
          nav_color: 'lib/modules/nav_color'
        },
        include: ['require.config'],//relative to baseUrl
        name: "../../tools/almond",//relative to baseURL
        out: "bundle.js"//relative to gulpfile.js or gulp.dest()
      };
    }))
    .pipe(sourcemaps.write('../sourcemaps'))//writes sourcemaps to directory:relative to gulp.dest()!!; comment to remove
    .pipe(gulp.dest('./dist/js'));//output directory
});
//$ gulp default works
gulp.task('default', ['sass', 'pug', 'requireopt']);
//$ gulp watch works
gulp.task('watch', ['sass', 'pug', 'requireopt'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.pugPartials, ['pug']);
  gulp.watch(paths.pugMain, ['pug']);
  //saves only changes in require.config.js
  //gulp.watch('./src/js/require.config.js', ['requireopt']);
  //works: takes all changes with *.js and updates the bundle.js
  gulp.watch(paths.require, ['requireopt']);
});
gulp.task('watchsass', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});
//only pug watch
gulp.task('watchpug', ['pug'], function() {
  gulp.watch(paths.pug, ['pug']);
});
//not used unless folders are desired for compiled *.html files
function callback(file) {
  if (file.path.search('index') !== -1) {//if path is index then return to directory
    //return './www/app/';
    return './dist/templates/';//excluded index.html goes here
  }
  var folder = path.basename(file.path).replace(/\..*html/, '/');
  //return './www/app/' + folder;
  return './dist/templates/' + folder;//used to organize compiled *.html into folders
}

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

// Static server for changes to dist
gulp.task('serve', ['browser-sync'], function() {
  gulp.watch(paths.sass, ['sass']);//sass not compiling and browser not reloading
  gulp.watch(paths.pugPartials, ['pug']);
  gulp.watch(paths.pugMain, ['pug']);
  gulp.watch(paths.require, ['requireopt']);
  gulp.watch(paths.html, browserSync.reload);
  gulp.watch(paths.css, browserSync.reload);
  gulp.watch(paths.js, browserSync.reload);
});

//build for /public
//gulp.task('build', ['sass', 'pug', 'requireopt']);
