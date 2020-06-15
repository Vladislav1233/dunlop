var gulp        = require('gulp'),
    browsersync = require('browser-sync'),
    spritesmith = require('gulp.spritesmith'),
    config      = require('../../config');

/*
 * Генерация спрайта и стилей для него
 */
gulp.task('sprites', function() {
    browsersync.notify('Compiling sprites');

    var spriteData = gulp.src(config.sprites.src2, {
            read: false
        })
        .pipe(spritesmith(config.sprites.options2));

    spriteData.img.pipe(gulp.dest(config.sprites.dest.image));

    var spriteData = gulp.src(config.sprites.src, {
            read: false
        })
        .pipe(spritesmith(config.sprites.options));

    spriteData.img.pipe(gulp.dest(config.sprites.dest.image));
    spriteData.css.pipe(gulp.dest(config.sprites.dest.css));

    return spriteData;
});