const del = require('del');
const gulp = require('gulp');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const jsImport = require('gulp-js-import');
const postcss = require('gulp-postcss');
const atImport = require('postcss-import');
const header = require('gulp-header');
const dateFormat = require('dateformat');
const pkg = require('./package.json');
const stripDebug = require('gulp-strip-debug');
const usemin = require('gulp-usemin');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const rename = require("gulp-rename");
const clean = require('gulp-clean');
const cache = require('gulp-cache');
const pug = require('gulp-pug');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browsersync = require('browser-sync').create();
// const reload = browsersync.reload;
const stylus = require('gulp-stylus');
const colors = require('colors');

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

const getTime = (formats) => {
    const now = new Date();
    return dateFormat(now, formats);
};

const banner = `/**
 * Copyright (c) 2000 - ${getTime("yyyy")} www.xiongan.gov.cn All Rights Reserved.
 * ${pkg.name} v${pkg.version}
 * @time ${getTime("yyyy-mm-dd HH:MM:ss")}
 */
`;
const bannerCSS_charset_utf_8 = `@charset "utf-8";
${banner}`;

gulp.task('usemin: s4', function () {
    gulp
        .src([
            // './index.html',
            // './s1.html',
            // './s2.html',
            // './s3.html',
            './s4.html',
            // './s5.html',
            // './s6.html',
            // './content.html',
            './pages.html',
            // './dsj.html',
        ])
        .pipe(usemin(
            {
                // js: [],
                // css: [],
                // css: [rev],
                // html: [function () { return htmlmin({ collapseWhitespace: true }); }],
                // js: [uglify, rev],
                // inlinejs: [uglify],
                // inlinecss: [cleanCss, 'concat']
            }
        ))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean-dist-bundle', function (cb) {
    del([
        'dist/bundle/',
        'dist/s4/',
        // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
        // 'dist/mobile/**/*',
        // 我们不希望删掉这个文件，所以我们取反这个匹配模式
        // '!dist/mobile/deploy.json'
    ], cb);
});

gulp.task('browsersync', function () {
    var files = [
        '*.htm',
        '*.html',
        'css/*.css',
        'js/*.js',
        'bundle/*.css',
        'bundle/*.js',
        'bundle/*.png',
        'bundle/*.jpg',
        'bundle/*.gif',
        'images/*.png',
        'images/*.jpg',
        'images/*.gif',
        'pug/*.pug',
        'pug/views/*.pug',
        'scss/*.scss',
        'scss/include/*.scss',
    ];
    browsersync
        .init(files, {
            server: {
                baseDir: './'
            },
            notify: true,
        });
});

// pug
gulp.task('pug', function () {
    gulp
        .src('pug/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});


// js Compile
let jsCompileTasks = [];
const jsCompiles = [
    'js/s4-index.js',
    'js/homepage.js',
    'js/homepage-index.js',
    'js/pages.js',
    // 'js/mobile-blueprint.js',
    'js/homepage-config.js',
    'js/qndj.js',
    'js/long-pic.js',
];

jsCompiles.map((item, index) => {
    const taskTisp = `[${index < 10 ? `0${index}` : index}] jsImport > babel:`;
    const taskName = taskTisp + item;
    jsCompileTasks.push(taskName); //.info + ` ${item}`.data;
    console.log('jsCompileTasks:'.warn, taskTisp.info, item.data);
    gulp.task(taskName, () => {
        gulp
            .src(item)
            .pipe(jsImport()) // jsImport
            .pipe(gulp.dest('import'))
            .pipe(plumber({
                errorHandler: notify.onError('Error: <%= error.message %>')
            })) //错误处理
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(gulp.dest('bundle'));
    });
});

// gulp.task('js', function () {
//     gulp
//         .src([
//             'js/s4-index.js',
//             'js/homepage.js',
//             // 'js/homepage-index.js',
//             'js/pages.js',
//             'js/mobile-blueprint.js',
//             'js/homepage-config.js',
//         ])
//         .pipe(jsImport()) // jsImport
//         .pipe(gulp.dest('import'))
//         // .pipe(sourcemaps.init())
//         .pipe(plumber({
//             errorHandler: notify.onError('Error: <%= error.message %>')
//         })) //错误处理
//         .pipe(babel({
//             presets: ['env']
//         }))
//         // .pipe(sourcemaps.write('../maps'))
//         .pipe(gulp.dest('bundle'));
// });

gulp.task('jsImport + babel: js/homepage-index.js', function () {
    gulp
        .src([
            'js/homepage-index.js',
        ])
        .pipe(jsImport()) // jsImport
        .pipe(gulp.dest('import'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        })) //错误处理
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('bundle'));
});


gulp.task('styl', function () {
    gulp
        .src([
            'styl/s4-index.styl',
            'styl/homepage.styl',
            'styl/pages.styl',
            'styl/mobile-blueprint.styl',
            'styl/qndj.styl',
            'styl/message-board.styl',
            'styl/long-pic.styl',
        ])
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(stylus())
        .pipe(gulp.dest('bundle'));
});

// gulp.task('css', function () {
//     gulp
//         .src([
//             'css/index.css',
//             // 'css/pages.css',
//         ])
//         .pipe(postcss([
//             atImport()
//         ]))
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('bundle'));
// });

