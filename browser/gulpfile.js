/**
 * @Author: SuperMoo <SuperWoods>
 * @Date:   2017-05-15-16:08:47
 * @Email:  st_sister@me.com
 * @Filename: gulpfile.js
 * @Last modified by:   SuperWoods
 * @Last modified time: 2017-06-15-11:50:11
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */

// version 0.1.1

const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const jsImport = require('gulp-js-import');
const postcss = require('gulp-postcss');
const atImport = require('postcss-import');
const rename = require("gulp-rename");
const header = require('gulp-header');
const dateFormat = require('dateformat');
const pkg = require('./package.json');
const stripDebug = require('gulp-strip-debug');

const getTime = (formats) => {
    const now = new Date();
    return dateFormat(now, formats);
}
const banner = [
    '/**',
    ` * Copyright (c) 2000 - ${getTime("yyyy")} XINHUANET.com All Rights Reserved.`,
    ` * ${pkg.name} v${pkg.version}`,
    ` * @time ${getTime("yyyy-mm-dd HH:MM:ss")}`,
    ' */',
    ''
].join('\n');

gulp.task('browsersync', function () {
    var files = [
        '*.htm',
        '*.html',
        'js/*.js',
        'bundle/*.js',
    ];
    browsersync.init(files, {
        server: {
            baseDir: './'
        },
        notify: true,
    });
});

gulp.task('babel', function () {
    return gulp.src([
        'js/browser.js',
    ])
        .pipe(jsImport()) // jsImport
        .pipe(gulp.dest('import'))
        // .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        })) //错误处理
        .pipe(babel({
            presets: ['env']
        }))
        // .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('bundle'));
});

// watch
gulp.task('autowatch', function () {
    gulp.watch('js/*.js', ['babel']);
});

gulp.task('buildJS', function () {
    gulp.src([
        'bundle/browser.js',
    ])
        // .pipe(concat('browser.all.js')) //合并后的文件名
        // .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('browser.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('bundle'));
});

// ------------------------------------------------------------------------ 命令
// 开发模式 gulp
gulp.task('default', [
    'autowatch',
    'browsersync'
]);

// 生产模式 gulp build
gulp.task('build', [
    'buildJS',
]);
