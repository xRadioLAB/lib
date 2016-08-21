'use strict';

/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-06-17-16.35
 *          2016-07-11-15.04
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-08-21-08:04:03
 */

(function () {

    // 浏览器规则
    var b = {
        msie: 'msie',
        ie: 'ie',
        oldie: 'oldie',
        ie9: 'ie9',
        ie10: 'ie10',
        ie11: 'ie11',
        trident: 'trident',
        chrome: 'chrome',
        safari: 'safari',
        firefox: 'firefox',
        opera: 'opera',
        crios: 'crios'
    };

    // 设备规则
    var d = {
        ipad: 'ipad',
        iphone: 'iphone',
        mac: 'mac',
        macintosh: 'macintosh',
        windows: 'windows'
    };

    var HTML = document.getElementsByTagName('html')[0];
    var UA = navigator.userAgent.toLowerCase();
    var version = (UA.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];

    var browser = null;
    var device = null;

    // browser
    var msie = UA.indexOf(b.msie) > 0;
    var trident = UA.indexOf(b.trident) > 0;
    var chrome = UA.indexOf(b.chrome) > 0 || UA.indexOf(b.crios) > 0;
    var safari = UA.indexOf(b.safari) > 0;
    var firefox = UA.indexOf(b.firefox) > 0;
    var opera = UA.indexOf(b.opera) > 0;

    // device
    var ipad = UA.indexOf(d.ipad) > 0;
    var iphone = UA.indexOf(d.iphone) > 0;
    var macintosh = UA.indexOf(d.macintosh) > 0;
    var windows = UA.indexOf(d.windows) > 0;

    // 是否为 ie
    if (msie) {
        if (!opera) {
            if (version < 9.0) {
                browser = b.oldie;
            } else if (version < 10.0) {
                browser = b.ie9;
            } else if (version < 11.0) {
                browser = b.ie10;
            }
        }
    } else if (trident) {
        browser = b.ie11;
    } else if (chrome) {
        browser = b.chrome;
    } else if (safari) {
        browser = b.safari;
    } else if (firefox) {
        browser = b.firefox;
    } else if (opera) {
        browser = b.opera;
    }

    if (iphone) device = d.iphone;
    if (ipad) device = d.ipad;
    if (macintosh) device = d.mac;
    if (windows) device = d.windows;

    if (msie || !msie && trident) {
        HTML.className = b.ie + ' ' + browser;
    } else {
        HTML.className = browser;
    }
    HTML.className += ' ' + device;

    window.BROWSER = {
        browser: browser,
        device: device,
        version: version,
        UA: UA
    };

    if (MOBILE) {
        console.log(MOBILE);
    }

    console.log('BROWSER');
})();
