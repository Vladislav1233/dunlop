var gulp = require('gulp');

gulp.task('build:production', [
    'js:production',
    'less:production',
    'images:production',
    'fonts:production'
]);