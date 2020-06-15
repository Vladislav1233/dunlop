var gulp         = require('gulp'),
    browsersync  = require('browser-sync'),
    config       = require('../../config'),
    Promise      = require('bluebird'),
    consolidate  = require('gulp-consolidate'),
    fs           = require("fs");

var PLUGIN_NAME  = 'kontora-htmllist';

/*
 * Build index.html
 */
gulp.task('htmllist', config.wrapPipe(function(success, error) {
    browsersync.notify('Compiling HTML LIST');

    var build_path = __dirname + "/../../../src/";
    var files_list = [];
    var index_template = __dirname + '/../../template/index.jade';

    var promises = fs.readdirSync(build_path).map(function (file) {
        fs.stat(build_path + file, function (err, stats) {
            if (err) { return console.error(err); }

            if (stats.isFile() && file != 'index.jade') {
                files_list.push(file.replace('jade', 'html'));
            }
        });
    });

    Promise.all(promises).then(function() {
        gulp.src(index_template)
            .pipe(consolidate('lodash', {
                files: files_list,
                names: [],
                path: "/"
            }))
            .pipe(gulp.dest('src/'));
    });


    /* 
     * TODO (murdoc): Переписать вот так вот - красивее
     * Не будут использоваться Promise
     */
     
    // var build_path = __dirname + "/../../../src/";
    // var index_template = __dirname + '/../../template/index.jade';

    // gulp.src(index_template)
    //     .pipe(consolidate('lodash', {
    //         files: fs.readdirSync(build_path).map(function (file) {
    //             fs.stat(build_path + file, function (err, stats) {
    //                 if (err) { return console.error(err); }

    //                 if (stats.isFile() && file != 'index.jade') {
    //                     return file.replace('jade', 'html');
    //                 }
    //             });
    //         }),
    //         path: "http://localhost:3000/"
    //     }))
    //     .pipe(gulp.dest('src/'));


}));