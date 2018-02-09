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
 * @(demo)Last modified time: 2016-09-28-09:36:26
 */

(() => {
    const ua = navigator.userAgent.toLowerCase();
    const href = window.location.href;
    const html = document.getElementsByTagName('html')[0];
    let version = ((ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1]);

    let browser = '';
    let device = '';
    let mobileURI = 'mobile.htm';
    let padURI = 'pad.htm';

    const {
        chrome,
        safari,
        firefox,
        trident,
        opera,
        crios,
        msie,
        ie,
        oldie,
        ie9,
        ie10,
        ie11,
        ipad,
        iphone,
        iphoneOs,
        mac,
        macintosh,
        windows,
        pc,
        mobile,
        otherMobile,
        android,
    } = {
            chrome: 'chrome',
            safari: 'safari',
            firefox: 'firefox',
            trident: 'trident',
            opera: 'opera',
            crios: 'crios',
            msie: 'msie',
            ie: 'ie',
            oldie: 'oldie',
            ie9: 'ie9',
            ie10: 'ie10',
            ie11: 'ie11',
            // 设备规则
            ipad: 'ipad',
            iphone: 'iphone',
            iphoneOs: 'iphone os',
            mac: 'mac',
            macintosh: 'macintosh',
            windows: 'windows',
            pc: 'pc',
            mobile: 'mobile',
            otherMobile: 'OtherMobile',
            android: 'android',
        };

    const {
        isMacintosh,
        isIPad,
        isIPhone,
        isIPhoneOS,
        isAndroid,
        isWindows,
        isWindowsMobile,
        isPCMod,
        isEdge,
        isMiPad,
        isMiBrowser,
        isUCWeb,
        isMsie,
        isTrident,
        isChrome,
        isSafari,
        isFF,
        isOpera,
        isGecko,
        isKhtml,
        isV11,
    } = {
            isMacintosh: ua.indexOf(macintosh) > 0,
            isIPad: ua.indexOf(ipad) > 0,
            isIPhone: ua.indexOf(iphone) > 0,
            isIPhoneOS: ua.indexOf(iphoneOs) > 0,
            isAndroid: ua.indexOf(android) > 0,
            isWindows: ua.indexOf(windows) > 0,
            isWindowsMobile: ua.indexOf('windows mobile') > 0,
            isEdge: ua.indexOf('edge') > 0,
            isMiPad: ua.indexOf('mi pad') !== -1,
            isMiBrowser: ua.indexOf('xiaomi/miuibrowser') !== -1,
            isUCWeb: ua.indexOf(/ucweb/i) > 0,
            isPCMod: href.lastIndexOf(`#${pc}`) !== -1,
            isMsie: ua.indexOf(msie) > 0,
            isTrident: ua.indexOf(trident) > 0,
            isChrome: ua.indexOf(chrome) > 0 || ua.indexOf(crios) > 0,
            isSafari: ua.indexOf(safari) > 0,
            isFF: ua.indexOf(firefox) > 0,
            isOpera: ua.indexOf(opera) > 0,
            isGecko: ua.indexOf('gecko') > -1,
            isKhtml: ua.indexOf('khtml') === -1,
            isV11: version === '11.0',
        };

    if (isMacintosh) device += ` ${mac}`;
    if (isIPad) device += ` ${ipad}`;
    if (isIPhone || isIPhoneOS) device += ` ${iphone}`;
    if (isAndroid) device += ` ${android}`;
    if (isWindows) device += ` ${windows}`;
    if (isWindowsMobile) device += ` windows-mobile`;
    if (isEdge) device += ` edge`;
    if (isMiPad) device += ` mi-pad`;
    if (isMiBrowser) device += ` xiaomi-miuibrowser`;
    if (isUCWeb) device += ` ucweb`;
    if (isPCMod) device += ` ${pc}-mod`;

    const isJump = typeof window.BRO_mobile === 'string' && !isPCMod;
    const hasJumpPad = typeof window.BRO_pad === 'string' && !isPCMod;
    console.log('isJump: ', isJump);
    console.log('hasJumpPad: ', hasJumpPad);

    const jumpToPad = () => {
        if (window.BRO_pad) {
            padURI = window.BRO_pad;
        }
        console.log('------------- now !!! on pad: ', padURI);
        window.location.href = padURI;
    }

    const jumpToMoblie = () => {
        if (window.BRO_mobile) {
            mobileURI = window.BRO_mobile;
        }
        console.log('------------- now !!! on mobile: ', mobileURI);
        window.location.href = mobileURI;
    }

    // 跳转模块
    if (isJump) {
        // 判断 pad 或 phone
        if (hasJumpPad && (isMiPad || isMiBrowser || isIPad)) {
            jumpToPad();
        } else if (isIPhone || isIPhoneOS || isAndroid || isWindowsMobile || isUCWeb) {
            jumpToMoblie();
        }
    } else if (hasJumpPad && (isMiPad || isMiBrowser || isIPad)) {
        jumpToPad();
    }

    // 是否为 ie
    if (isMsie) {
        if (!isOpera) {
            if (version < 9.0) {
                browser = oldie;
            } else if (version < 10.0) {
                browser = ie9;
            } else if (version < 11.0) {
                browser = ie10;
            }
        }
    } else {
        if (isTrident) browser = ie11;
        if (isFF) browser = firefox;
        if (isOpera) browser = opera;
        if (isSafari) browser = safari;
        if (isChrome) browser = chrome;
    }

    if (browser === '') {
        browser = 'unknown';
    }
    // 是否拥有 trim 方法
    if (!String.prototype.trim) {
        String.prototype.trim = function trim() {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    }
    // 验证 html.className 是否为空, 如果不为空则添加 ' ' 用来分割后面的 className
    // console.log('html.className length:', html.className.length);
    if (html.className.length > 0) {
        html.className = html.className.trim(); // 去除前后冗余空格
        html.className += ' ';
    }

    // 如果是ie 或者高版本ie（edge or ie11）
    if (isMsie || !isMsie && isTrident) {
        html.className += `${ie} ${browser}`;
    } else {
        html.className += browser;
    }

    if (device === '') {
        device = ' unknown';
    }

    html.className += `${device}`;
    device = device.trim();

    // add3个布尔验证 v2.3.0
    @import './is-dev.js'
    @import './is-pc.js'

    const isAboveIE9 = browser && ("oldie" !== browser && "ie9" !== browser);
    const isDev = isDevFn(href);
    const isPc = isPcFn(device);

    // 给 html 添加 is-pc 和 is-mobile 类
    if (isPc) {
        html.className += ' is-pc';
    } else {
        html.className += ' is-mobile';
    }

    // 输出 BROWSER 对象
    window.BRO = {
        browser: browser,
        device: device,
        ver: version,
        ua: ua,
        isAboveIE9: isAboveIE9,
        isDev: isDev,
        isPc: isPc,
    };
    window.isAboveIE9 = isAboveIE9;
    window.isDev = isDev;
    window.isPc = isPc;


    console.log('---------------------------\n> browser.js done!', BRO);
})();
