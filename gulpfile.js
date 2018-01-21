'use strict';

// plugins
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	minifyCSS = require('gulp-minify-css'),
	clean = require('gulp-clean'),
	sass = require('gulp-ruby-sass'),
	runSequence = require('run-sequence').use(gulp),
	sass_path = './app/styles/*.scss';

// tasks
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
    gulp.src('./dist/*')
      .pipe(clean({force: true}));
});
gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./dist'))
});
gulp.task('minify-js', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});
gulp.task('copy-bower-components', function () {
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('./dist/bower_components'));
});
gulp.task('copy-html-files', function () {
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./dist'));
});
gulp.task('copy-data-files', function () {
  gulp.src('./app/**/*.json')
    .pipe(gulp.dest('./dist'));
});
gulp.task('copy-images', function () {
  gulp.src(['./app/**/*.jpg', './app/**/*.png', './app/**/*.gif' ])
    .pipe(gulp.dest('./dist'));
});
gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8888
  });
});
gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});

gulp.task('watch', function() {
  gulp.watch(sass_path, ['styles']);
});

gulp.task('styles', function() {
  return sass(sass_path)
  .pipe(gulp.dest('./app/styles/'));
});

// default task
gulp.task('default',
  ['lint', 'connect', 'styles', 'watch']
);
gulp.task('build', function() {
  runSequence(
    ['clean'],
    ['lint', 'minify-css', 'minify-js', 'copy-html-files', 'copy-data-files', 'copy-images', 'copy-bower-components', 'connectDist']
  );
});
