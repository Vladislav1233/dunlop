var gulp         = require('gulp'),
    browsersync  = require('browser-sync'),
    config       = require('../../config'),
    iconfont     = require('gulp-iconfont'),
    runTimestamp = Math.round(Date.now() / 1000),
    consolidate  = require('gulp-consolidate'),
    iconfontCss  = require('gulp-iconfont-css');

var fontName = 'icons';

/*
 * Build icon fonts
 */
gulp.task('iconfont', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling Icon Fonts');

    return gulp.src(['src/images/svg_for_icon/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'node_modules/gulp-iconfont-css/templates/_icons.less',
            targetPath: '../../src/style/partials/icons.less',
            fontPath: '../fonts/'
        }))
        .pipe(iconfont({
            fontName: fontName,
            appendUnicode: true,
            formats: ['ttf', 'eot', 'woff', 'svg', 'woff2'],
            timestamp: runTimestamp,
            normalize: true,
            fontHeight: 1001,
        }))
        .pipe(gulp.dest(config.html.dest + "/fonts"));
}));