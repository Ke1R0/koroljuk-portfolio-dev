var gulp = require('gulp');
var gm = require('gulp-gm');
var rename = require("gulp-rename");

gulp.task('imagesPreview', function() {
	gulp.src('public/images/Gallery-src/*.+(jpg|png)')
	.pipe(gm(function (gmfile) {
			return gmfile.resize(350, 350);
		}, {imageMagick: true}))
	.pipe(rename({suffix: "-preview"}))
	.pipe(gulp.dest('public/images/Gallery'));
});

gulp.task('minifyImages', function() {
	gulp.src('public/images/Gallery-src/*.+(jpg|png)')
	.pipe(gm(function (gmfile) {
			return gmfile.resize(1280, 720);
		}, {imageMagick: true}))
	.pipe(gulp.dest('public/images/Gallery'));
});

gulp.task('default', function() {
	gulp.run('imagesPreview');
	gulp.run('minifyImages');
});
