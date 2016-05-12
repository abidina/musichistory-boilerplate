var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');

gulp.task('default', ['lint', 'watch', 'sassify']);

gulp.task('watch', function() {
  gulp.watch('./javascripts/**/*.js', ['lint']);
  gulp.watch('./sass/**/*.scss', ['sassify']);
});

gulp.task('lint', function() {
  return gulp.src('./javascripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sassify', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});