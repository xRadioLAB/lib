# **jquery.browser.js**

## Detail:

```
- `$.browser() // 返回browser关键字对象`
- `browser` 浏览器
- `version` 浏览器版本
- `device`  设备
```

## Demo:

```javascript
// 初始化browser
var browser = $.browser();
// browser object: {browser: "chrome", version: "537.36", device: "mac"}

// 使用 browser || version || device 实现自定义的浏览器识别
if (browser.version < 9.0 && browser.browser === 'ie') {
    // todo...
}
```
