var gulp = require('gulp');

gulp.task('build', [
    'iconfont',
    'jade',
    'fonts',
    'js',
    'sprites',
    'images',
    'less'
]);