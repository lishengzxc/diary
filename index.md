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