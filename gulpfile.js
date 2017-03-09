var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('compress', function () {
  gulp.src('src/tabling.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
  gulp.start(['compress']);
})
