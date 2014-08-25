function Enemy(playerId,speed,attack,hp,kind,birth_x,birth_y,angle,canvasNum)
{
	this.playerId=playerId;
	this.speed=speed;
	this.attack=attack;
	this.hp=hp;
	this.birth_x=birth_x;
	this.birth_y=birth_y;
	this.curr_hp=hp;
	this.canvasNum=canvasNum;

	this.screen_x=1280;
	this.screen_y=699;
	this.x=1280;
	this.y=699;
	this.length_x=100;
	this.length_y=100;
	this.score=0;
	this.angle=angle;
	this.alive=1;
	this.delay=1;
	this.lastBullet=-1;
	this.lastSuper=-1;
	this.superState=0;
	this.kind=kind;
	
	this.K_XX=false;
	this.K_ZZ=false;
	this.pe = new cParticleEmitter();
	this.h=0;
	this.gua = new cParticleEmitter();
}

Enemy.prototype.draw = function()
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
			
			g.rotate(  this.angle );
			//绘制阴影
			//g.drawImage(img_playerShadow, this.birth_x-10, this.birth_y+20, this.length_x, this.length_y) ;
			
			//绘制飞机
			//alert(canvas[0]);
			if(this.superState==1){
				if(this.kind==1){
					g.drawImage(speedUp, -this.length_x/2+5, -this.length_y/2-10+60 , 40, 171) ;
				}
				else if(this.kind==2){
					g.drawImage(noHurt, -this.length_x/2-30, -this.length_y/2-10 , 110, 110) ;
				}
				
			}
			//绘制阴影
			g.drawImage(canvas_shadow[this.canvasNum], -this.length_x/2+10*Math.sin((1/(Math.PI*2)) * this.angle), -this.length_y/2+10*Math.cos((1/(Math.PI*2)) * this.angle) , this.length_x, this.length_y) ;
			
			g.drawImage(canvas[this.canvasNum], -this.length_x/2, -this.length_y/2 , this.length_x, this.length_y) ;
			
			g.restore();
		}
		
	}
	else{
		if((this.birth_x>(player.birth_x-this.screen_x/2))&&(this.birth_x<(player.birth_x+this.screen_x/2))&&(this.birth_y<(player.birth_y+this.screen_y/2))&&(this.birth_y<(player.birth_y+this.screen_y/2))){
			g.save();
			g.translate(this.screen_x/2-(player.birth_x-this.birth_x),this.screen_y/2-(player.birth_y-this.birth_y));
			g.rotate( this.angle );
			//绘制阴影
			g.drawImage(canvas_shadow[this.canvasNum], -this.length_x/2+10*Math.sin((1/(Math.PI*2)) * this.angle), -this.length_y/2+10*Math.cos((1/(Math.PI*2)) * this.angle) , this.length_x, this.length_y) ;
			
			g.drawImage(canvas[this.canvasNum], -this.length_x/2, -this.length_y/2 , this.length_x, this.length_y) ;
			
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

Enemy.prototype.addBoom=function()
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
			//this.pe.stopParticleEmitter();
			//this.pe=null;
		}
	}
};




