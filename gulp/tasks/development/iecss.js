var gulp   = require('gulp'),
    config = require('../../config');

/*
 * Копируем ширфты
 */

gulp.task('iecss', function() {
    gulp.src(config.iecss.src)
        .pipe(gulp.dest(config.iecss.development.dest))
});