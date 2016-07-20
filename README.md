# **lib**
lib是一个通用框架合集，都是比较常用的js框架，不定期更新，
使用方法非常简单，直接`script`标签链接到页面使用即可。

PS: 使用方法近期补全。。。好吧，如果我有时间的话😅

# jquery.browser.min.js 使用方法
https://github.com/xinhuaRadioLAB/lib

```js
$(function() {
    // 初始化browser
    var browser = $.browser();
    console.log(browser); // {browser: "chrome", version: "537.36", device: "mac"}

    // ie8 hacks: 隐藏封面
    if (browser.version < 9.0 && browser.browser === 'ie') {
        // todo sth..
    }
});
```
