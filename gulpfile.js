var gulp = require('gulp');
var contribs = require('./index');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('lint', function () {
    gulp.src(['test/*.js', 'lib/*'])
        .pipe(jshint('test/.jshintrc'))
        .pipe(jshint.reporter('default'))
});

gulp.task('test', function () {
    gulp.src('test/*.js')
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('contribs', function () {
    gulp.src('README.md')
        .pipe(contribs())
        .pipe(gulp.dest("./"))

});

gulp.task('default', ['lint', 'test']);