# **lib**

__*lib*__ 是我个人收集的比较常用的js框架集合, 直接`<script>`标签链接到页面即可使用。

欢迎您 **`Start`**, 我们会不定期更新

PS: 使用方法不定期补全。。。如果我有时间的话😅

## How to use?

1. 详细本 **README.md** 和对应模块的 **API**
2. 下载仓库到本地使用

## Notices

1. 尽可能的使用 **`.min`** 的压缩版本
2. 尽可能使用最新版本的js库文件
3. 发布生产模式之前，请务必进行本地测试

## API
### _jquery.browser.min.js_
#### Detail:
- `$.browser() // 返回browser关键字对象`
- `browser` :string 浏览器
- `version` :string 浏览器版本
- `device`  :string 设备

#### Demo:
```javascript
$(function() {
    // 初始化browser
    var browser = $.browser();
    console.log(browser); // 返回结果object：{browser: "chrome", version: "537.36", device: "mac"}

    // 使用 browser || version || device 实现自定义的浏览器识别
    if (browser.version < 9.0 && browser.browser === 'ie') {
        // todo sth..
    }
});
```
#### Tips:
初始化 `$.browser();` 之后，_jquery.browser.min.js_ 会给html标签添加识别的`class`类名，例如（但不限于）下面的格式：
```html
<html class="oldie">
```
使用css递进选择器您可以很方便的制作对应浏览器的css hacks，它们能够完美实现渐进式增强，几乎无需使用旧式的 `_`、`*`的css hacks。
