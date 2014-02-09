/*global require*/
"use strict"

// gulp --type release

var gulp = require("gulp"),
	less = require('gulp-less'),
	path = require('path'),
	uglify = require('gulp-uglify'),
	concat = require("gulp-concat"),
	buildType = gulp.env.type || "",
	isMin = buildType === "release";

function getLibs() {
	var min = isMin ? ".min" : "";
	return [
		'../libs/js/jquery' + min + '.js',
		'../libs/js/angular' + min + '.js',
		'../libs/js/angular-route' + min + '.js',
		'../libs/js/angular-animate' + min + '.js',
		'../libs/js/angular-resource' + min + '.js',
		'../libs/js/angular-ui/event' + min + '.js',
		'../libs/js/angular-ui/angular.keypress' + min + '.js',
		'../libs/js/showdown' + min + '.js',
		'../libs/js/angular-bootstrap/ui-bootstrap-custom-tpls-0.3.0.min.js'
	];
}

var paths = {
	scripts: [
		'../common/*.js',
		'../gallery/*.js',
		'../api/*.js',
		'../data/*.js',
		'../grid/*.js',
		'../Scripts/*.js'
	],
	jsLibs: getLibs(),
	less: [
	//	'../Css/fluid_grid.css',
		'../Css/main.less'
	]
};


gulp.task("scripts", function () {
	gulp.src(paths.scripts)
		.pipe(uglify({compress: false}))
		.pipe(concat("app.js"))
		.pipe(gulp.dest("../build"))
	;
});

gulp.task("js-libs", function () {
	gulp.src(paths.jsLibs)
		.pipe(concat("app.libs.js"))
		.pipe(gulp.dest("../build"))
	;
});

gulp.task("css", function () {
	gulp.src(paths.less)
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe(concat("app.css"))
		.pipe(gulp.dest('../build'));
});

gulp.task('watch', function () {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.less, ['css']);
});

gulp.task('setup-min', function () {
	isMin = true;
	paths.jsLibs = getLibs();
});



gulp.task('run', ['scripts', 'css', 'js-libs']);
//gulp.task('x', ['setup-min', 'run', 'minify']);
gulp.task('default', ['run', 'watch']);


