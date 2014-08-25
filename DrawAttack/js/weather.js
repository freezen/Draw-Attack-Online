var floor = Math.floor;//向下取整
var canvas_weather;//画布
var context;//画布上下文
var width;//背景图片、画布宽
var height;//背景图片、画布宽
var size;//像素点个数、width*height
var nextPoint = [];//下一振幅
var prePoint = [];//上一振幅
var tempPoint = [];//临时存储
var imgData;//背景图片数据
var speed_weather = 5;//下雨大小，默认是一秒钟一个雨滴
var weight = 50000;//雨滴的大小
var rain_speed=null;//存储setInterval 返回值
var rain_spread=null;//存储setInterval 返回值
var image_rain=document.getElementById("rain");
/**
	author:qingfeilee
	date:2012-03-24
	description:初始化系统函数
**/
function initRain(){
	initSize();
	initPoint();
	initCanvas_rain();
	loadImage();
}

//下雨控制器
function startRain(){
	rain_speed=setInterval(spread, 1000/60);
	image_rain=setInterval(rain, speed_weather);
}
function pauseRain(){
	clearInterval(rain_speed);
	clearInterval(image_rain);
}
/**
	author:qingfeilee
	date:2012-03-24
	description:绘制图片函数
**/
function loadImage(){
	context.drawImage(image_rain, 0, 0);
	imgData = context.getImageData(0, 0, width, height);
}
/**
	author:qingfeilee
	date:2012-03-24
	description:初始化画布信息
**/
function initCanvas_rain(){
	canvas_weather = document.getElementById('ripper');
	context =canvas_weather.getContext('2d');
	canvas_weather.width = width;
	canvas_weather.height = height;
	//canvas_weather.onclick = function(e) {
	//	setDropPoint(floor(e.clientX-(document.body.clientWidth  - width)/2), floor(e.clientY - (document.body.clientHeight  - height) / 2), 15000);
	//}
}
/**
	author:qingfeilee
	date:2012-03-24
	description:设置画布宽高及画布像素数
**/
function initSize(){
	width = 200;
	height = 109;
	//document.getElementById("box").style.width = "1280px";
	//document.getElementById("box").style.height = "699px";
	size = width*height;
}
/**
	author:qingfeilee
	date:2012-03-24
	description:初始化存储图像前一个和后一个点的数组
**/
function initPoint(){
	for (var i = 0; i < size; i++) {
		nextPoint.push(0);
		prePoint.push(0);
	}            	
}
/**
	author:qingfeilee
	date:2012-03-24
	description:一石激起千层浪，设置波动点及注入的能量
				其中x表示物体进入水面的X坐标，Y表示物体进入水面的Y坐标，power表示物体的能量大小
**/
function setDropPoint(x, y, power) {
	if (x < 2 || x > width - 2 || y < 1 || y > height - 2) return;
	var i = x + y * width;
	nextPoint[i] += power;
	nextPoint[i - 1] -= power;
}
/**
	author:qingfeilee
	date:2012-03-24
	description:核心算法，处理像素的波动效果
	PS:该算法非原创，借鉴网络上多个版本算法综合
**/
function spread() {
	var img = context.getImageData(0, 0, width, height),
	data = img.data;
	//平均一下各个点的能量
	for (var i = width + 1; i < size - width - 1; i += 2) {
		for (var x = 1; x < width - 1; x++, i++) {
			nextPoint[i] = (nextPoint[i] + nextPoint[i + 1] + nextPoint[i - 1] + nextPoint[i - width] + nextPoint[i + width]) / 5;
		}
	}
	//渲染除了第一行、最后一行、第一列、最后一列外的所有点
	for (var i = width + 1; i < size - width - 1; i += 2) {
		for (var x = 1; x < width - 1; x++, i++) {
			//水波振幅线性公式参考的是网络上的一些研究文献得出的
			prePoint[i] = (nextPoint[i - 1] + nextPoint[i + 1] + nextPoint[i + width] + nextPoint[i - width])/2 - prePoint[i];
			var ti = i + floor((prePoint[i - 2] - prePoint[i]) * 0.08) + floor((prePoint[i - width] - prePoint[i]) * 0.08) * width;
			ti = ti < 0 ? 0 : ti > size ? size: ti;
			var light = prePoint[i] * 2.0 - prePoint[i - 2] * 0.6;
			light = light < -10 ? -10 : light > 100 ? 100 : light;
			//之所以是i*4是因为canvas获取的data数据每四个值表示一个像素包括分别是红/绿/蓝/透明,要想了解更多关于canvas的请参看我的另一篇blog：http://blog.csdn.net/qingfeilee/article/details/7233683
			data[i * 4] = imgData.data[ti * 4] + light;
			data[i * 4 + 1] = imgData.data[ti * 4 + 1] + light;
			data[i * 4 + 2] = imgData.data[ti * 4 + 2] + light;
			//波能渐渐衰减
			prePoint[i] -= prePoint[i]>>5;
		}
	}
	tempPoint = nextPoint;
	nextPoint = prePoint;
	prePoint = tempPoint;
	context.putImageData(img, 0, 0);
}

function rain(){
	setDropPoint(floor(Math.random()*width), floor(Math.random()*height), floor(Math.random()*weight));
}
function setWeight(weight){
	this.weight = weight;
}