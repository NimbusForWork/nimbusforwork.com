var gulp = require('gulp');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');


gulp.task('default', function(done) {
    runSequence(['sass', 'js'], 'watch');
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/site.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    // .pipe(concat('site.min.css'))
    .pipe(rename("site.min.css"))
    .pipe(gulp.dest('./static/css'));
})

gulp.task('js', function (cb) {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    // .pipe(concat('site.min.js')) // don't concat
    .pipe(gulp.dest('./static/js'))
})


gulp.task('watch', function() {
  livereload.listen({ start: true });
  gulp.watch('src/**/*', ['sass', 'js']);
});
