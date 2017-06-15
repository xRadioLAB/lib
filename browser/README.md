# **browser.js**

demo: <https://xinhuaradiolab.github.io/lib/browser/index.htm>

## _**Introduction**_

-   _**browser.js**_ 无须 jQuery.
-   _**browser.min.js**_ 的页面，将自动识别终端设备，移动设备能够自动跳转指定地址。
-   js 全局对象 `window.BRO`，通过他我们可以添加更多浏览器自定义扩展。您可以直接在控制台使用 `console.log(BRO)` 查看。

## _**Functions**_

_**browser.js**_ 拥有一个hash开关和两个内置扩展功能，**所有功能都是可选的，默认不开启**：

### 指定跳转地址:

现在跳转依赖两个必要的 js 条件，两个条件可以单独使用。
如果没有设置任何跳转地址，则不开启跳转功能。

```html
    <script>
        var BRO_pad = '/test/pad.htm'; // pad 跳转地址
        var BRO_mobile = '/test/mobile.htm'; // mobile 跳转地址
    </script>
```

### hash 开关功能:

hash 开关功能直接使用 hash 即可开启，页面地址栏尾部添加 `#pc`, 将停止跳转。 同时 `<html>` 标签添加 `<html class="pcMod">`，用于单独标记这个页面状态。

### _**Extensions**_

自定义扩展，通过实例化 `window.BRO` 来添加自定义扩展：

```javascript
// 声明一个变量 browser
var browser = window.BRO;
// 例如在 mac chrome中，此时得到结果： {browser: "chrome", version: "537.36", device: "mac", UA: "..."}

// 使用 browser || ver || device || ua 实现自定义的浏览器识别
if (browser.ver < 9.0 && browser.browser === 'ie') {
    // todo sth...
}
```

## _**Tips**_

_**browser.js**_ 通过 javascript 对象 **`navigator.userAgent`** 实现判断浏览器和设备识别，自动给 `<html>` 标签添加带有浏览器信息的 `class` 类来控制兼容性调整所需要的 _**css hacks**_, 所以使用 _**browser.js**_ 几乎不会造成产生非标准的 class 类的问题。

### 通常情况下：

例如：mac电脑中的 chrome 浏览器，`<html>` 标签将自动识别为 `<html class="chrome mac">`, 如果你想给这个设备的浏览器设置单独的样式，即可在您的样式表文件中添加样式：

```css
.style1 { background: green; } /* 全部非 chrome浏览器中 .style1 背景为绿 */
.chrome .style1 { background: red; } /* chrome浏览器中 .style1 背景色变为红 */
```

## ie 浏览器类（**非常重要**）：

所有 ie 浏览器将自动添加 `ie` 类，用于区别其他浏览器，低于 ie8 的版本将出现 `oldie`，edge 将出现`ie11` 或 `edge` （也可能同时出现）, 其他版本（9、10）将出现对应的ie版本`ie9`、`ie10`。

### `unknown` 未知浏览器:

无法识别的浏览器和设备将返回 `unknown`，例如一部 iPhone 手机中的微信内置的浏览器，将可能会出现 `<html class="unknown iphone">`。

## _**Bugs**_

由于目前我们缺少android、小米、windows phone等终端设备，所以这些设备的识别可靠性有待后续验证。如果您发现了一些 bug，您可以 e-mail 我：_**st_sister@me.com**_ 非常感谢您的反馈！

* * *

如果您想捐赠我们，您可以 e-mail 我：_**st_sister@me.com**_ 沟通。

PS: 一起喝杯☕️是个不错的开始哦！😊

Have fun~

Chrees🍻
