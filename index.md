# 2015-5-24
## 事件级联
当用户在移动装置上点击元素时，浏览器将激活事件。这个动作通常会触发一系列如下事件：`touchstart` → `touchend` → `mouseover` → `mousemove` → `mousedown` → `mouseup` → `click`。
## 移动端左右滑动
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

# 2015-5-25
## 【网页设计简史】
从早年的画表格、css的出现、flash动画，到后来的css+div定位、responsive design、flat design。
[http://blog.froont.com/brief-history-of-web-design-for-designers/](http://blog.froont.com/brief-history-of-web-design-for-designers/)
# 2015-5-26
## osx `git`自动补全
[http://blog.csdn.net/zhangt85/article/details/43611997](http://blog.csdn.net/zhangt85/article/details/43611997)
## `npm` 安装 `express`
`npm install -g express-generator`
# 2015-5-27
## 页面可见性API属性和事件
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

# 2015-5-28
## Retina屏的移动设备如何实现真正1px的线
### iOS 8 和 OS X Yosemite
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
### 兼容其他版本的Retina设备方案（ios）
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
### 兼容android
淘宝 M 站是通过 viewport + rem 实现的
在devicePixelRatio = 2 时，输出 viewport
```html
<meta name="viewport" content="initial-scale=0.5, miximum-scale=0.5, minimun-scale=0.5, user-scaleable=no">
```
在devicePixelRatio = 3 时，输出 viewport
```html
<meta name="viewport" content="initial-scale=0.3333333333, miximum-scale=0.3333333333, minimun-scale=0.3333333333, user-scaleable=no">
```
### 兼容的另一个方案 `伪类 + transform`
原理是把原先元素的 border 去掉，然后利用 :before 或者 :after 重做 border ，并 transform 的 scale 缩小一半，原先的元素相对定位，新做的 border 绝对定位
#### 单条border
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
#### 四条border
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
#### 需要能力检测，该方案支持圆角
```
if (window.devicePixelRatio && window.devicePixelRatio >= 2) {
	document.querySelector('ul').className = 'hairlines';
})
```
# 2015-5-29
## `express.bodyParser()`已经不再支持了

需要安装body-parser模块
```
npm install body-parser
```
然后使用代码为：
```
app.use(require('body-parser').urlencoded({extended: true}))
```
## `<embed>`的一些笔记
### `type`属性
```
<embed src="helloworld.swf" type="application/x-shockwave-flash" />
```
### `allowscriptaccess`权限用法
使用 allowscriptaccess 使 Flash 应用程序可与其所在的 HTML 页通信。此参数是必需的，因为 fscommand() 和 getURL() 操作可能导致 JavaScript 使用 HTML 页的权限，而该权限可能与 Flash 应用程序的权限不同。这与跨域安全性有着重要关系。
也就是说如果swf在blog.80s.net.cn下，但是页面在fmail.80s.net.cn下，想用getURL或者fscommand调用页面中的js是不可以的
除非你将value设置为always
value参数说明：
- always 允许随时执行脚本操作。
- never 禁止所有脚本执行操作。
- samedomain 只有在 Flash 应用程序来自与 HTML 页相同的域时才允许执行脚本操作。

所有 HTML 发布模板使用的默认值均为 samedomain。
### flash `wmode`参数详解
[http://www.blueidea.com/tech/web/2009/6469.asp](http://www.blueidea.com/tech/web/2009/6469.asp)

# 2015-5-30
## `div`内图片垂直居中
```css
div {
	width:600px; height:600px;
}
span {
	height: 100%; display: inline-block; vertical-align: middle;
}
img {
	width: 300px; height: 300px; vertical-align: middle;
}
```
```html
<div><span></span><img src="..."></div>
```
## CSS3 object-position/object-fit属性
[http://www.zhangxinxu.com/wordpress/2015/03/css3-object-position-object-fit/comment-page-1/](http://www.zhangxinxu.com/wordpress/2015/03/css3-object-position-object-fit/comment-page-1/)

# 2015-5-31
## `git`删除分支
### 本地
```
git branch -d <name>
```
### 远程
```
git push origin :<name>
```
## `git`版本回退
```
git reset --hard commit_id
```
[http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013744142037508cf42e51debf49668810645e02887691000](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013744142037508cf42e51debf49668810645e02887691000)
## `git`回退修改
### 工作区修改
```
git checkout -- file
```
### 暂存区修改
```
git reset HEAD file
```

# 2015-6-2
## `flex`兼容
```
.foo{
  display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
  display: -moz-box; /* Firefox 17- */
  display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
  display: -moz-flex; /* Firefox 18+ */
  display: -ms-flexbox; /* IE 10 */
  display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */}
```

## `getArgs()`
```
function getArgs() {
    var args = {};
    var query = location.search.substring(1);
    var pairs = query.split("&");

    for(var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
            var argname = pairs[i].substring(0,pos);
            var value = pairs[i].substring(pos+1);
            value = decodeURIComponent(value);
            args[argname] = value;
    }
    return args;
}
```

# 2015-6-4
## `clearfix`
```
.clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; }

.clearfix { *zoom:1; }
```

# 2015-6-6
## IE6~8部署`Function.prototype.bind()`
```
if (!function() {}.bind) {
    Function.prototype.bind = function(context) {
        var self = this
            , args = Array.prototype.slice.call(arguments);

        return function() {
            return self.apply(context, args.slice(1));
        }
    };
}
```
## 将类数组转化为真实数组
```
trueArr = Array.prototype.slice.call(likeArr);
```

# 2015-6-7
## CSS3的新单位
### ch
数字“0”的宽度
### rem
相对长度单位。相对于根元素(即html元素)font-size计算值的倍数
### vw
相对于视口的宽度。视口被均分为100单位的vw
### vh
相对于视口的高度。视口被均分为100单位的vh
### vmax
相对于视口的宽度或高度中较大的那个。其中最大的那个被均分为100单位的vmax
### vmin
相对于视口的宽度或高度中较小的那个。其中最小的那个被均分为100单位的vmin

# 2015-6-8
## css3动画移动端过场效果
```
.slide.in {
  -webkit-animation-name: slideinfromright;
  animation-name: slideinfromright;
}
.slide.out {
  -webkit-animation-name: slideouttoleft;
  animation-name: slideouttoleft;
}
.slide.reverse.out {
  -webkit-animation-name: slideouttoright;
  animation-name: slideouttoright;
}
.slide.reverse.in {
  -webkit-animation-name: slideinfromleft;
  animation-name: slideinfromleft;
}

/* keyframes for slidein from sides */
@-webkit-keyframes slideinfromright {
  from { -webkit-transform: translate3d(100%,0,0); }
  to { -webkit-transform: translate3d(0,0,0); }
}
@keyframes slideinfromright {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@-webkit-keyframes slideinfromleft {
  from { -webkit-transform: translate3d(-100%,0,0); }
  to { -webkit-transform: translate3d(0,0,0); }
}
@keyframes slideinfromleft {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
/* keyframes for slideout to sides */
@-webkit-keyframes slideouttoleft {
  from { -webkit-transform: translate3d(0,0,0); }
  to { -webkit-transform: translate3d(-100%,0,0); }
}
@keyframes slideouttoleft {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}
@-webkit-keyframes slideouttoright {
  from { -webkit-transform: translate3d(0,0,0); }
  to { -webkit-transform: translate3d(100%,0,0); }
}
@keyframes slideouttoright {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}

/* chrysanthemum loading effect */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.recommendItem {

}

.out {
  display: none;
}

.in, .out {
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.in {
  -webkit-animation-timing-function: ease-in;
  -webkit-animation-duration: 350ms;
  animation-timing-function: ease-in;
  animation-duration: 350ms;
}
.out {
  -webkit-animation-timing-function: ease-in;
  -webkit-animation-duration: 350ms;
  animation-timing-function: ease-in;
  animation-duration: 350ms;
}
```

# 2015-6-12
## angular中指令遇到的坑
[http://segmentfault.com/q/1010000002897406](http://segmentfault.com/q/1010000002897406)
解决方案
link中，用timeout延时操作下
## 触摸事件级链


### 滑动
```
touchstart touchmove touchend scroll
```
### 缩放
```
touchstart touchmove touchend scorll resize
```
### 双触
```
touchstart 两次touchend scroll resize
```
### 按住
```
touchstart touchend (contentmenu)
```

### 触摸事件有一个鼠标事件没有的特性 touchList（记录多个触点）

> ##### clientX/pageX的区别在于前者相对于视觉视口，后者是布局视口，布局视口是可以滚动的

# 2015-6-15
## javascript的继承方式
### 构造函数绑定
```
function Cat(name,color){
　　　　Animal.apply(this, arguments);
　　　　this.name = name;
　　　　this.color = color;
　　}
　　var cat1 = new Cat("大毛","黄色");
　　alert(cat1.species); // 动物
```
### prototype模式
```
Cat.prototype = new Animal();
　　Cat.prototype.constructor = Cat;
　　var cat1 = new Cat("大毛","黄色");
　　alert(cat1.species); // 动物
```
### 直接继承prototype
```
function Animal(){ }
Animal.prototype.species = "动物";

Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
### 利用空对象作为中介
```
var F = function(){};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;
```
### 拷贝继承
```
　　function extend2(Child, Parent) {
　　　　var p = Parent.prototype;
　　　　var c = Child.prototype;
　　　　for (var i in p) {
　　　　　　c[i] = p[i];
　　　　　　}
　　　　c.uber = p;
　　}

　　extend2(Cat, Animal);
　　var cat1 = new Cat("大毛","黄色");
　　alert(cat1.species); // 动物
```

# 2015-6-16
## 浅拷贝和深拷贝
```
//浅拷贝
function simpleClone(obj){
  if(typeof obj !='object') return false;
  var cloneObj={};
  for(var i in obj) cloneObj[i]=obj[i];
  return cloneObj;
}
//由于浅拷贝在复制对象中引用类型的属性时仅仅是复制地址，所以对克隆对象的该属性的操作也会影响到原来的对象。
//请看下面例子
var obj1={a:1,b:2,c:[1,2,3]};
var obj2=simpleClone(obj1);
console.log(obj1.c); //[1,2,3]
console.log(obj2.c); //[1,2,3]
obj2.c.push(4);
console.log(obj2.c); //[1,2,3,4]
console.log(obj1.c); //[1,2,3,4]   改变obj2.c的同时，也改变了obj1.c。因为两者都指向了堆内存中的同一个array对象


//深拷贝
function deepClone(obj,cloneObj){
  if(typeof obj !='object') return false;
  var cloneObj=cloneObj || {};
  for(var i in obj){
    if(typeof obj[i]==='object'){
      cloneObj[i]=(obj[i] instanceof Array)?[]:{};
      arguments.callee(obj[i],cloneObj[i]);
    }else{
      cloneObj[i]=obj[i];
    }
  }
  return cloneObj;

}
//通过深拷贝就不是简单的复制引用类型的地址了
var obj1={a:1,b:2,c:[1,2,3]};
var obj2=deepClone(obj1);
console.log(obj1.c); //[1,2,3]
console.log(obj2.c); //[1,2,3]
obj2.c.push(4);
console.log(obj2.c); //[1,2,3,4]
console.log(obj1.c); //[1,2,3]
```

# 2015-6-17
## `object-fit`
[http://www.w3cplus.com/css3/css3-object-fit-and-object-position-properties.html](http://www.w3cplus.com/css3/css3-object-fit-and-object-position-properties.html)

# 2015-6-18
## DOM操作的一些常见API
getElementById,getElementsByClassName,getElementsByTagName,querySelector(All),createElement,innerText,appendChild,insertBefore,removeChild,innerHTML
getAttribute,setAttribute,datalist
style, style.cssText, class, styleSheet, window.getComputedStyle

# 2015-6-22
## flex的两个公式
### flex-grow
flex-basis + flow-grow / sum(flow-grow) * remain
###flex-shrink
flex-basis + flex-shrink / sum(flex-shrink) * remain (remain为负数) 其实就是将负空间按权值分配

# 2015-6-29
## 知乎上，前端开发领域有哪些值得推荐的问答
[http://www.zhihu.com/question/20246142?utm_source=weibo&utm_medium=weibo_share&utm_content=share_question&utm_campaign=share_sidebar](http://www.zhihu.com/question/20246142?utm_source=weibo&utm_medium=weibo_share&utm_content=share_question&utm_campaign=share_sidebar)

## 解决grunt-contrib-imagemin无法压缩jpg格式的问题
从相关的github issue来看，好像win7系统32位，64位都有如此问题。任务运行时，bug提示为：

`Running "imagemin:dist" (imagemin) task Fatal error: spawn ENOENT`

怎么解决呢？

首先，在package.json文件中增加"jpegtran-bin": "0.2.0",必须写在grunt-contrib-imagemin依赖声明之前。注意，增加的版本号不需要"~"哦！

比如我的package.json:
```
{
  "name": "grunt-test",
  "version": "0.1.0",
  "dependencies": {
    "grunt-css-combo": "~0.2.2"
  },
  "devDependencies": {
    "grunt": "~0.4.2",
    "jpegtran-bin": "0.2.0",
    "grunt-contrib-imagemin": "~0.4.1"
  }
}
```
然后删掉本地的node_modules目录，重新安装。

Gruntfile.js配置：
```
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                files: [{
                    expand: true,
                    cwd: "./dev/images/",
                    src: ["**/*.{jpg,png,gif}"],
                    dest: "./official/images/"
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-imagemin'); //图像压缩

    // 注册任务
    grunt.registerTask('default', ['imagemin']);
};
```
再次启动grunt任务命令，.jpg格式的图片全部可以压缩了。very nice！

**注意更新使用grunt-contrib-imagemin的0.4.1 版本，因为最新版的会有同样问题。**


# 2015-8-7
## 中英文两端对齐
[http://www.zhangxinxu.com/wordpress/2015/08/chinese-english-same-padding-text-justify/](http://www.zhangxinxu.com/wordpress/2015/08/chinese-english-same-padding-text-justify/)
```
ox.style.textAlign = "justify";
box.style.letterSpacing = '-.15em';
box.innerHTML = box.innerHTML.split("").join(" ");
```

# 2015-10-20
## Debounce 和 Throttle 的原理及实现
```
/**
*
* @param fn {Function}   实际要执行的函数
* @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
*
* @return {Function}     返回一个“去弹跳”了的函数
*/
function debounce(fn, delay) {

  // 定时器，用来 setTimeout
  var timer

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {

    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

$(document).on('mouvemove', debounce(function(e) {
    // 代码
}, 250))
$('input').on('keyup', debounce(function(e) {
    // 发送 ajax 请求
}, 300))
```
```
/**
*
* @param fn {Function}   实际要执行的函数
* @param delay {Number}  执行间隔，单位是毫秒（ms）
*
* @return {Function}     返回一个“节流”函数
*/

function throttle(fn, threshhold) {

  // 记录上次执行的时间
  var last

  // 定时器
  var timer

  // 默认间隔为 250ms
  threshhold || (threshhold = 250)

  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function () {

    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments

    var now = +new Date()

    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshhold) {
      clearTimeout(timer)

      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshhold)

    // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}
$(document).on('mouvemove', throttle(function(e) {
    // 代码
}, 250))
```

# 2015-10-20
## uuid
```
function uuid() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}
```


