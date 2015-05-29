#2015-5-24
##事件级联
当用户在移动装置上点击元素时，浏览器将激活事件。这个动作通常会触发一系列如下事件：`touchstart` → `touchend` → `mouseover` → `mousemove` → `mousedown` → `mouseup` → `click`。
##移动端左右滑动
```
var startX, startY, endX, endY;
pBox.addEventListener('touchstart', function (e) {
	var touch = e.touches[0];
          startY = touch.pageY;
          startX = touch.pageX;
}, false)
pBox.addEventListener('touchmove', function (e) {
	var touch = e.touches[0];
	endX = touch.pageX;
	endY = touch.pageY;
}, false)
pBox.addEventListener('touchend', function (e) {
	if ((startX - endX) > 0) {
		for (var i = 0; i < pList.length; i++) {
			pList[i].style.left = parseInt(pList[i].style.left) - 100 + '%';
			// console.log(parseInt(pList[i].style.left));
		}
	} else if (startX - endX < 0) {
		for (var i = 0; i < pList.length; i++) {
			pList[i].style.left = parseInt(pList[i].style.left) + 100 + '%';
			// console.log(parseInt(pList[i].style.left));
		}
	}
}, false);
```
#2015-5-25
##【网页设计简史】
从早年的画表格、css的出现、flash动画，到后来的css+div定位、responsive design、flat design。  
[http://blog.froont.com/brief-history-of-web-design-for-designers/](http://blog.froont.com/brief-history-of-web-design-for-designers/)
#2015-5-26
##osx `git`自动补全
[http://blog.csdn.net/zhangt85/article/details/43611997](http://blog.csdn.net/zhangt85/article/details/43611997)
##`npm` 安装 `express`
`npm install -g express-generator`
#2015-5-27
##页面可见性API属性和事件  
- `document.hidden`: Boolean值，表示当前页面可见还是不可见  
- `document.visibilityState`: 返回当前页面的可见状态。
 1. `hidden`
 2. `visible`
 3. `prerender`
 4. `preview`  
- `visibilitychange`
```javascript
document.addEventListener("visibilitychange", function() {
	if (document.hidden) {
		document.title = 1;
	} else {
		document.title = 2;
	}
})
```
#2015-5-28
##Retina屏的移动设备如何实现真正1px的线
###iOS 8 和 OS X Yosemite
```css
div {
	border: 1px solid #000;
}
@media (-webkit-min-device-pixel-ratio: 2) {
	div {
		border: 0.5px
	}
}
```
###兼容其他版本的Retina设备方案（ios）
```javascript
// 能力检测
if (window.devicePixelRatio && window.devicePixelRatio >= 2) {
	var elem = document.createElement('div');
	elem.style.border = '.5px solid transparent';
	document.body.appendChild(elem);
	if (elem.offsetHeight == 1) {
		document.querySelector('html').classList.add('hairlines');
	}
	document.body.removeChild(elem);
}
```
```css
div {
	border: 1px solid #bbb;
}
.hairlines div {
	border-width: 0.5px;
}
```
###兼容android
淘宝 M 站是通过 viewport + rem 实现的  
在devicePixelRatio = 2 时，输出 viewport
```html
<meta name="viewport" content="initial-scale=0.5, miximum-scale=0.5, minimun-scale=0.5, user-scaleable=no">
```
在devicePixelRatio = 3 时，输出 viewport  
```html
<meta name="viewport" content="initial-scale=0.3333333333, miximum-scale=0.3333333333, minimun-scale=0.3333333333, user-scaleable=no">
```
###兼容的另一个方案 `伪类 + transform`
原理是把原先元素的 border 去掉，然后利用 :before 或者 :after 重做 border ，并 transform 的 scale 缩小一半，原先的元素相对定位，新做的 border 绝对定位  
####单条border
```css
.hairlines li {
	position: relative;
	border: none;
}
.hairline li:after {
	content: '';
	position: absolute;
	left: 0;
	background: #000;
	width: 100%;
	height: 1px;
	transform: scaleY(0.5);
}
```
####四条border
```
.hairlines li {
	position: relative;
	margin-bottom: 20px;
	border: none;
}
.hairline li:after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	border: 1px solid #000;
	box-sizing: border-box;
	width: 200%;
	height: 200%;
	transform: scale(0.5);
	transform-origin: left top;
}
```
####需要能力检测，该方案支持圆角
```
if (window.devicePixelRatio && window.devicePixelRatio >= 2) {
	document.querySelector('ul').className = 'hairlines';
})
```
#2015-5-29
##`express.bodyParser()`已经不再支持了

需要安装body-parser模块
```
npm install body-parser
```
然后使用代码为：
```
app.use(require('body-parser').urlencoded({extended: true}))
```
##`<embed>`的一些笔记
###`type`属性
```
<embed src="helloworld.swf" type="application/x-shockwave-flash" />
```
###`allowscriptaccess`权限用法
使用 allowscriptaccess 使 Flash 应用程序可与其所在的 HTML 页通信。此参数是必需的，因为 fscommand() 和 getURL() 操作可能导致 JavaScript 使用 HTML 页的权限，而该权限可能与 Flash 应用程序的权限不同。这与跨域安全性有着重要关系。
也就是说如果swf在blog.80s.net.cn下，但是页面在fmail.80s.net.cn下，想用getURL或者fscommand调用页面中的js是不可以的
除非你将value设置为always
value参数说明：
- always 允许随时执行脚本操作。
- never 禁止所有脚本执行操作。
- samedomain 只有在 Flash 应用程序来自与 HTML 页相同的域时才允许执行脚本操作。

所有 HTML 发布模板使用的默认值均为 samedomain。
###flash `wmode`参数详解
[http://www.blueidea.com/tech/web/2009/6469.asp](http://www.blueidea.com/tech/web/2009/6469.asp)
