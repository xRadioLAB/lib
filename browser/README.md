# **browser.js**

## How to use

- _browser.js_ 无需 jquery 依赖
- 使用 _browser.js_ 给 **window** 添加 **BROWSER** 对象，可以使用 `window.BROWSER` 查看结果

```javascript
// 实例化 window.BROWSER
var browser = window.BROWSER;
// 例如在 mac chrome会得到结果： {browser: "chrome", version: "537.36", device: "mac"}

// 使用 browser || version || device 实现自定义的浏览器识别
if (browser.version < 9.0 && browser.browser === 'ie') {
    // todo...
}
```

## API

_browser.js_ 通过浏览器 UA 识别浏览器和设备信息，浏览器兼容主要通过给 `html` 标签添加 `class` 的方法实现。

### 一般情况下：

例如mac电脑中的chrome浏览器，html标签将获得`class`为`chrome mac`, 如果你想给这个设备的浏览器设置单独的样式，即可在您的样式表中添加：

```css
.style1 { background: green; } /* 非 chrome浏览器 中 style1 背景为绿色 */
.chrome .style1 { background: red; } /* chrome浏览器中 style1 背景色变为红色 */
```

### 未知浏览器:

设备如果遇到无法识别的浏览器将返回 `class`名： `unknown`，例如微信内置的浏览器。
