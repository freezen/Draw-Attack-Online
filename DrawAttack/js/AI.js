function AI()
{
	this.playerId=parseInt(Math.random()*1000);
	this.speed=parseInt(Math.random()*10+5);
	this.attack=15;
	this.hp=500;
	this.birth_x=parseInt(Math.random()*10*(1080-300+1)+300); 
	this.birth_y=parseInt(Math.random()*10*(599-300+1)+300); 
	this.curr_hp=500;
	this.pic_ai=document.getElementById("ai_tank");
	this.pic_ai_shadow=document.getElementById("pic_ai_shadow");
	this.screen_x=1280;
	this.screen_y=699;
	this.x=1280;
	this.y=699;
	this.length_x=100;
	this.length_y=100;
	this.score=0;
	this.angle=0;
	this.alive=1;
	this.delay=3;
	this.lastBullet=-1;
	this.pe = new cParticleEmitter();
	this.h=0;
	this.gua = new cParticleEmitter();
	this.danger=0;
	this.tankHit=0;
	this.will_x=0;
	this.will_y=0;
	this.pause=0;//判断之前是否暂停过，是的话，延迟启动，防止抖动
}

AI.prototype.draw = function()
{

	if(this.alive==1){
	
		if((this.birth_x>(player.birth_x-this.screen_x/2))&&(this.birth_x<(player.birth_x+this.screen_x/2))&&(this.birth_y<(player.birth_y+this.screen_y/2))&&(this.birth_y<(player.birth_y+this.screen_y/2))){
			g.save();
			
			g.translate(this.screen_x/2-(player.birth_x-this.birth_x),this.screen_y/2-(player.birth_y-this.birth_y));
			if((  Math.abs( ((1/(Math.PI*2)) * this.angle) %(Math.PI*2) )<=(Math.PI/2))||(Math.abs( ((1/(Math.PI*2)) * this.angle) %(Math.PI*2) )>=(Math.PI*1.5))){
				g.fillStyle="#7A378B";
				g.fillRect(-this.length_x/2+8, -this.length_y/2-2,this.hp/5+4,9);
				g.fillStyle="black";
				g.fillRect(-this.length_x/2+10, -this.length_y/2,this.hp/5,5);
				g.fillStyle="red";
				g.fillRect(-this.length_x/2+10, -this.length_y/2,this.curr_hp/5,5);
				g.fillStyle="black";
			}
			else {
				g.fillStyle="#7A378B";
				g.fillRect(-this.length_x/2+8, -this.length_y/2+this.speed-2,this.hp/5+4,9);
				g.fillStyle="black";
				g.fillRect(-this.length_x/2+10, -this.length_y/2+this.speed,this.hp/5,5);
				g.fillStyle="red";
				g.fillRect(-this.length_x/2+10, -this.length_y/2+this.speed,this.curr_hp/5,5);
				g.fillStyle="black";
			}
			
			g.rotate(this.angle );
			//绘制阴影
			g.drawImage(this.pic_ai_shadow, -this.length_x/2+10*Math.sin((1/(Math.PI*2)) * this.angle), -this.length_y/2+10*Math.cos((1/(Math.PI*2)) * this.angle) , this.length_x, this.length_y) ;
			
			g.drawImage(this.pic_ai, -this.length_x/2, -this.length_y/2 , this.length_x, this.length_y) ;
			
			g.restore();
		}
		
	}
	else{
		if((this.birth_x>(player.birth_x-this.screen_x/2))&&(this.birth_x<(player.birth_x+this.screen_x/2))&&(this.birth_y<(player.birth_y+this.screen_y/2))&&(this.birth_y<(player.birth_y+this.screen_y/2))){
			g.save();
			g.translate(this.screen_x/2-(player.birth_x-this.birth_x),this.screen_y/2-(player.birth_y-this.birth_y));
			g.rotate(  this.angle );
			//绘制阴影
			g.drawImage(this.pic_ai_shadow, -this.length_x/2+10*Math.sin((1/(Math.PI*2)) * this.angle), -this.length_y/2+10*Math.cos((1/(Math.PI*2)) * this.angle) , this.length_x, this.length_y) ;
			
			g.drawImage(this.pic_ai, -this.length_x/2, -this.length_y/2 , this.length_x, this.length_y) ;
			
			g.restore();
			
			this.gua.size=40;
			this.gua.sharpnessRandom=1;
			this.gua.gravity = Vector.create( 0.2, 0.1 );
			this.gua.position.x = this.birth_x-(player.birth_x-player.screen_x/2)-35;
			this.gua.position.y = this.birth_y-(player.birth_y-player.screen_y/2)-40;
			
			this.gua.sizeRandom =15;
			this.gua.speed =5;
			this.gua.lifeSpan =9;
			this.gua.angleRandom =300;
			
			
			this.gua.update(1);
			this.gua.renderParticles( g );
		}
	}
	
};

