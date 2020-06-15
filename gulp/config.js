var development = 'build/',
    production  = '../local/templates/main/';

var path = {
    build: {
        html: development,
        js: 'js/',
        jquery: 'js/jquery/', // jquery делаем отдельно чтобы подключить его в head
        html5shiv: 'js/html5shiv/', // html5shiv делаем отдельно чтобы подключить его в head
        normalize: 'css/normalize/', // normalize делаем отдельно чтобы подключить его в head
        css: 'css/',
        cssSprite: 'src/style/partials/',
        img: 'images/',
        imgSprite: 'src/images/',
        fonts: 'fonts/'
    },
    src: {
        html: 'src/*.jade',
        jsInternal: 'src/js/internal.js',
        jsExternal: 'src/js/external.js',
        jquery: 'bower_components/jquery/dist/*.*', // jquery делаем отдельно чтобы подключить его в head
        html5shiv: 'bower_components/html5shiv/dist/*.*', // html5shiv делаем отдельно чтобы подключить его в head
        normalize: 'bower_components/normalize-css/normalize.css', // normalize делаем отдельно чтобы подключить его в head
        style: 'src/style/main.less',
        img: ['src/images/**/*.*', '!src/images/sprite/**/*.*', '!src/images/sprite@2x/**/*.*', '!src/images/svg_for_icon/*.svg'],
        imgSprite: 'src/images/sprite/**/*.*',
        imgSprite2: 'src/images/sprite@2x/**/*.*',
        fonts: 'src/fonts/**/*.*',
        concatless: 'src/style/concat-less/',
        bemblocks: 'src/style/bem-blocks/'
    },
    watch: {
        html: 'src/**/*.jade',
        jsInternal: ['src/js/**/*.js', '!src/js/external.js'],
        jsExternal: 'src/js/external.js',
        style: ['src/style/**/*.less', '!src/style/concat-less/*.less'],
        img: ['src/images/**/*.*', '!src/images/svg_for_icon/*.svg'],
        imgSprite: ['src/images/sprite/**/*.*', '!src/images/svg_for_icon/*.svg'],
        fonts: 'src/fonts/**/*.*',
        iconfont: 'src/images/svg_for_icon/*.svg'
    }
};

module.exports = {
    browsersync: {
        server: {
            baseDir: './' + development
        },
        tunnel: false,
        open: false,
        host: 'localhost',
        port: 3000,
        logPrefix: "Frontend_Blank"
    },
    html: {
        src: path.src.html,
        dest: path.build.html
    },
    js: {
        srcInternal: path.src.jsInternal,
        srcExternal: path.src.jsExternal,
        srcJquery: path.src.jquery, // jquery делаем отдельно чтобы подключить его в head
        srcHtml5shiv: path.src.html5shiv, // html5shiv делаем отдельно чтобы подключить его в head
        srcNormalize: path.src.normalize, // normalize делаем отдельно чтобы подключить его в head
        development: {
            dest: development + path.build.js,
            destJquery: development + path.build.jquery,
            destHtml5shiv: development + path.build.html5shiv,
            destNormalize: development + path.build.normalize
        },
        production: {
            dest: production + path.build.js,
            destJquery: production + path.build.jquery,
            destHtml5shiv: production + path.build.html5shiv,
            destNormalize: production + path.build.normalize
        }
    },
    less: {
        src: path.src.style,
        development: {
            dest: development + path.build.css
        },
        production: {
            dest: production + path.build.css
        },
        concatless: path.src.concatless,
        bemblocks: path.src.bemblocks
    },
    autoprefixer: {
        browsers: [
            'last 10 versions',
            'ie 8',
            'ie 9'
        ]
    },
    images: {
        src: path.src.img,
        development: {
            dest: development + path.build.img
        },
        production: {
            dest: production + path.build.img
        }
    },
    imagemin: {
        // use добавляется в таске
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true
    },
    sprites: {
        src: path.src.imgSprite,
        src2: path.src.imgSprite2,
        dest: {
            css: path.build.cssSprite,
            image: path.build.imgSprite
        },
        options: {
            imgName: 'sprite.png',
            cssName: 'sprite.less',
            imgPath: '../images/sprite.png',
            cssFormat: 'less',
            algorithm: 'top-down',
            padding: 10,
            engine: 'pngsmith',
            imgOpts: {
                format: 'png'
            }
        },
        options2: {
            imgName: 'sprite@2x.png',
            cssName: 'sprite2.less',
            imgPath: '../images/sprite2.png',
            cssFormat: 'less',
            algorithm: 'top-down',
            padding: 10,
            engine: 'pngsmith',
            imgOpts: {
                format: 'png'
            }
        }
    },
    fonts: {
        src: path.src.fonts,
        development: {
            dest: development + path.build.fonts
        },
        production: {
            dest: production + path.build.fonts
        }
    },
    watch: {
        html: path.watch.html,
        jsInternal: path.watch.jsInternal,
        jsExternal: path.watch.jsExternal,
        less: path.watch.style,
        images: path.watch.img,
        sprites: path.watch.imgSprite,
        fonts: path.watch.fonts,
        iconfont: path.watch.iconfont
    },
    clean: {
        development: {
            dest: './' + development
        },
        production: {
            dest: './' + production
        }
    },
    /**
     * Wrap gulp streams into fail-safe function for better error reporting
     * Usage:
     * gulp.task('less', config.wrapPipe(function(success, error) {
     *   return gulp.src('less/*.less')
     *      .pipe(less().on('error', error))
     *      .pipe(gulp.dest('app/css'));
     * }));
     */
    wrapPipe: function(taskFn) {
        return function(done) {
            var onSuccess = function() {
                done();
            };
            var onError = function(err) {
                done(err);
            }
            var outStream = taskFn(onSuccess, onError);
            if(outStream && typeof outStream.on === 'function') {
                outStream.on('end', onSuccess);
            }
        }
    }
};