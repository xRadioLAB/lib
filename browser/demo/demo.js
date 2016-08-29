/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-08-21-05:08:24
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-08-29-12:15:41
 */
window.onload = function () {
    var wb = window.BROWSER;
    console.log(wb);
    if (wb) {

        var htmlClass = document.getElementsByTagName('html')[0].getAttribute('class');

        document.getElementById('text').innerHTML =
            '<li><b>html class:</b>' + htmlClass + '</li>' +
            '<li><b>device: </b>' + wb.device + '</li>' +
            '<li><b>browser: </b>' + wb.browser + '</li>' +
            '<li><b>version: </b>' + wb.version + '</li>' +
            '<li><b>UA: </b>' + wb.UA + '</li>';

    }
};
