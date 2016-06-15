'use strict';
var Stream = require('stream');
var path = require('path');
var gulp = require('gulp');
var micPostcss = require('@mic/postcss');
var buffer = require('vinyl-buffer');
var gulpPostcss = require('gulp-postcss');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var babelify = require('babelify');

var cssSrc = ['client/*.css'];
var cssWatch = ['client/**/*.css'];

var jsSrc = ['client/*.js'];
var jsWatch = ['client/**/*.js'];

function processCss () {
  var stream = new Stream.Transform({ objectMode: true });

  stream._transform = function (originalFile, unused, callback) {
    var postCss = micPostcss({
      source: cssSrc,
      minify: true, // optional, defaults to false
      mixins: [] // optional - passed to mixins plugin
    });

    gulpPostcss([postCss])._transform(originalFile, unused, callback);
  };

  return stream;
}

function processJs () {
  var stream = new Stream.Transform({ objectMode: true });

  stream._transform = function (originalFile, unused, callback) {
    var file = originalFile.clone();
    var b = browserify({
      basedir: path.dirname(file.path)
    });
    b.add(file);
    b.transform(babelify);
    file.contents = b.bundle();
    callback(null, file);
  };

  return stream;
}

gulp.task('css', function () {
  return gulp.src(cssSrc)
    .pipe(processCss())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch:css', function () {
  gulp.watch(cssWatch, ['css']);
});

gulp.task('js', function () {
  return gulp.src(jsSrc)
    .pipe(processJs())
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch:js', function () {
  gulp.watch(jsWatch, ['js']);
});

gulp.task('default', ['css', 'js']);
gulp.task('watch', ['watch:css', 'watch:js']);
