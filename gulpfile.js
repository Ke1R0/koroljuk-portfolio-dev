const gulp = require('gulp');
const rename = require('gulp-rename');

gulp.task('build', () => {
  gulp.src(['app.js', 'package.json'])
    .pipe(gulp.dest('build'));
  gulp.src('prod.gitignore')
    .pipe(rename('.gitignore'))
    .pipe(gulp.dest('build'));
  gulp.src('app_api/**/*')
    .pipe(gulp.dest('build/app_api'));
  gulp.src('app_client/**/*')
    .pipe(gulp.dest('build/app_client'));
  gulp.src('bin/*')
    .pipe(gulp.dest('build/bin'));
});