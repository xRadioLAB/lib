# **browser.js**

## Detail:

- _browser.js_ 无需 jquery 依赖
- 使用 _browser.js_ 给 **window** 添加 **BROWSER** 对象，可以使用 `window.BROWSER` 查看结果

## Demo:

```javascript
// 实例化 window.BROWSER
var browser = window.BROWSER;
// 例如在 mac chrome会得到结果： {browser: "chrome", version: "537.36", device: "mac"}

// 使用 browser || version || device 实现自定义的浏览器识别
if (browser.version < 9.0 && browser.browser === 'ie') {
    // todo...
}
```
