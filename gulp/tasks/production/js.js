var gulp        = require('gulp'),
    browsersync = require('browser-sync'),
    fileinclude = require('gulp-file-include'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    config      = require('../../config');

/*
 * Build js
 */

gulp.task('js:production', [
    'js-internal',
    'js-external'
]);

gulp.task('js-internal:production', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling js');

    return gulp.src(config.js.srcInternal)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }).on('error', error))
        .pipe(sourcemaps.init())
        .pipe(uglify().on('error', error))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.js.production.dest))
}));

gulp.task('js-external:production', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling js');

    // jquery делаем отдельно чтобы подключить его в head
    gulp.src(config.js.srcJquery)
        .pipe(gulp.dest(config.js.production.destJquery));

    // html5shiv делаем отдельно чтобы подключить его в head
    gulp.src(config.js.srcHtml5shiv)
        .pipe(gulp.dest(config.js.production.destHtml5shiv));

    return gulp.src(config.js.srcExternal)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }).on('error', error))
        .pipe(gulp.dest(config.js.production.dest))
}));