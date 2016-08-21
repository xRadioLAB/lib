/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-08-21-05:08:24
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-08-21-08:32:49
 */

$(function () {
    var wb = window.BROWSER;
    $('#text').html(
        '<li><b>html class:</b>' + $('html').attr('class') + '</li>' +
        '<li><b>device: </b>' + wb.device + '</li>' +
        '<li><b>browser: </b>' + wb.browser + '</li>' +
        '<li><b>version: </b>' + wb.version + '</li>' +
        '<li><b>UA: </b>' + wb.UA + '</li>');
    console.log(wb);
});
