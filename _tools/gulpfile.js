var gulp = require("gulp"),
	concat = require("gulp-concat");

gulp.task("default", function () {
	gulp.src("../common/*.js")
		.pipe(concat("app.js"))
		.pipe(gulp.dest("../build"))
})
