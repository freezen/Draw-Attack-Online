var ground = 
{
	x:1280,//屏幕大小
	y:699,
	whole_x:9000,//图片实际大小
	whole_y:5000,
	x_groundmove:200,//设置触发x边界(左右边界)移动的初始值
	y_groundmove:70,//设置触发y边界(上下边界)移动的初始值
	
	//以下所有方法均使用if else 方法 按不同地图 不同绘制背景  布景 和 胜利检测
	draw:function(kind,px,py)//kind:0单挑，1竞速，2团P;   px,py：坦克位置 ;  此方法画地图背景和小地图
	{
		var i,j;
		
		if(kind==0){
		    
			
		}
		else if(kind==1){
		
			g.drawImage(back2,px-(this.x/2),py-(this.y/2),this.x,this.y,0,0,this.x,this.y);
			//绘制小地图上 敌人 和 自己的位置
			mini_g.drawImage(back2,0,0,300,160);
			mini_g.fillStyle="black";
			mini_g.fillRect((player.birth_x)*(300/this.whole_x),(player.birth_y)*(160/this.whole_y),7,7);
			mini_g.fillStyle="red";
			for(var i=0;i<enemys.length;i++){
				mini_g.fillRect((enemys[i].birth_x)*(300/this.whole_x),(enemys[i].birth_y)*(160/this.whole_y),7,7);
			}
			for(var j=0;j<ai.length;j++){
				mini_g.fillRect((ai[j].birth_x)*(300/this.whole_x),(ai[j].birth_y)*(160/this.whole_y),7,7);
			}
		}
		else if(kind==2){
		}

	},
	sceneryInit:function(kind){
		if(kind==0){
			
		}
		else if(kind==1){
			//布景初始化
			//scenerys[0]=new Scenery("noHurt",3640,4300,110,110);
			//scenerys[1]=new Scenery("tree",3240,3200,194,188);
		}
		else if(kind==2){
			
		}
	},
	ifWin:function(){
		if(kind==0){
			
		}
		else if(kind==1){
			if((death_num>=1)&&(player.curr_hp>0)){
				var load=document.getElementById('redVsBlue');
				load.style.background="url(./img/win.png)";
				load.style.display="block";
			}
		}
		else if(kind==2){
			
		}
		
	}
}



