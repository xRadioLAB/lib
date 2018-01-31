const del = require('del');
const gulp = require('gulp');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const jsImport = require('gulp-js-import');
const postcss = require('gulp-postcss');
// const atImport = require('postcss-import');
const header = require('gulp-header');
const dateFormat = require('dateformat');
const pkg = require('./package.json');
const stripDebug = require('gulp-strip-debug');
const usemin = require('gulp-usemin');

// const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
// const sourcemaps = require('gulp-sourcemaps');
// const imagemin = require('gulp-imagemin');
const rename = require("gulp-rename");
const clean = require('gulp-clean');
// const cache = require('gulp-cache');
const pug = require('gulp-pug');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browsersync = require('browser-sync').create();
// const reload = browsersync.reload;
const stylus = require('gulp-stylus');
const colors = require('colors');

// --------------------------------- config START ---------------------------------
// 控制开启模块
const { isPug, isJs, isStyl } = {
    isPug: 1,
    isJs: 1,
    isStyl: 1,
};

// 编译目标
const taskNameArray = [
    'index', // index.css, index.js | build: index.min.css, index.min.js,
    // 'homepage',
    // 'pages',
];
// --------------------------------- config END ---------------------------------

let TASK_js = [];
let TASK_stylus = [];

let TASK_build_js = [];
let TASK_build_css = [];
let TASK_usemin = [];

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

const tipFn = (i, type) => {
    // return `[${i}] type: '${type}' -->`;
    return `[${i}] -->`;
};

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

gulp.task('browsersync', function () {
    var files = [
        '*.htm',
        '*.html',
        'js/*.js',
        'bundle/*.css',
        'bundle/*.js',
        'bundle/*.png',
        'bundle/*.jpg',
        'bundle/*.gif',
        'pug/*.pug',
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

gulp.task('clean-dist-bundle', function (cb) {
    setTimeout(function () {
        del(['dist/bundle/'], cb);
    }, 2000);
});

// html
const useminTask = ({ file, name, type, index } = {
    file: './',
    name: 'index',
    type: '.html',
    index: 0,
}) => {
    const i = index < 10 ? `0${index}` : index;
    const tips = tipFn(i, type);
    const src = file + name + type;
    const taskName = tips + src; // task [00] '.html': ./index.html 

    // 转载 TASK_usemin
    TASK_usemin.push(taskName);
    console.log('[gulp TASK]'.silly, 'usemin'.warn, tips.info, src.data);

    gulp.task(taskName, function () {
        gulp
            .src(src)
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
};

const jsTask = ({ file, name, type, index } = {
    file: 'js/',
    name: 'index',
    type: '.js',
    index: 0,
}) => {
    const i = index < 10 ? `0${index}` : index;

    const tips = tipFn(i, type);
    const src = file + name + type;
    const taskName = tips + src; // task [00] '.js': js/index.js

    // TASK_js
    TASK_js.push(taskName);
    console.log('[gulp TASK]'.silly, 'js'.warn, tips.info, src.data);

    gulp.task(taskName, () => {
        gulp
            .src(src)
            .pipe(jsImport())
            .pipe(gulp.dest('import'))
            .pipe(plumber({
                errorHandler: notify.onError('Error: <%= error.message %>')
            }))
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(gulp.dest('bundle'));
    });

    // bulid js
    const BUNDLE_src = 'bundle/' + name + type;
    const BUNDLE_taskName = tips + BUNDLE_src; // task [00] '.js': bundle/index.js
    TASK_build_js.push(BUNDLE_taskName);
    console.log('[gulp TASK]'.silly, 'bulid_js'.warn, tips.info, BUNDLE_src.data);

    gulp.task(BUNDLE_taskName, function () {
        gulp
            .src(BUNDLE_src)
            .pipe(stripDebug()) // 删除 console
            .pipe(rename(`${name}.min.js`))
            .pipe(uglify())
            .pipe(header(banner))
            .pipe(gulp.dest('bundle'));
    });
};

const stylTask = ({ file, name, type, index } = {
    file: 'styl/',
    name: 'index',
    type: '.styl',
    index: 0,
}) => {
    const i = index < 10 ? `0${index}` : index;
    const tips = tipFn(i, type);
    const src = file + name + type;
    const taskName = tips + src; // task [00] '.styl': styl/index.styl

    // 生产批量的 src
    TASK_stylus.push(src);
    console.log('[gulp TASK]'.silly, 'stylus'.warn, tips.info, src.data);


    // bulid css
    const BUNDLE_src = 'bundle/' + name + '.css';
    const BUNDLE_taskName = tips + BUNDLE_src; // task [00] '.js': bundle/index.css
    // TASK_build_css
    TASK_build_css.push(BUNDLE_taskName);
    console.log('[gulp TASK]'.silly, 'build_css'.warn, tips.info, BUNDLE_src.data);

    // build task
    gulp.task(BUNDLE_taskName, function () {
        gulp
            .src(`bundle/${name}.css`)
            .pipe(rename(`${name}.min.css`))
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
};

// set tasks
taskNameArray.map((item, index) => {
    if (isJs) {
        jsTask({
            file: 'js/',
            name: item,
            type: '.js',
            index: index,
        });
    }
    if (isStyl) {
        stylTask({
            file: 'styl/',
            name: item,
            type: '.styl',
            index: index,
        });
    }
    if (isPug) {
        useminTask({
            file: './',
            name: item,
            type: '.html',
            index: index,
        });
    }
});

gulp.task('styl', function () {
    gulp
        .src(TASK_stylus)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(stylus())
        .pipe(gulp.dest('bundle'));
});

// watch
gulp.task('autowatch', function () {
    console.log('[gulp autowatch]'.rainbow);
    console.log(' --------------------------------------'.gray);
    console.log('      pug:'.warn, isPug ? 'true'.info : 'false'.error);
    console.log('       js:'.warn, isJs ? 'true'.info : 'false'.error);
    console.log('     styl:'.warn, isStyl ? 'true'.info : 'false'.error);
    console.log(' --------------------------------------'.gray);

    isPug && gulp.watch('pug/*.pug', ['pug']);
    isJs && gulp.watch('js/*.js', TASK_js);
    isStyl && gulp.watch('styl/*.styl', ['styl']);

    if (!(isPug && isJs && isStyl)) {
        console.log('[gulp autowatch]'.rainbow, 'is off'.info);
        console.log(' --------------------------------------'.gray);
        console.log('    Only'.info, '`browsersync`'.debug, 'now!'.info);
        console.log(' --------------------------------------'.gray);
    }
});

// gulp
gulp.task('default', [
    'autowatch',
    'browsersync'
]);

gulp.task('build-TASK_build_js', TASK_build_js);
gulp.task('build-TASK_build_css', TASK_build_css);
gulp.task('build-TASK_usemin', TASK_usemin);

// build
gulp.task('build', [
    'build-TASK_build_js',
    'build-TASK_build_css',
    'build-TASK_usemin',
]);
