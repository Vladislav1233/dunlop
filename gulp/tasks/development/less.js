var gulp                    = require('gulp'),
    sourcemaps              = require('gulp-sourcemaps'),
    browsersync             = require('browser-sync'),
    less                    = require('gulp-less'),
    lessPluginAutoPrefix    = require('less-plugin-autoprefix'),
    lessPluginCleanCSS      = require('less-plugin-clean-css'),
    concat                  = require('gulp-concat'),
    csso                    = require('gulp-csso'),

    config                  = require('../../config'),

    autoprefixer            = new lessPluginAutoPrefix(config.autoprefixer),
    cleancss                = new lessPluginCleanCSS({ advanced: true });

/*
 * Конкатинация LESS для Desktop и Mobile
 */

//Конкатинация стилей для version
gulp.task('concat-desktop-min', function() {
    browsersync.notify('Concat 1000 Less');

    return gulp.src(config.less.bemblocks + '*/*.desktop.min.less')
        .pipe(concat('bem.desktop.min.less'))
        .pipe(gulp.dest(config.less.concatless))
});

//Конкатинация стилей для version
gulp.task('concat-desktop', function() {
    browsersync.notify('Concat 1280 Less');

    return gulp.src(config.less.bemblocks + '*/*.desktop.less')
        .pipe(concat('bem.desktop.less'))
        .pipe(gulp.dest(config.less.concatless))
});

//Конкатинация стилей для version
gulp.task('concat-desktop-big', function() {
    browsersync.notify('Concat 1440 Less');

    return gulp.src(config.less.bemblocks + '*/*.desktop.big.less')
        .pipe(concat('bem.desktop.big.less'))
        .pipe(gulp.dest(config.less.concatless))
});

//Конкатинация стилей для version
gulp.task('concat-desktop-large', function() {
    browsersync.notify('Concat 1920 Less');

    return gulp.src(config.less.bemblocks + '*/*.desktop.large.less')
        .pipe(concat('bem.desktop.large.less'))
        .pipe(gulp.dest(config.less.concatless))
});


/*
 * Компиляция LESS в CSS
 * Build sourcemaps
 */
gulp.task('less', ['concat-desktop-min', 'concat-desktop', 'concat-desktop-big', 'concat-desktop-large'], config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling Main Less');

    return gulp.src(config.less.src)
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefixer],
        }).on('error', error))
//        .pipe(sourcemaps.write())
//        .pipe(csso()) //Нужно для конечного билда, пусть пока здесь будет
        .pipe(gulp.dest(config.less.development.dest))
}));