//document.write("<scri"+"pt type='text/javascript' src='./js/json.js'></scr"+"ipt>"); 
var socket;
var intervalScense=null;
var opacityScence=0.8;
var sizeScence=1.2;
var resultS="";
var result;
var playerNumNow=0;
var jSON1=null;
var JSON2= {
				"type":"fire",
				"playerId":"",
				"xx":0,
				"p_x":0,
				"p_y":0,
				"angle":0,
				
				};
var test="";
var my_s="";

function socketInit(type,playerId,my_string,speed,hp,kind,attack,address){
	//var host = "ws://169.254.197.168:8000/websocket";
	var host=address;
	//var host = "ws://localhost:8000/websocket";
	try{
		var browser=navigator.appName;
		if(browser.indexOf("Firefox")>=0){    
			socket = new MozWebSocket(host);
		}
		else if(browser.indexOf("Netscape")>=0){
			socket = new WebSocket(host);
		}
		else {socket = new WebSocket(host);}
		//log('WebSocket - status '+socket.readyState);
		log("开始连接...");
		//socket.onopen    = function(msg){ log("Welcome - status "+this.readyState); };
		socket.onopen = function(msg){ 
			log("连接成功！"); 
			jSON1= "init$"+playerId+"$"+speed.toString()+"$"+hp.toString()+"$"+kind.toString()+"$"+attack.toString()+"$"+my_string+"$"+player.birth_x+"$"+player.birth_y+"$"+player.angle+"}";
			broadcast(jSON1);
		};
		socket.onmessage = function(msg){ 
			my_s=msg.data;
			resultS=resultS+my_s;
			if(resultS.substring(resultS.length-1, resultS.length)=="}"){
				resultS=resultS.substring(0, resultS.length-1);
				result = resultS.split("$");
				resultS="";
				if(result[0].indexOf("init")>=0){
					var haveEnemy=0;//判定是否已经初始化过这个敌人
					for(var i=0;i<enemys.length;i++){
						if(enemys[i].playerId==result[1]){
							haveEnemy=1;//初始化过
							break;
						}
					}
					if((result[1]!=player.playerId)&&(haveEnemy==0)){//没有初始化过，所以这里初始化一下
						var ssss=result[6];
						string[playerNumNow]=ssss.split(",");
						playerNumNow+=1;
						imageBuffer(playerNumNow);
						var enemy=new Enemy(result[1],parseInt(result[2]),parseInt(result[5]),parseInt(result[3]),parseInt(result[4]),parseInt(result[7]),parseInt(result[8]),parseInt(result[9]),(playerNumNow-1)); 
						enemys.push(enemy);
						jSON1= "init$"+playerId+"$"+speed.toString()+"$"+hp.toString()+"$"+kind.toString()+"$"+attack.toString()+"$"+my_string+"$"+player.birth_x+"$"+player.birth_y+"$"+player.angle+"}";
						broadcast(jSON1);
					}
					if(playerNumNow==0){
						
						canvas[1] = document.getElementById('p1');
						canvas[2] = document.getElementById('p2');
						canvas[3] = document.getElementById('p3');
						canvas[4] = document.getElementById('p4');
						canvas[5] = document.getElementById('p5');
						
						p[1] = canvas[1].getContext('2d');
						p[2] = canvas[2].getContext('2d');
						p[3] = canvas[3].getContext('2d');
						p[4] = canvas[4].getContext('2d');
						p[5] = canvas[5].getContext('2d');
						
						canvas_shadow[1] = document.getElementById('s1');
						canvas_shadow[2] = document.getElementById('s2');
						canvas_shadow[3] = document.getElementById('s3');
						canvas_shadow[4] = document.getElementById('s4');
						canvas_shadow[5] = document.getElementById('s5');
						
						p_shadow[1] = canvas_shadow[1].getContext('2d');
						p_shadow[2] = canvas_shadow[2].getContext('2d');
						p_shadow[3] = canvas_shadow[3].getContext('2d');
						p_shadow[4] = canvas_shadow[4].getContext('2d');
						p_shadow[5] = canvas_shadow[5].getContext('2d');
	
						playerNumNow+=1;
						main();//运行核心主调函数
					}
				}
				else if(result[0].indexOf("fire")>=0){
					for(var i=0;i<enemys.length;i++){
						if(result[1]==enemys[i].playerId){
							enemys[i].birth_x=parseInt(result[3]);
							enemys[i].birth_y=parseInt(result[4]);
							enemys[i].angle=parseInt(result[5]);
							if(result[2]=="1"){
								enemys[i].K_XX=true;
							}
							/*
							if(result[2]=="2"){
								enemys[i].K_ZZ=true;
							}
							*/
							if(result[2]=="0"){
								enemys[i].superState=0;
							}
						}
					}
				}
				else if(result[0].indexOf("hurt")>=0){
					for(var i=0;i<enemys.length;i++){
						if(result[1]==enemys[i].playerId){
							//alert("gamews HP:"+parseInt(result[2]));
							enemys[i].curr_hp=parseInt(result[2]);
							enemys[i].h=1;
							//e_zhen();
							m_fireHit.play();
						}
						if(result[3]==player.playerId){
							try{bullets[parseInt(result[4])].isDie=true;}catch(e){alert(parseInt(result[4])+":trouvle:"+e);}
						}
						
					}
				}
				else if(result[0].indexOf("star6")>=0){
					gameStart=1;
					log("Star6!");
				}
				else if(result[0].indexOf("n")>=0){
					var jSON4= "p$"+playerId+"$"+player.birth_x+"$"+player.birth_y+"$"+player.angle+"}";
					broadcast(jSON4);
					log("send new P!");
				}
				else if(result[0].indexOf("p")>=0){
					for(var i=0;i<enemys.length;i++){
						if(enemys[i].playerId==result[1]){
							enemys[i].birth_x=result[2];
							enemys[i].birth_y=result[3];
							enemys[i].angle=result[4];
						}
					}
					log("get Ps!");
				}
			}
			
		};
		socket.onclose   = function(msg){ 
			//log("连接已关闭！"); 
		};
	}
	catch(ex){ 
		//log('初始化错误：'+ex); 
	}
}
function broadcast(msg){
	try
	{
		socket.send(msg);
		//log('广播: ');
	}
	catch(ex)
	{
		//log('广播错误：'+ex);
	}
}
//下面五个函数之所以这样分出来是考虑到在发往服务器之前需要进行一些其它处理...
function setP(p_x,p_y,angle){
	JSON2.p_x=p_x;
	JSON2.p_y=p_y;
	JSON2.angle=angle;
}