// 样式
gulp.task('scss', function () {
    gulp
        .src([
            'scss/*.scss',
        ])
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        // .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            precision: 10
        }))
        // .pipe(autoprefixer({
        //     browsers: ["chrome 30", "Firefox < 20", "ios_saf 8", "safari 8", 'Android >= 4.1', 'IE 9', 'IE 10']
        // }))
        // .pipe(autoprefixer({
        //     browsers: ["chrome 30", "Firefox < 20", "ios_saf 8", "safari 8", 'Android >= 2.1', 'IE 9', 'IE 10']
        // }))
        // .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('bundle'))
    // .pipe(reload({ stream: true }));
});

// watch
gulp.task('autowatch', function () {
    // gulp.watch('pug/*.pug', ['pug']);

    gulp.watch('js/*.js', jsCompileTasks);

    gulp.watch('styl/*.styl', ['styl']);
    gulp.watch('scss/*.scss', ['scss']);
    gulp.watch('scss/include/*.scss', ['scss']);
});

// built
gulp.task('built css: s4', function () {
    gulp
        .src('bundle/s4-index.css')
        .pipe(rename('s4-index.min.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8))
        // .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built js: s4', function () {
    gulp
        .src([
            'bundle/swiper.min.js',
            // 'bundle/swiper.animate.min.js',
            // 'bundle/jquery.slimscroll.min.js',
            'bundle/jquery.jplayer.min.js',
            'bundle/jplayer.playlist.js',
            'bundle/jquery.qrcode.min.js',
            'bundle/s4-index.js',
        ])
        .pipe(concat('s4-index.all.js')) //合并后的文件名
        .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('s4-index.all.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

// gulp
gulp.task('default', [
    'autowatch',
    'browsersync'
]);

gulp.task('built js: homepage.js', function () {
    gulp
        .src([
            'bundle/homepage.js',
        ])
        // .pipe(concat('homepage.all.js')) //合并后的文件名
        // .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('homepage.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built js: homepage-index.js', function () {
    gulp
        .src([
            // 'bundle/index.js',
            'bundle/homepage-index.js'
        ])
        // .pipe(concat('homepage.all.js')) //合并后的文件名
        // .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('homepage-index.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built css: homepage.css', function () {
    gulp
        .src('bundle/homepage.css')
        .pipe(rename('homepage.min.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8))
        // .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built css: homepage-index.css', function () {
    gulp
        .src('bundle/homepage-index.css')
        .pipe(rename('homepage-index.min.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8))
        // .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});


// pages
gulp.task('built css: pages.css', function () {
    gulp
        .src('bundle/pages.css')
        .pipe(rename('pages.min.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8))
        // .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built js: pages.js', function () {
    gulp
        .src([
            // 'bundle/index.js',
            'bundle/pages.js'
        ])
        // .pipe(concat('homepage.all.js')) //合并后的文件名
        // .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('pages.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

// build-s4
gulp.task('s4', [
    'built css: s4',
    'built js: s4',
    'usemin: s4',
]);

// build-homepage
gulp.task('homepage', [
    'built js: homepage.js',
    'built css: homepage.css',
    'built js: homepage-index.js',
    'built css: homepage-index.css',
]);


// build-homepage
gulp.task('pages', [
    'built js: pages.js',
    'built css: pages.css',
]);

const buildTackCB = (key) => {
    gulp.task(`built css: ${key}.css`, function () {
        gulp
            .src(`bundle/${key}.css`)
            .pipe(rename(`${key}.min.css`))
            .pipe(cleancss({
                advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            }))
            .pipe(header(bannerCSS_charset_utf_8))
            // .pipe(header(banner))
            .pipe(gulp.dest('bundle'));
    });

    gulp.task(`built js: ${key}.js`, function () {
        gulp
            .src([
                `bundle/${key}.js`
            ])
            .pipe(stripDebug()) // 删除 console
            .pipe(rename(`${key}.min.js`))
            // .pipe(sourcemaps.init())
            .pipe(uglify())
            // .pipe(sourcemaps.write('../maps'))
            .pipe(header(banner))
            .pipe(gulp.dest('bundle'));
    });

    gulp.task(`usemin: ${key}`, function () {
        gulp
            .src([`./${key}.html`])
            .pipe(usemin({}))
            .pipe(gulp.dest('dist'));
    });

    gulp.task(`clean-dist: ${key}`, function (cb) {
        del([`dist/http*/`], cb);
    });


};

buildTackCB('long-pic');






gulp.task('built js: long-pic.all.min.js', function () {
    gulp
        .src([
            'bundle/TweenLite.min.js',
            'bundle/Draggable.min.js',
            'bundle/ThrowPropsPlugin.min.js',
            'bundle/CSSPlugin.min.js',
            'bundle/long-pic.js',
        ])
        .pipe(concat('long-pic.all.js')) //合并后的文件名
        .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('long-pic.all.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

// build long-pic
gulp.task('long-pic', [
    `built css: long-pic.css`,
    // `built js: long-pic.js`,
    'built js: long-pic.all.min.js',
    // `usemin: long-pic`,
    // `clean-dist: qndj`
]);

buildTackCB('qndj');

// build qndj
gulp.task('qndj', [
    `built css: qndj.css`,
    `built js: qndj.js`,
    `usemin: qndj`,
    // `clean-dist: qndj`
]);

gulp.task('build', [
    `qndj`,
    `pages`,
    `homepage`,
    `s4`,
    `long-pic`,
]);