AI.prototype.checkDanger = function()
{
	this.danger=0;
	for(var i=0;i<bullets.length;i++){
		if((this.alive==1)&&(Math.sqrt( Math.abs(this.birth_x-bullets[i].birth_x)*Math.abs(this.birth_x-bullets[i].birth_x)+Math.abs(this.birth_y-bullets[i].birth_y)*Math.abs(this.birth_y-bullets[i].birth_y) )<(120) )){
			this.danger=1;
			break;
		}
	}
	
}

AI.prototype.checkTankHit = function()
{
	if(this.tankHit==0){
		this.will_x=this.birth_x+this.speed*(Math.sin( this.angle));
		this.will_y=this.birth_y-this.speed*(Math.cos( this.angle));
		
		for(var i=0;i<ai.length;i++){
			if((this.alive==1)&&(this.playerId!=ai[i].playerId)&&(Math.sqrt( Math.abs(this.will_x-ai[i].birth_x)*Math.abs(this.will_x-ai[i].birth_x)+Math.abs(this.will_y-ai[i].birth_y)*Math.abs(this.will_y-ai[i].birth_y) )<(150) )){
				this.tankHit=1;
				break;
			}
		}
		if((this.alive==1)&&(Math.sqrt( Math.abs(this.will_x-player.birth_x)*Math.abs(this.will_x-player.birth_x)+Math.abs(this.will_y-player.birth_y)*Math.abs(this.will_y-player.birth_y) )<(150) )){
			this.tankHit=1;
		}
	}
}

AI.prototype.checkHit = function()
{
	//check if hurt
	for(var i = 0; i < bullets.length;i ++)
	{
		var ex = bullets[i].birth_x; 
		var ey = bullets[i].birth_y;
		var attack=bullets[i].attack;
		var center_x=this.birth_x;
		var center_y=this.birth_y;
		
		if((gameStart==1)&&(this.alive==1)&&( Math.sqrt( Math.abs(center_x-ex)*Math.abs(center_x-ex)+Math.abs(center_y-ey)*Math.abs(center_y-ey) )<(this.length_x/2) ))
		{	
			//if((this.kind==2)&&(this.superState==1)){
			//}
			//else{
			this.curr_hp-=attack;
			bullets[i].isDie=true;
			this.h=1;
			m_fireHit.play();
			//zhen();
			//}
		}
	}
	//END
};

