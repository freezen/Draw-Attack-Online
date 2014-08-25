function Paint(canvas) {
	this.canvas = canvas;
	this.context = null;
	this.color = "#121212";
	this.down_x;
	this.down_y;
	this.up_x;
	this.up_y;

	this.up_x_reset=-1;
	this.up_y_reset=-1;
	this.down_x_reset=-1;
	this.down_y_reset=-1;
	
	this.r=-1;
	this.down_x_before=-1;
	this.down_y_before=-1;
}

Paint.prototype = {

	initCanvas: function() {
		this.context = this.canvas.getContext('2d');
		// 清空context
		//this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	initForDrawingFreeLine: function() {

		var paint = this;

		this.context.lineWidth = 3;
		this.context.lineCap = 'round';

		this.canvas.addEventListener('mousedown', function(e) {
			paint.isMouseDown = true;
			if(pen==3){//free line
				paint.iLastX = e.clientX - paint.canvas.offsetLeft + (window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft);
				paint.iLastY = e.clientY - paint.canvas.offsetTop + (window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop);
			}
			else if (pen==0)//rect
			{
				paint.down_x=getPX(e)-paint.canvas.offsetLeft;
				paint.down_y=getPY(e)-paint.canvas.offsetTop;
				var data2 = paint.context.getImageData(0, 0, drawArea_x, drawArea_y);
				var index;

				
				for(var x=0; x<dataArea1.width; x++) {
					for(var y=0; y<dataArea1.height; y++) {
					
						index = (y*dataArea1.width+x)*4;  //calculate index
						
						dataArea1.data[index] = data2.data[index];
						dataArea1.data[index+1]=data2.data[index+1];
						dataArea1.data[index+2] =data2.data[index+2];
						dataArea1.data[index+3] = data2.data[index+3];
					}
				}
				paint5.context.putImageData(dataArea1,0,0);
			}
			else if (pen==1)//circle
			{	
				paint.down_x=getPX(e)-paint.canvas.offsetLeft;
				paint.down_y=getPY(e)-paint.canvas.offsetTop;
				
				var data2 = paint.context.getImageData(0, 0, drawArea_x, drawArea_y);
				var index;

				
				for(var x=0; x<dataArea1.width; x++) {
					for(var y=0; y<dataArea1.height; y++) {
					
						index = (y*dataArea1.width+x)*4;  //calculate index
						
						dataArea1.data[index] = data2.data[index];
						dataArea1.data[index+1]=data2.data[index+1];
						dataArea1.data[index+2] =data2.data[index+2];
						dataArea1.data[index+3] = data2.data[index+3];
						

					}
				}
				paint5.context.putImageData(dataArea1,0,0);///注意 此处增加传输 图像数据 功能
			}
			else if (pen==2)//doesn't use!
			{
				paint.down_x=getPX(e)-paint.canvas.offsetLeft;
				paint.down_y=getPY(e)-paint.canvas.offsetTop;
			}
			
		});

		this.canvas.addEventListener('mouseup', function(event) {
			paint.isMouseDown = false;
			if(pen==3){
				paint.iLastX = -1;
				paint.iLastY = -1;
			}
			else if (pen==0)
			{
				paint.up_x=getPX(event)-paint.canvas.offsetLeft;
				paint.up_y=getPY(event)-paint.canvas.offsetTop;

				paint.down_x_reset=paint.down_x+drawArea_x/2-((paint.down_x+paint.up_x)/2);
				paint.down_y_reset=paint.down_y;
				paint.up_x_reset=paint.up_x+drawArea_x/2-((paint.down_x+paint.up_x)/2);
				paint.up_y_reset=paint.up_y;
				
				var data1 = circleAll.getImageData(0, 0, drawArea_x, drawArea_y);
				var data2 = paint.context.getImageData(0, 0, drawArea_x, drawArea_y);
				paint4.context.clearRect(0, 0, paint4.canvas.width, paint4.canvas.height);
				paint5.context.clearRect(0, 0, paint5.canvas.width, paint5.canvas.height);
				var index;

				for(var x=0; x<dataArea1.width; x++) {
					for(var y=0; y<dataArea1.height; y++) {
					
						index = (y*dataArea1.width+x)*4;  //calculate index
						
						if(data1.data[index+3]!=0){
							dataArea1.data[index] = data1.data[index]
							dataArea1.data[index+1]=data1.data[index+1]
							dataArea1.data[index+2] =data1.data[index+2]
							dataArea1.data[index+3] = data1.data[index+3]
						}
						else{
							dataArea1.data[index] = data2.data[index]
							dataArea1.data[index+1]=data2.data[index+1]
							dataArea1.data[index+2] =data2.data[index+2]
							dataArea1.data[index+3] = data2.data[index+3]
						}

					}
				}
				paint.context.putImageData(dataArea1,0,0);///注意 此处增加传输 图像数据 功能
			}
			else if (pen==1)
			{	
				paint.up_x=getPX(event)-paint.canvas.offsetLeft;
				paint.up_y=getPY(event)-paint.canvas.offsetTop;

				paint.down_x_reset=paint.down_x+drawArea_x/2-((paint.down_x+paint.up_x)/2);
				paint.down_y_reset=paint.down_y;
				paint.up_x_reset=paint.up_x+drawArea_x/2-((paint.down_x+paint.up_x)/2);
				paint.up_y_reset=paint.up_y;
				
				var data1 = circleAll.getImageData(0, 0, drawArea_x, drawArea_y);
				var data2 = paint.context.getImageData(0, 0, drawArea_x, drawArea_y);
				paint4.context.clearRect(0, 0, paint4.canvas.width, paint4.canvas.height);
				paint5.context.clearRect(0, 0, paint5.canvas.width, paint5.canvas.height);
				var index;

				
				for(var x=0; x<dataArea1.width; x++) {
					for(var y=0; y<dataArea1.height; y++) {
					
						index = (y*dataArea1.width+x)*4;  //calculate index
						
						if(data1.data[index+3]!=0){
							dataArea1.data[index] = data1.data[index]
							dataArea1.data[index+1]=data1.data[index+1]
							dataArea1.data[index+2] =data1.data[index+2]
							dataArea1.data[index+3] = data1.data[index+3]
						}
						else{
							dataArea1.data[index] = data2.data[index]
							dataArea1.data[index+1]=data2.data[index+1]
							dataArea1.data[index+2] =data2.data[index+2]
							dataArea1.data[index+3] = data2.data[index+3]
						}

					}
				}
				paint.context.putImageData(dataArea1,0,0);///注意 此处增加传输 图像数据 功能
			}
			else if (pen==2)
			{
				paint.up_x=getPX(event)-paint.canvas.offsetLeft;
				paint.up_y=getPY(event)-paint.canvas.offsetTop;

				paint.context.beginPath();
				paint.context.strokeStyle =paint.color;
				paint.context.moveTo(paint.down_x,paint.down_y);
				paint.context.lineTo(paint.up_x,paint.up_y);
				paint.context.closePath();
				paint.context.stroke();
			}
			deduceInk_main();
		});

		this.canvas.addEventListener('mousemove', function(event) {
			if(pen==3){
				if (paint.isMouseDown) {
					var iX = event.clientX - paint.canvas.offsetLeft + (window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft);
					var iY = event.clientY - paint.canvas.offsetTop + (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop);
					paint.context.beginPath();
					paint.context.moveTo(paint.iLastX, paint.iLastY);
					paint.context.lineTo(iX, iY);
					paint.context.stroke();
					paint.iLastX = iX;
					paint.iLastY = iY;
				}
			}
			else if (pen==0)//方块
			{
				if (paint.isMouseDown) {
					if((paint.down_x_before==paint.down_x)||(paint.down_y_before==paint.down_y)){
						if ((paint.up_x_reset>=paint.down_x_reset)&&(paint.up_y_reset>=paint.down_y_reset))
						{
							paint4.context.clearRect(paint.down_x_reset-1,paint.down_y_reset,paint.up_x_reset-paint.down_x_reset+2,paint.up_y_reset-paint.down_y_reset);
						}
						else if((paint.up_x_reset<paint.down_x_reset)&&(paint.up_y_reset>=paint.down_y_reset)){
							paint4.context.clearRect(paint.up_x_reset-1,paint.down_y_reset,paint.down_x_reset-paint.up_x_reset+2,paint.up_y_reset-paint.down_y_reset);
						}
						else if((paint.up_x_reset>=paint.down_x_reset)&&(paint.up_y_reset<paint.down_y_reset)){
							paint4.context.clearRect(paint.down_x_reset-1,paint.up_y_reset,paint.up_x_reset-paint.down_x_reset+2,paint.down_y_reset-paint.up_y_reset);
						}
						else if((paint.up_x_reset<paint.down_x_reset)&&(paint.up_y_reset<paint.down_y_reset)){
							paint4.context.clearRect(paint.up_x_reset-1,paint.up_y_reset,paint.down_x_reset-paint.up_x_reset+2,paint.down_y_reset-paint.up_y_reset);
						}
					}
					

					paint.up_x=getPX(event)-paint.canvas.offsetLeft;
					paint.up_y=getPY(event)-paint.canvas.offsetTop;

					
					paint.down_x_reset=paint.down_x+drawArea_x/2-((paint.down_x+paint.up_x)/2);
					paint.down_y_reset=paint.down_y;
					paint.up_x_reset=paint.up_x+drawArea_x/2-((paint.down_x+paint.up_x)/2);
					paint.up_y_reset=paint.up_y;
					
					paint.down_x_before=paint.down_x;
					paint.down_y_before=paint.down_y;
					
					paint4.context.fillStyle="#000000";
					
					
					if ((paint.up_x>=paint.down_x)&&(paint.up_y>=paint.down_y))
					{
						paint4.context.fillRect(paint.down_x_reset,paint.down_y_reset,(paint.up_x-paint.down_x),(paint.up_y-paint.down_y));
					}
					else {
					}
					
					
					
					if(pen_col==0){
						
						paint4.context.drawImage(red_col,0,0,(paint.up_x-paint.down_x)-6,(paint.up_y-paint.down_y)-6,paint.down_x_reset+3,paint.down_y_reset+3,(paint.up_x-paint.down_x)-6,(paint.up_y-paint.down_y)-6);
						
					}
					else if(pen_col==1){
						paint4.context.drawImage(black_col,0,0,(paint.up_x-paint.down_x)-6,(paint.up_y-paint.down_y)-6,paint.down_x_reset+3,paint.down_y_reset+3,(paint.up_x-paint.down_x)-6,(paint.up_y-paint.down_y)-6);
					}
					else if(pen_col==2){
						paint4.context.drawImage(blue_col,0,0,(paint.up_x-paint.down_x)-6,(paint.up_y-paint.down_y)-6,paint.down_x_reset+3,paint.down_y_reset+3,(paint.up_x-paint.down_x)-6,(paint.up_y-paint.down_y)-6);
					}
					else if(pen_col==3){
						paint4.context.drawImage(yellow_col,0,0,(paint.up_x-paint.down_x)-6,(paint.up_y-paint.down_y)-6,paint.down_x_reset+3,paint.down_y_reset+3,(paint.up_x-paint.down_x)-6,(paint.up_y-paint.down_y)-6);
					}
					else if(pen_col==4){
						paint4.context.drawImage(green_col,0,0,(paint.up_x-paint.down_x)-6,(paint.up_y-paint.down_y)-6,paint.down_x_reset+3,paint.down_y_reset+3,(paint.up_x-paint.down_x)-6,(paint.up_y-paint.down_y)-6);
					}
					//paint4.context.fillRect(paint.down_x_reset,paint.down_y_reset,(paint.up_x-paint.down_x),(paint.up_y-paint.down_y));				
					////sssssss
					
					
					

					
					var data1 = circleAll.getImageData(0, 0, drawArea_x, drawArea_y);
					var data2 = paint5.context.getImageData(0, 0, drawArea_x, drawArea_y);
					var index;

					
					for(var x=0; x<dataArea1.width; x++) {
						for(var y=0; y<dataArea1.height; y++) {
						
							index = (y*dataArea1.width+x)*4;  //calculate index
							
							if(data1.data[index+3]!=0){
								dataArea1.data[index] = data1.data[index]
								dataArea1.data[index+1]=data1.data[index+1]
								dataArea1.data[index+2] =data1.data[index+2]
								dataArea1.data[index+3] = data1.data[index+3]
							}
							else{
								dataArea1.data[index] = data2.data[index]
								dataArea1.data[index+1]=data2.data[index+1]
								dataArea1.data[index+2] =data2.data[index+2]
								dataArea1.data[index+3] = data2.data[index+3]
							}

						}
					}
					paint.context.putImageData(dataArea1,0,0);///注意 此处增加传输 图像数据 功能
					
					
				}

			}
			else if (pen==1)//圆
			{
				if (paint.isMouseDown) {
					paint4.context.clearRect(0, 0, paint4.canvas.width, paint4.canvas.height);
					
					if((paint.down_x_before==paint.down_x)||(paint.down_y_before==paint.down_y)){
						paint4.context.clearRect(paint.down_x_reset-paint.r,paint.down_y_reset,paint.r*2+paint.r,paint.r*2);
					}
								
					paint.up_x=getPX(event)-paint.canvas.offsetLeft;
					paint.up_y=getPY(event)-paint.canvas.offsetTop;

					paint.down_x_reset=paint.down_x+drawArea_x/2-((paint.down_x+paint.up_x)/2);
					paint.down_y_reset=paint.down_y;
					paint.up_x_reset=paint.up_x+drawArea_x/2-((paint.down_x+paint.up_x)/2);
					paint.up_y_reset=paint.up_y;

					paint.r=(paint.up_y-paint.down_y)/2;
					paint.down_x_before=paint.down_x;
					paint.down_y_before=paint.down_y;
					
					paint4.context.beginPath();
					paint4.context.fillStyle=paint.color;	
					var sasa=(paint.up_x_reset-paint.down_x_reset)/2+paint.down_x_reset;
					
					paint4.context.arc((paint.up_x_reset-paint.down_x_reset)/2+paint.down_x_reset, (paint.up_y_reset-paint.down_y_reset)/2+paint.down_y_reset, (paint.up_y-paint.down_y)/2, 0*Math.PI,  2*Math.PI, false);
					paint4.context.closePath();
					paint4.context.fill();
					
					paint4.context.beginPath();
					paint4.context.closePath();
					paint4.context.fill();
					
					var data1 = circleAll.getImageData(0, 0, drawArea_x, drawArea_y);
					var data2 = paint5.context.getImageData(0, 0, drawArea_x, drawArea_y);
					var index;

					
					for(var x=0; x<dataArea1.width; x++) {
						for(var y=0; y<dataArea1.height; y++) {
						
							index = (y*dataArea1.width+x)*4;  //calculate index
							
							if(data1.data[index+3]!=0){
								dataArea1.data[index] = data1.data[index]
								dataArea1.data[index+1]=data1.data[index+1]
								dataArea1.data[index+2] =data1.data[index+2]
								dataArea1.data[index+3] = data1.data[index+3]
							}
							else{
								dataArea1.data[index] = data2.data[index]
								dataArea1.data[index+1]=data2.data[index+1]
								dataArea1.data[index+2] =data2.data[index+2]
								dataArea1.data[index+3] = data2.data[index+3]
							}

						}
					}
					paint.context.putImageData(dataArea1,0,0);
					
				}
			}
			else if (pen==2)//直线
			{
				if (paint.isMouseDown) {

					//日系 扇子风
					
					paint.up_x=getPX(event)-paint.canvas.offsetLeft;
					paint.up_y=getPY(event)-paint.canvas.offsetTop;

					paint.context.beginPath();
					paint.context.strokeStyle =paint.color;
					paint.context.moveTo(paint.down_x,paint.down_y);
					paint.context.lineTo(paint.up_x,paint.up_y);
					paint.context.closePath();
					paint.context.stroke();
				}
			}
			deduceInk_main();
		});
	},

	changeDrawColor: function(color) {
		this.context.strokeStyle = color;
		this.color=color;
		this.context.fillStyle=color;
	},

	changeDrawWidth: function(width) {
		this.context.lineWidth = width;
	},

	myClear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.up_x=-1;
		this.up_y=-1;
		this.down_x=-1;
		this.down_y=-1;
	},


};


function getPX(e){
	e=e||window.event;
	var x=e.pageX||(e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft));
	return x;
}
//获取鼠标位置Y坐标
function getPY(e){
	e=e||window.event;
	var y=e.pageY||(e.clientY+(document.documentElement.scrollTop||document.body.scrollTop));
	return y;
}