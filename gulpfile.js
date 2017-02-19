var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var sourcemaps = require('gulp-sourcemaps')
var requirejsOptimize = require('gulp-requirejs-optimize');//optimizes modules individually & bundle (minify)
var path = require("path");

var paths = {
  sass: ['./src/sass/**/*.sass'],
  //sass: ['./src/sass/main.sass'],
  //pug: ['./pug/**/*.pug']
  pug: ['./src/pug/**/*.pug'],
  require: ['./src/js/**/*.js']
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
  gulp.src(paths.pug)
  //return gulp.src(paths.pug)
    .pipe(pug({
      //pug options as objects
      pretty: ['true'],//beautifies compiled *.html
    }))
    //.pipe(gulp.dest('./src/templates'));
    .pipe(gulp.dest(callback))//remove return from gulp.src() to avoid returning stream and confusing gulp
    .on('end', done);
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
  gulp.watch(paths.pug, ['pug']);
  //saves only changes in require.config.js
  //gulp.watch('./src/js/require.config.js', ['requireopt']);
  //works: takes all changes with *.js and updates the bundle.js
  gulp.watch(paths.require, ['requireopt']);
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
