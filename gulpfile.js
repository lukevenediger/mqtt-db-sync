/* jshint -W097 */
/* globals require */

const gulp = require('gulp'),
    jshint = require('gulp-jshint');

// See http://jshint.com/docs/options/ for all options
const lintOptions = {
    curly: true,  // All code blocks must be wrapped in curly braces§
    eqeqeq: true,  // All equality checks must use !== or ===
    latedef: 'nofunc', // Don't allow variables to be used before they're declared
    shadow: true, // Don't allow a variable name to be used if it's been used in an outer scope alread
    undef: true, // Don't allow undeclared variables to be used (global variables must be declared with the GLOBAL keyword)
    unused: true, // Don't allow unused variables,
    esversion: 6 // allow ES6 keywords
};

const matchAllSourceFiles = './**/*.js',
    matchNodeModulesDirectory = './node_modules/**',
    matchAllSpecFiles = './js/tests/*.spec.js',
    matchMinifiedFiles = './**/*.min.js';
/**
 * Returns a glob that will NOT match the input glob
 * @param {String} glob Input glob
 * @returns {String} the inverse of the input glob
 */
var exclude = function(glob) {
    return '!' + glob;
};

gulp.task('lint', function() {

    return gulp.src(
            [
                exclude(matchAllSpecFiles),
                exclude(matchNodeModulesDirectory),
                exclude(matchMinifiedFiles),
                matchAllSourceFiles
            ])
        //.pipe(replace(traceProcessing.lineMatchRegex, traceProcessing.processLine))
        .pipe(jshint(lintOptions))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));

});

gulp.task('default', ['lint']);
