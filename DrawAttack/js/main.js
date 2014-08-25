//引入游戏，画面初始化
function main(){
	//initRain();
    init();
}

//主调方法
function init(){
	if(AI_on==1){
		for(var j=0;j<3;j++){
			ai[j]=new AI();
		}
		objs = [enemys,bullets,enemy_bullets,ai];//对象集初始化
		
	}
	else{
		objs = [enemys,bullets,enemy_bullets];
		
	}
	ground.sceneryInit(playerMapNum);//布景初始化
	setInterval("drawAll()", 40 );
	setInterval("updateAll()", 30);
}


function updateAll(){
	time++;
	player.update();
	updateObjs();
	//raining();
	//delEnemy();
	ground.ifWin();
}

function drawAll(){
 	ground.draw(playerMapNum,player.birth_x,player.birth_y);
	drawObjs();//划敌人
	player.draw();//画自己
	sceneryDraw();//画布景
}

function sceneryDraw(){
	for(var i=0;i<scenerys.length;i++){
		scenerys[i].drawSceneryItem();
	}
	
}

function updateObjs() {
    var i, j, obj;
    for (i = 0; i < objs.length; i++) 
	{
        obj = objs[i]; 
		for (j = 0; j < obj.length; j++)
		{
			obj[j].update();
			if (obj[j].isDie) 
			{
				obj[j] = null;
				obj.splice(j, 1);
				j--;
			}
		}
      
    }
	
}

function delEnemy(){
	var i;
	for(i=0;i<enemys.length;i++){
		if (!(enemys[i].alive))
		{
			enemys.splice(i,1);
		}
	}
}

function drawObjs() 
{
    var i, j, obj;
    for (i = 0; i < objs.length; i++) 
	{
        obj = objs[i]; 
		for (j = 0; j < obj.length; j++) 
		{
			
			obj[j].draw();
		}
        
    }
}
/*
function raining(){
	var t=rain_place.length; 
	var i=0;
	while(i<t){
		if((trag_rain==0)&&(gameStart==1)&&(player.alive==1)&&( Math.sqrt( Math.abs(player.birth_x-rain_place[i])*Math.abs(player.birth_x-rain_place[i])+Math.abs(player.birth_y-rain_place[i])*Math.abs(player.birth_y-rain_place[i]) )<(1500) ))
		{	
			canvas_weather.style.display="block";
			m_init.pause();
			m_rain.play();//播放raining音乐
			startRain();
			trag_rain=1;
		}
		if((trag_rain==1)&&(gameStart==1)&&(player.alive==1)&&( Math.sqrt( Math.abs(player.birth_x-rain_place[i])*Math.abs(player.birth_x-rain_place[i])+Math.abs(player.birth_y-rain_place[i])*Math.abs(player.birth_y-rain_place[i]) )>=(1500) ))
		{
			canvas_weather.style.display="none";
			m_rain.pause();
			m_init.play();//播放背景音乐
			pauseRain();
			trag_rain=0;
		}
		i++;
	}
}*/
function zhen(){
	clearInterval(zhen_my);
	zhen_my=setInterval("zhen_Help()",80);
}

function zhen_Help(){
	if(zhen_trigg==0){
		myCanvas.style.left="-5px";
		zhen_trigg=1;
	}
	else {
		myCanvas.style.left="5px";
		zhen_trigg=0;
	}
	zhen_time++;
	if (zhen_time>=8)
	{
		myCanvas.style.left="0px";
		zhen_time=1;
		clearInterval(zhen_my);
	}
}
function e_zhen(){
	e_zhen_my=setInterval("e_zhen_Help()",80);
}
function e_zhen_Help(){
	if(e_zhen_trigg==0){
		myCanvas.style.left="-5px";
		e_zhen_trigg=1;
	}
	else {
		myCanvas.style.left="5px";
		e_zhen_trigg=0;
	}
	e_zhen_time++;
	if (e_zhen_time>=8)
	{
		myCanvas.style.left=0+"px";
		e_zhen_time=1;
		clearInterval(e_zhen_my);
	}
}

function sleepZZ(){
	
	if(player.kind==1){
		player.speed=(player.speed)/3;
		player.superState=0;
	}
	else if(player.kind==2){
		player.superState=0;
	}
	else if(player.kind==3){
		player.superState=0;
	}
	else {
	
		player.superState=0;
	}
	no_key();
	key_function();
	
}

document.onkeydown = function(e){
	
    
	key[e.keyCode] = true;
	e.returnvalue = true;
};

document.onkeyup = function(e){
    
	key[e.keyCode] = false;
	e.returnvalue = true;
};

document.ontouchstart = function(e){
	
};








