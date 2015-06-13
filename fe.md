#知识
##JavaScript
###基本逻辑
####if/for/while/break/continue
这里我觉得没什么好说的，要注意一个是javascript里面有个label语句，可以和break或者continue搭配使用
###函数
####闭包
闭包可以说得实在太多了，比较经典的问题就是**内存中保存值**，和**循环中闭包**的应用，应用的场景可以去模仿一些块级作用域（ES6中可以直接用`let`关键字了），模仿对象的封装(set，get)

```
var foo = ( function() {
    var secret = 'secret';
    // “闭包”内的函数可以访问 secret 变量，而 secret 变量对于外部却是隐藏的
    return {
        get: function () {
            // 通过定义的接口来访问 secret
            return secret;
        },
        set: function ( new_secret ) {
            // 通过定义的接口来修改 secret
            secret = new_secret;
        }
    };
} () );
```
####作用域
#####function
javascript里，使用的是词法作用域（静态）函数是第一公民也只有函数有作用域，作用域能够嵌套，然后有了作用域链
#####catch, with, eval
会欺骗词法作用域，使得程序在运行的时候来修改作用域
#####this
this指的拥有是当前运行环境，但是可以通过call/apply更改
#####call/apply
他们的作用相同，用来代替另一个对象调用一个方法，区别在于他们的第二个参数
call是字符串序列，
apply是数组

####对象
可以说得太多了
#####原型
javascript的继承是基于原型的，当一个对象的原型是另一个对象的时候，他也就有了另一个对象的属性和方法（ES6中class关键字是写对象，暂时只仅仅用过）
目前来说都用`Object.create()`
ES5中，对象原型上还有许多重要的方法和属性，用来描述对象属性，比如可枚举，可修改等等。
#####new的过程
```
function Persion(name) {
	this.name = name;
}
var p1 = new Person('lisheng');
```
关于new的过程，我是这样理解的，new了一个新对象，然后往这个新对象加属性，然后返回这个对象，如果不加new，就往全局对象上创建了。

####内置对象
#####Array
Array上也有许多的有用的方法，函数式编程可以用多很多的ES5中新增的许多数组方法（forEach, map, filiter, every, some, reduce，暂时只知道区别，没在实际项目中用过）
slice()数组切片 **Array.prototype.slice.call() 转化类数组**
splice()，数组的增删都能用大
最近刚整理过Array [http://www.lishengcn.cn/archives/207.html](http://www.lishengcn.cn/archives/207.html)
#####函数对象
需要好好的理解的是三个方法
call()
aplly()
bind()  ps: 低版本IE不支持

```
// 通过以下代码兼容低版本IE的bind
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
##CSS
###position
太简单了，不说了fixed，absolute完全脱离文档流
###display
####inline
行内元素的表现显示，无法设置宽高
####block
块级元素，可设置狂宽高，占一整行，如果需要将元素横向排列float或者position或者flex（float flex常用）
####inline-block
行内块级元素，可以设置宽高的行内元素，需要主要的是设置了这种属性的元素有默认的边距。有方法去除

```
<!-- <li>设置了 display: inline-block -->
<ul>
	<li></li><li></li><li></li>
<ul>
```
通过以上排列`<li>`，或者设置ul的font-size为0

####float，clear
浮动，部分脱离文档流
去除浮动，闭合浮动
float后的元素加clear：both
float的父元素失去高度 overflow: hidden

####盒模型
有IE盒模型和W3C盒模型，其实IE盒模型就是设置了`box-sizing: border-box`的W3C盒模型

####line-height
`line-height`和盒子高度相等是，文字垂直居中，但是当文字足够大得时候，可以看出明显的没居中，
vertical-align: center让行内元素垂直居中
还有写文字上角标，下脚本的效果
我有试过让图片加上`vertical-align: center`，居中，需要接触一个`span`元素来实现居中

###文本
####whitespace / wordbreak
```
	width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
```
###color
前景色，文字颜色
###background
能说得又太多了，尤其是新的css3也增加了许多新属性，可以设置渐变，多背景，切割等等，之前的css的标准也有很多也有的属性，我觉得比较有用的就是`background-position`与精灵图搭配使用
###transform
css3的新属性，变形，通过变形，我们能制作许多的新的图形（配合`::afte ::before`）
有一些选择，拉伸，缩放，平移，3d变形

###transition
过渡，给transform一个过渡效果，需要一个触发

###animation @keyframes
animation的属性和transition都类似，他不需要触发，需要定义关键帧

##WEB API
###DOMAPI
可以说得很多了，这里根据winter大大的提纲来写吧
####insertBefor() / appendChild
他们都是用来将创建的节点(`createElement() / createTextNode()`)插入进文档的
他们的区别：

1. appendChild() 接受一个参数，他是在需要插入的元素上使用的
2. insertBefor() 接受两个参数 前一个删除准备要插入的节点，第二个是文档中存在的节点

自己实现一个insertAfter()
```
function insertAfter(newElement, targetElement){
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
	// 如果最后的节点是目标元素，则直接添加。因为默认是最后
	parent.appendChild(newElement);
}
else {
	parent.insertBefore(newElement, targetElement.nextSibling);
	//如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
	}
}
```
###childNodes / parentNode
####childNodes
类数组，该节点的子节点，节点都有nodeType，1表示Element，3表示文本
####parentNode
该节点的父节点，Document的父为null

###事件
####冒泡和捕获
说得不要再说得问题了，事件3个阶段 捕获>处理>冒泡
IE的模型是冒泡，firebox捕获
w3c标准都支持，用的比较多得是冒泡，可以做事件代理
`addEventListener()` 第三个参数为false表示事件为冒泡模型
有的时候需要阻止冒泡，阻止一些事件默认行为，事件对象都有相应方法
`e.preventDefault() / e.returnValue()` 阻止默认行为
`e.stopPropagation()`阻止冒泡
PS: 事件对象的获取
```
var event = event || windows.event
```
####自定义事件
```
// 创建事件
var evt = document.createEvent('Event');
// 定义事件类型
evt.initEvent('customEvent', true, true);
// 在元素上监听事件
var obj = document.getElementById('testBox');
obj.addEventListener('customEvent', function(){
    console.log('customEvent 事件触发了');
}, false);
```
###CSSOM
这个词我是很陌生的，根据winter大大的思维导图，我学习理解了下


###canvas
画布，学习过，了解一些canvas的基本api，canvas画图的过程主要就是画路径，然后描边框，填充，canvas也有事件
（这个暂时没有使用过，确实比较陌生，我正打算用canvas来模拟一些表单控件来掌握canvas）

##HTML
