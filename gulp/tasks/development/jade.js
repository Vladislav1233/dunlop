var gulp        = require('gulp'),
    browsersync = require('browser-sync'),
    config      = require('../../config'),
    jade        = require('gulp-jade'),
    prettify    = require('gulp-html-prettify'),
    packageJSON = require('../../../package.json');

const data = {
    jv0: 'javascript:void(0);',
    timestamp: Date.now(),
    projectName: packageJSON.name,
    pageKeywords: packageJSON.keywords,
    pageDescription: packageJSON.description
};

/*
 * Build jade
 */
gulp.task('jade', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling jade');

    return gulp.src(config.html.src)
        .pipe(jade())
        .pipe(prettify({
            brace_style: 'expand',
            indent_size: 1,
            indent_char: '    ',
            indent_inner_html: true,
            preserve_newlines: true
        }))
        .pipe(gulp.dest(config.html.dest))
}));