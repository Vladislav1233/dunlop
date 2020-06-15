var gulp                 = require('gulp'),
    sourcemaps           = require('gulp-sourcemaps'),
    browsersync          = require('browser-sync'),
    less                 = require('gulp-less'),
    lessPluginAutoPrefix = require('less-plugin-autoprefix'),
    lessPluginCleanCSS   = require('less-plugin-clean-css'),
    config               = require('../../config'),

    autoprefixer         = new lessPluginAutoPrefix(config.autoprefixer),
    cleancss             = new lessPluginCleanCSS({ advanced: true });

/*
 * Компиляция LESS в CSS
 * Build sourcemaps
 */

gulp.task('less:production', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling less');

    return gulp.src(config.less.src)
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefixer]
        }).on('error', error))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.less.production.dest))
}));