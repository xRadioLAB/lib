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

(() => {

    // 浏览器规则
    const b = {
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
        crios: 'crios',
    };

    // 设备规则
    const d = {
        ipad: 'ipad',
        iphone: 'iphone',
        mac: 'mac',
        macintosh: 'macintosh',
        windows: 'windows',
    };

    let HTML = document.getElementsByTagName('html')[0];
    let UA = navigator.userAgent.toLowerCase();
    let version = ((UA.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1]);

    let browser = null;
    let device = null;

    // browser
    let msie = UA.indexOf(b.msie) > 0;
    let trident = UA.indexOf(b.trident) > 0;
    let chrome = UA.indexOf(b.chrome) > 0 || UA.indexOf(b.crios) > 0;
    let safari = UA.indexOf(b.safari) > 0;
    let firefox = UA.indexOf(b.firefox) > 0;
    let opera = UA.indexOf(b.opera) > 0;

    // device
    let ipad = UA.indexOf(d.ipad) > 0;
    let iphone = UA.indexOf(d.iphone) > 0;
    let macintosh = UA.indexOf(d.macintosh) > 0;
    let windows = UA.indexOf(d.windows) > 0;

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
        HTML.className = `${b.ie} ${browser}`;
    } else {
        HTML.className = browser;
    }
    HTML.className += ` ${device}`;

    window.BROWSER = {
        browser: browser,
        device: device,
        version: version,
        UA: UA,
    };

    if (MOBILE) {
        console.log(MOBILE);
    }

    console.log('BROWSER');
})();