AI.prototype.update=function()
{
	this.checkHit();
	
	
	if(this.alive!=0){
		this.checkDanger();
		this.checkTankHit();
		if(this.curr_hp<=0){
			this.alive=0;
			
			death_num++;
			if((music_i-1)<4){
				music_i+=1;
				m_die[music_i-1].play();
			}
			else{
				m_die[4].play();
			}
		}
		else if(this.danger==1){
			this.angle=((this.angle+(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2));//.toFixed(1);
			this.angle=Math.round(this.angle*1000)/1000;
			this.birth_x=this.birth_x-this.speed*(Math.sin( this.angle));
			this.birth_y=this.birth_y+this.speed*(Math.cos( this.angle));
		}
		else if(this.tankHit==1){
			this.birth_x=this.birth_x-this.speed*(Math.sin( this.angle));
			this.birth_y=this.birth_y+this.speed*(Math.cos( this.angle));
			if(Math.sqrt( Math.abs(this.will_x-this.birth_x)*Math.abs(this.will_x-this.birth_x)+Math.abs(this.will_y-this.birth_y)*Math.abs(this.will_y-this.birth_y) )>(300)){
				this.tankHit=0;
			}
		}
		else{
			if((player.birth_x>this.birth_x)&&(player.birth_y<this.birth_y)){
			
				var a=player.birth_x-this.birth_x;
				var b=this.birth_y-player.birth_y;
				var r=Math.sqrt(a*a+b*b);
				var angle=Math.asin(a/r);
				angle=Math.round(angle*1000)/1000;

				if(this.angle<(angle-0.02)){
					this.angle=((this.angle+(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2));//.toFixed(1);
					this.angle=Math.round(this.angle*1000)/1000;
				}
				else if((this.angle>(angle+0.02))&&(this.angle<(angle+Math.PI-0.02))){
				
					this.angle=((this.angle-(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2));//.toFixed(1);
					this.angle=Math.round(this.angle*1000)/1000;
				}
				else if(this.angle>(angle+Math.PI+0.02)){
				
					this.angle=((this.angle+(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2));//.toFixed(1);
					this.angle=Math.round(this.angle*1000)/1000;
				}
				if(r>200){
					if(this.pause==1){
						if(r>400){
							this.birth_x=this.birth_x+this.speed*(Math.sin( this.angle));
							this.birth_y=this.birth_y-this.speed*(Math.cos( this.angle));
							this.pause=0;
						}
					}
					else{
						this.birth_x=this.birth_x+this.speed*(Math.sin( this.angle));
						this.birth_y=this.birth_y-this.speed*(Math.cos( this.angle));
					}
				}
				else {
					this.pause=1;
				}	
			}
			else if((player.birth_x>this.birth_x)&&(player.birth_y>this.birth_y)){
				var a=player.birth_x-this.birth_x;
				var b=player.birth_y-this.birth_y;
				var r=Math.sqrt(a*a+b*b);
				var angle=Math.asin(b/r)+Math.PI/2;
				angle=Math.round(angle*1000)/1000;
				
				if(this.angle<(angle-0.02)){
					
					this.angle=(this.angle+(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2);
					this.angle=Math.round(this.angle*1000)/1000;
				}
				else if((this.angle>(angle+0.02))&&(this.angle<(angle+Math.PI-0.02))){
					
					this.angle=(this.angle-(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2);
					this.angle=Math.round(this.angle*1000)/1000;
				}
				else if(this.angle>(angle+Math.PI+0.02)){
					
					this.angle=(this.angle+(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2);
					this.angle=Math.round(this.angle*1000)/1000;
				}
				if(r>200){
					if(this.pause==1){
						if(r>400){
							this.birth_x=this.birth_x+this.speed*(Math.sin( this.angle));
							this.birth_y=this.birth_y-this.speed*(Math.cos( this.angle));
							this.pause=0;
						}
					}
					else{
						this.birth_x=this.birth_x+this.speed*(Math.sin( this.angle));
						this.birth_y=this.birth_y-this.speed*(Math.cos( this.angle));
					}
				}
				else {
					this.pause=1;
				}	
			}
			else if((player.birth_x<this.birth_x)&&(player.birth_y<this.birth_y)){
				var a=this.birth_x-player.birth_x;
				var b=this.birth_y-player.birth_y;
				var r=Math.sqrt(a*a+b*b);
				var angle=Math.asin(b/r)+(Math.PI/2)*3;
				angle=Math.round(angle*1000)/1000;
				
				if((this.angle<(angle-0.02))&&(this.angle>(angle-Math.PI+0.02))){
				
					this.angle=(this.angle+(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2);
					this.angle=Math.round(this.angle*1000)/1000;
				}
				else if(this.angle>(angle+0.02)){
					
					this.angle=(this.angle-(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2);
					this.angle=Math.round(this.angle*1000)/1000;
				}
				else if(this.angle<(angle-Math.PI-0.02)){
					
					this.angle=(this.angle-(this.speed/30)*(1/(Math.PI*2))+Math.PI*2)%(Math.PI*2);
					this.angle=Math.round(this.angle*1000)/1000;
				}
				if(r>200){
					if(this.pause==1){
						if(r>400){
							this.birth_x=this.birth_x+this.speed*(Math.sin( this.angle));
							this.birth_y=this.birth_y-this.speed*(Math.cos( this.angle));
							this.pause=0;
						}
					}
					else{
						this.birth_x=this.birth_x+this.speed*(Math.sin( this.angle));
						this.birth_y=this.birth_y-this.speed*(Math.cos( this.angle));
					}
				}
				else {
					this.pause=1;
				}
			}
			else if((player.birth_x<this.birth_x)&&(player.birth_y>this.birth_y)){
				var a=this.birth_x-player.birth_x;
				var b=player.birth_y-this.birth_y;
				var r=Math.sqrt(a*a+b*b);
				var angle=Math.asin(a/r)+Math.PI;
				angle=Math.round(angle*1000)/1000;
				
				if((this.angle<(angle-0.02))&&(this.angle>(angle-Math.PI+0.02))){
					
					this.angle=(this.angle+(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2);
					this.angle=Math.round(this.angle*1000)/1000;
				}
				else if(this.angle>(angle+0.02)){
					
					this.angle=(this.angle-(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2);
					this.angle=Math.round(this.angle*1000)/1000;
				}
				else if(this.angle<(angle-Math.PI-0.02)){
			
					this.angle=(this.angle-(this.speed/30)*(1/(Math.PI*2))+Math.PI*2)%(Math.PI*2);
					this.angle=Math.round(this.angle*1000)/1000;
				}
				if(r>200){
					if(this.pause==1){
						if(r>400){
							this.birth_x=this.birth_x+this.speed*(Math.sin( this.angle));
							this.birth_y=this.birth_y-this.speed*(Math.cos( this.angle));
							this.pause=0;
						}
					}
					else{
						this.birth_x=this.birth_x+this.speed*(Math.sin( this.angle));
						this.birth_y=this.birth_y-this.speed*(Math.cos( this.angle));
					}
				}
				else {
					this.pause=1;
				}
			}
		}
		if(r<800){
			if((this.lastBullet==-1)||((time-this.lastBullet)>(this.delay*30))){
				this.lastBullet=time;
				this.addBullet1();
			}
		}
		this.addBoom();
	}
};

AI.prototype.addBoom=function()
{
	if(this.h==1){
		g.save();			
		g.translate(this.screen_x/2-(player.birth_x-this.birth_x),this.screen_y/2-(player.birth_y-this.birth_y));
		this.positionRandom = Vector.create( 300, 300 );
		this.pe.size=120;
		this.pe.angleRandom=60;
		this.pe.position.x = -this.length_x/2;
		this.pe.position.y = -this.length_y/2;
		this.pe.update(1);
		this.pe.renderParticles( g );
		g.restore();
		if(time%100==0){
			this.h=0;
		}
	}
};


AI.prototype.addBullet1=function()
{
	var bullet = new Bullet2(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle,this.attack,this.playerId,(enemy_bullets.length));
	enemy_bullets.push(bullet);
};


function Bullet2(x,y,a,attack,playerId,num_i)
{
	this.birth_x = x;//出生位置 x
	this.birth_y = y;//出生位置 y
	this.speed = 12;
	this.angle=a;
	this.isDie = false;
	this.attack=attack;
	this.playerId=playerId;
	this.num_i=num_i;
}
Bullet2.prototype.draw = function()
{
	
	if (!this.isDie)
	{
		//设定子弹效果：index=3
		 
		//绘制粒子效果实例化
		
		g.drawImage(bullet1_enemy, (this.birth_x-(player.birth_x-player.screen_x/2)),(this.birth_y-(player.birth_y-player.screen_y/2)));
		//this.pe.position.y = this.birth_y-(player.birth_y-player.screen_y/2);
			
		
	}
	else{
		
	}
};
Bullet2.prototype.update = function()
{
	if (!this.isDie)
	{
		this.ckeckCrashScenery();
		//this.ckeckCrashEnemy();
		this.birth_x=this.birth_x+(this.speed)*(Math.sin( this.angle));
		this.birth_y=this.birth_y-(this.speed)*(Math.cos( this.angle));
		if ((this.birth_x>player.x)||(this.birth_x<0)||(this.birth_y>player.y)||(this.birth_y<0))
		{
			this.isDie=true;
		}
	}
};
Bullet2.prototype.ckeckCrashScenery=function(){//布景的碰撞判断
	for(var i=0;i<scenerys.length;i++){
		if(scenerys[i].ifIn==1){
			if((this.birth_x>scenerys[i].scen_birth_x)&&(this.birth_x<(scenerys[i].scen_birth_x+scenerys[i].scen_length_x))&&(this.birth_y>scenerys[i].scen_birth_y)&&(this.birth_y<(scenerys[i].scen_birth_y+scenerys[i].scen_length_y))){
				this.isDie=true;
			}	
		}
	}
};

Bullet2.prototype.ckeckCrashEnemy=function(){//布景的碰撞判断
	
	for(var i=0;i<enemys.length;i++){
		
		if((gameStart==1)&&(enemys[i].alive==1)&&( Math.sqrt( Math.abs(enemys[i].birth_x-this.birth_x)*Math.abs(enemys[i].birth_x-this.birth_x)+Math.abs(enemys[i].birth_y-this.birth_y)*Math.abs(enemys[i].birth_y-this.birth_y) )<(enemys[i].length_x/2) ))
		{
			this.isDie=true;
		}	
		
	}
}
	

