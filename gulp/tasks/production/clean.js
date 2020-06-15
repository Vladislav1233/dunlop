var gulp   = require('gulp'),
    rimraf = require('rimraf'),
    config = require('../../config');

/*
 * Удаление папки buld
 */

gulp.task('clean:production', function (cb) {
    rimraf(config.clean.production.dest, cb);
});