Enemy.prototype.addBullet1=function()
{
	
	if((this.kind==3)&&(this.superState==1)){
		if(this.onFire==1){
			m_fire1.play();
			this.onFire++;
		}
		else if(this.onFire==2){
			m_fire2.play();
			this.onFire++;
		}
		else if(this.onFire==3){
			m_fire3.play();
			this.onFire++;
		}
		else if(this.onFire==4){
			m_fire1.play();
			this.onFire=1;
		}
		var bullet = new Bullet1(this.birth_x-15+(Math.sin((1/(Math.PI*2)) * this.angle))*(this.length_y/2),this.birth_y-(Math.cos((1/(Math.PI*2)) * this.angle))*(this.length_y/2),this.angle,this.attack*1.2,this.playerId,(enemy_bullets.length));
		enemy_bullets.push(bullet);
		var bullet2 = new Bullet1(this.birth_x+(Math.sin((1/(Math.PI*2)) * this.angle))*(this.length_y/2),this.birth_y-(Math.cos((1/(Math.PI*2)) * this.angle))*(this.length_y/2),this.angle,this.attack*1.2,this.playerId,(enemy_bullets.length));
		enemy_bullets.push(bullet2);
		var bullet3 = new Bullet1(this.birth_x+15+(Math.sin((1/(Math.PI*2)) * this.angle))*(this.length_y/2),this.birth_y-(Math.cos((1/(Math.PI*2)) * this.angle))*(this.length_y/2),this.angle,this.attack*1.2,this.playerId,(enemy_bullets.length));
		enemy_bullets.push(bullet3);
	}
	else {
		if(this.onFire==1){
			m_fire1.play();
			this.onFire++;
		}
		else if(this.onFire==2){
			m_fire2.play();
			this.onFire++;
		}
		else if(this.onFire==3){
			m_fire3.play();
			this.onFire++;
		}
		else if(this.onFire==4){
			m_fire1.play();
			this.onFire=1;
		}
		var bullet = new Bullet1(this.birth_x+(Math.sin((1/(Math.PI*2)) * this.angle))*(this.length_y/2),this.birth_y-(Math.cos((1/(Math.PI*2)) * this.angle))*(this.length_y/2),this.angle,this.attack,this.playerId,(enemy_bullets.length));
		enemy_bullets.push(bullet);
	}
};
Enemy.prototype.superZZ=function()
{
	if(this.kind==1){
		this.speed=(this.speed)*3;
		this.superState=1;
		
	}
	else if(this.kind==2){
		this.superState=1;
		
	}
	else if(this.kind==3){
		
		this.superState=1;
		m_fire4.play();
		this.addBullet1();
	}
	else if(this.kind==0){
		var bullet = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle,(this.attack*2+70),this.playerId,(enemy_bullets.length));
		enemy_bullets.push(bullet);
		var bullet2 = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle+45,(this.attack*2+70),this.playerId,(enemy_bullets.length));
		enemy_bullets.push(bullet2);
		var bullet3 = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle+90,(this.attack*2+70),this.playerId,(enemy_bullets.length));
		enemy_bullets.push(bullet3);
		var bullet4 = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle+135,(this.attack*2+70),this.playerId,(enemy_bullets.length));
		enemy_bullets.push(bullet4);
		var bullet5 = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle+180,(this.attack*2+70),this.playerId,(enemy_bullets.length));
		enemy_bullets.push(bullet5);
		var bullet6 = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle-45,(this.attack*2+70),this.playerId,(enemy_bullets.length));
		enemy_bullets.push(bullet6);
		var bullet7 = new Bullet1(this.birth_x+(Math.sin(this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle-90,(this.attack*2+70),this.playerId,(enemy_bullets.length));
		enemy_bullets.push(bullet7);
		var bullet8 = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle-135,(this.attack*2+70),this.playerId,(enemy_bullets.length));
		enemy_bullets.push(bullet8);
		this.superState=1;
		
	}
};
	
Enemy.prototype.keymove=function()
{
	
	if(this.K_XX){
		if((this.lastBullet==-1)||((time-this.lastBullet)>(this.delay*34))){
			this.addBullet1();
			this.lastBullet=time;
			this.K_XX=false;
		}
		
	}
	/*
	else if(this.K_ZZ){
		if((this.lastSuper==-1)||((time-this.lastSuper)>(this.delay*1000))){
			this.superZZ();
			this.lastSuper=time;
			this.K_ZZ=false;
		}
		
	}
	*/
	else {
		
	}
};

Enemy.prototype.update=function()
{
	if(this.alive!=0){
		if(this.curr_hp<=0){
			this.alive=0;
			music_i+=1;
			if((music_i-1)<4){
				music_i+=1;
				m_die[music_i-1].play();
			}
			else{
				m_die[4].play();
			}
		}
		this.keymove();
	
		this.addBoom();
	}
};