function xx_key(){
	JSON2.xx=1;
}
function zz_key(){
	
	JSON2.xx=2;
	
}
function no_key(){
	
	JSON2.xx=0;
	
}
/*
function zz_key(a){
	if(a==2){
		JSON2.xx=2;
	}
	else {
		JSON2.xx=0;
	}
}
*/
function key_function(){
	JSON2.playerId=player.playerId;
	broadcast("fire$"+JSON2.playerId+"$"+(JSON2.xx).toString()+"$"+(JSON2.p_x).toString()+"$"+(JSON2.p_y).toString()+"$"+(JSON2.angle).toString()+"}");
	JSON2.xx=0;
}

function hurt(curr_hp){
	var jSON3= {
				"type":"hurt",
				"playerId":player.playerId,
				"curr_hp":curr_hp,
				};
	broadcast("hurt$"+jSON3.playerId+"$"+(jSON3.curr_hp).toString()+"$"+player.beHurtId+"$"+(player.beHurtNum).toString()+"}");
}

function imageBuffer(playerNumNow){
	var dataArea=d[playerNumNow-1].createImageData(270,270);
	for(var z=playerNumNow-1;z<playerNumNow;z++){
		for(var x=0; x<dataArea.width; x++) {
			for(var y=0; y<dataArea.height; y++) {
				var index = (y*dataArea.width+x)*4;  //calculate index
				
				dataArea.data[index] = (string[z][index]);   // red
				dataArea.data[index+1]=(string[z][index+1]);// green
				dataArea.data[index+2] =(string[z][index+2]);// blue
				dataArea.data[index+3] = (string[z][index+3]); 
				
			}
		}
		p[z].putImageData(dataArea,0,0);
		for(var x=0; x<dataArea.width; x++) {
			for(var y=0; y<dataArea.height; y++) {
				var index = (y*dataArea.width+x)*4;  //calculate index
				if((dataArea.data[index+3] = (string[z][index+3]))!=0){
					dataArea.data[index] = 0;  
					dataArea.data[index+1]=0;
					dataArea.data[index+2] =0;
					dataArea.data[index+3] =100;
				}
				
			}
		}
		p_shadow[z].putImageData(dataArea,0,0);
	}
	
	
}

function throughScense(){
	var scense=document.getElementById('scense');
	var _scense0=scense.getContext("2d");
	_scense0.drawImage(canvas[0], 0, 0 ,270, 270) ;
	intervalScense=setInterval("throughScense0();",60);
}
function throughScense0(){
	var screenBlack=document.getElementById('screenBlack');
	var scense=document.getElementById('scense');
	screenBlack.style.opacity=opacityScence;
	opacityScence-=0.01;
	var _scense0=scense.getContext("2d");
	_scense0.clearRect(0, 0, 270, 270);
	_scense0.drawImage(canvas[0], 0, 0 ,270/sizeScence, 270/sizeScence) ;
	sizeScence+=0.05;
	if(sizeScence>=2.7){
		clearInterval(intervalScense);
		throughScense1();
	}
}
function throughScense1(){
	var screenBlack=document.getElementById('screenBlack');
	var scense=document.getElementById('scense');
	setTimeout("throughScense2();",500);
}
function throughScense2(){
	var screenBlack=document.getElementById('screenBlack');
	var scense=document.getElementById('scense');
	var load=document.getElementById('redVsBlue');
	load.style.display="none";
	screenBlack.style.display="none";
	scense.style.display="none";
}

function clearlog(){
	$("log").innerHTML="";
}

function quit(){
	//log("Goodbye!");
	socket.close();
	socket=null;
	//window.location.href="./index.htm";
}

function $(id){ return document.getElementById(id); }
function log(msg){ test+=msg;$("log").innerHTML=test; }


