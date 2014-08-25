var player = 
{
	playerId:"",
	speed:12,
	attack:100,
	hp:100,
	canvasNum:0,
	
	birth_x:4640,
	birth_y:4300,
	curr_hp:80,
	
	screen_x:1280,
	screen_y:699,
	x:9000,
	y:5000,
	length_x:100,
	length_y:100,
	K_UP:38,
	K_XX:32,
	K_ZZ:90,
	K_DOWN:40,
	K_LEFT:37,
	K_RIGHT:39,
	position:1,//1:前进 ，0：后退
	score:0,
	angle:0,
	playerBomb:"player_bomb",
	alive:1,
	goCircle:1,
	moved:0,
	delay:1,
	lastBullet:-1,
	lastSuper:-1,
	beHurtId:"",
	beHurtNum:-1,
	onFire:1,//当前fire音效
	superState:0,
	kind:-1,
	h:0,//表示当前被hurt
	will_x:new Array(),//预计的移动位置，方便进行是否有障碍物的判断,注意，这里使用矩形的碰撞判断，只判断四个端点即可。
	will_y:new Array(),
	can_move:1,//是否可以移动
	pe : new cParticleEmitter(),

	draw:function()
	{
		
		var img_playerBomb = document.getElementById(this.playerBomb);//get the bomb image object element

		if(this.goCircle==1){//原地旋转情况
			if(this.alive==1){
				
			
				g.save();
				
				g.translate(this.screen_x/2,this.screen_y/2);
				
				//绘制血条
				g.fillStyle="#7A378B";
				g.fillRect(-this.length_x/2+8, -this.length_y/2-18,this.hp/5+4,9);
				g.fillStyle="black";
				g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.hp/5,5);
				g.fillStyle="red";
				g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.curr_hp/5,5);
				g.fillStyle="black";
				//血条over
				
				
				g.rotate( this.angle );
				//绘制阴影
				//g.drawImage(img_playerShadow, this.birth_x-10, this.birth_y+20, this.length_x, this.length_y) ;
				
				//绘制飞机
				//alert(canvas[0]);
				
				if(this.superState==1){
					//alert(this.superState+"player superState");
					if(this.kind==1){
						g.drawImage(speedUp, -this.length_x/2+5, -this.length_y/2-10+60 , 40, 171) ;
					}
					else if(this.kind==2){
						g.drawImage(noHurt, -this.length_x/2-30, -this.length_y/2-10 , 110, 110) ;
					}
					
				}
				//绘制阴影
				g.drawImage(canvas_shadow[this.canvasNum], -this.length_x/2+10*Math.sin( this.angle), -this.length_y/2+10*Math.cos( this.angle) , this.length_x, this.length_y) ;
				
				g.drawImage(canvas[this.canvasNum], -this.length_x/2, -this.length_y/2 , this.length_x, this.length_y) ;
				
				
				g.restore();
			}

			
		}
		else if(this.goCircle==0){//非旋转情况，即前进或倒退
			if(this.alive==1){
				if(this.moved==1){
					var x_0;
					var y_0;
					if(this.position==1){
						x_0=this.birth_x+(this.speed)*(Math.sin(  this.angle));
						y_0=this.birth_y-(this.speed)*(Math.cos(  this.angle));
					}
					else{
						x_0=this.birth_x-(this.speed)*(Math.sin( this.angle));
						y_0=this.birth_y+(this.speed)*(Math.cos( this.angle));
					}
					
					this.will_x[0]=x_0+(Math.sqrt(2))*(this.length_x/3)*(Math.sin(   this.angle-(Math.PI/4)));
					this.will_y[0]=y_0-(Math.sqrt(2))*(this.length_x/3)*(Math.cos(   this.angle-(Math.PI/4)));
					//alert(( -(Math.PI/2))+"[]"+(Math.sqrt(2))*(this.length_x/2)*(Math.sin(  (1/(Math.PI*2)) * this.angle-(Math.PI/2))));
					this.will_x[1]=x_0+(Math.sqrt(2))*(this.length_x/3)*(Math.cos(   this.angle-(Math.PI/4)));
					this.will_y[1]=y_0+(Math.sqrt(2))*(this.length_x/3)*(Math.sin(   this.angle-(Math.PI/4)));
					
					this.will_x[2]=x_0-(Math.sqrt(2))*(this.length_x/3)*(Math.sin(   this.angle-(Math.PI/4)));
					this.will_y[2]=y_0+(Math.sqrt(2))*(this.length_x/3)*(Math.cos(   this.angle-(Math.PI/4)));
					
					this.will_x[3]=x_0-(Math.sqrt(2))*(this.length_x/3)*(Math.cos(   this.angle-(Math.PI/4)));
					this.will_y[3]=y_0-(Math.sqrt(2))*(this.length_x/3)*(Math.sin(   this.angle-(Math.PI/4)));
					
					this.will_x[4]=x_0+(this.length_x/3)*(Math.sin(   this.angle));
					this.will_y[4]=y_0-(this.length_x/3)*(Math.cos(   this.angle));
					
					this.will_x[5]=x_0-(this.length_x/3)*(Math.sin(   this.angle));
					this.will_y[5]=y_0+(this.length_x/3)*(Math.cos(   this.angle));
					
					this.can_move=1;
					this.ckeckCrash();	
					
				}
				if(this.can_move==0){
						
					g.save();
					g.translate(this.screen_x/2,this.screen_y/2);
					
					//绘制血条
					g.fillStyle="#7A378B";
					g.fillRect(-this.length_x/2+8, -this.length_y/2-18,this.hp/5+4,9);
					g.fillStyle="black";
					g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.hp/5,5);
					g.fillStyle="red";
					g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.curr_hp/5,5);
					g.fillStyle="black";
					//血条over
					
					g.rotate( this.angle );
					if(this.superState==1){
						if(this.kind==1){
							g.drawImage(speedUp, -this.length_x/2+5, -this.length_y/2-10+60, 40, 171) ;
						}
						else if(this.kind==2){
							g.drawImage(noHurt, -this.length_x/2-30, -this.length_y/2-10 , 110, 110) ;
						}
						
					}
					//绘制阴影
					g.drawImage(canvas_shadow[this.canvasNum], -this.length_x/2+10*Math.sin( this.angle), -this.length_y/2+10*Math.cos( this.angle) , this.length_x, this.length_y) ;
				
					g.drawImage(canvas[this.canvasNum], -this.length_x/2, (-this.length_y/2) , this.length_x, this.length_y);
					
					g.restore();
				}
				
				
				else {
					g.save();
					g.translate(this.screen_x/2,this.screen_y/2);
					
					if(this.position==1){	
						
						//绘制血条
						g.fillStyle="#7A378B";
						g.fillRect(-this.length_x/2+8, -this.length_y/2-18,this.hp/5+4,9);
						g.fillStyle="black";
						g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.hp/5,5);
						g.fillStyle="red";
						g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.curr_hp/5,5);
						g.fillStyle="black";
						//血条over
						
						g.rotate( this.angle );
						//技能
						if(this.superState==1){
							if(this.kind==1){
								g.drawImage(speedUp, -this.length_x/2+5, -this.length_y/2-10+60+this.speed, 40, 171) ;
							}
							else if(this.kind==2){
								g.drawImage(noHurt, -this.length_x/2-30, -this.length_y/2-10+this.speed , 110, 110) ;
							}
							
						}
						
						//绘制阴影
						g.drawImage(canvas_shadow[this.canvasNum], -this.length_x/2+10*Math.sin( this.angle), -this.length_y/2+10*Math.cos( this.angle) , this.length_x, this.length_y) ;
				
						g.drawImage(canvas[this.canvasNum], -this.length_x/2, (-this.length_y/2), this.length_x, this.length_y);
					}
					else {
						//绘制血条
						g.fillStyle="#7A378B";
						g.fillRect(-this.length_x/2+8, -this.length_y/2-18,this.hp/5+4,9);
						g.fillStyle="black";
						g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.hp/5,5);
						g.fillStyle="red";
						g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.curr_hp/5,5);
						g.fillStyle="black";
						//血条over
						
						g.rotate(  this.angle );
						if(this.superState==1){
							if(this.kind==1){
								g.drawImage(speedUp, -this.length_x/2+5, -this.length_y/2-10+60-this.speed, 40, 171) ;
							}
							else if(this.kind==2){
								g.drawImage(noHurt, -this.length_x/2-30, -this.length_y/2-10-this.speed , 110, 110) ;
							}
							
						}
						//绘制阴影
						g.drawImage(canvas_shadow[this.canvasNum], -this.length_x/2+10*Math.sin( this.angle), -this.length_y/2+10*Math.cos( this.angle) , this.length_x, this.length_y) ;
						//g.drawImage(canvas[this.canvasNum], -this.length_x/2, -this.length_y/2-this.speed, this.length_x, this.length_y) ;
						g.drawImage(canvas[this.canvasNum], -this.length_x/2, (-this.length_y/2), this.length_x, this.length_y);
					}
					if(this.moved==1){
						if(this.position==1){
							this.birth_x=this.birth_x+this.speed*(Math.sin( this.angle));
							this.birth_y=this.birth_y-this.speed*(Math.cos( this.angle));
						}
						else{
							this.birth_x=this.birth_x-this.speed*(Math.sin( this.angle));
							this.birth_y=this.birth_y+this.speed*(Math.cos( this.angle));
						}
						this.moved=0;
					}
					g.restore();
				}
			}
			
			
		}
		else if(this.goCircle==3){
			if(this.alive==1){
			
			
				if(this.moved==1){
				
					var x_0;
					var y_0;
					if(this.position==1){
						x_0=this.birth_x+(this.speed)*(Math.sin( this.angle));
						y_0=this.birth_y-(this.speed)*(Math.cos( this.angle));
					}
					else{
						x_0=this.birth_x-(this.speed)*(Math.sin( this.angle));
						y_0=this.birth_y+(this.speed)*(Math.cos( this.angle));
					}
					
					this.will_x[0]=x_0+(Math.sqrt(2))*(this.length_x/3)*(Math.sin(   this.angle-(Math.PI/4)));
					this.will_y[0]=y_0-(Math.sqrt(2))*(this.length_x/3)*(Math.cos(   this.angle-(Math.PI/4)));
					//alert(( -(Math.PI/2))+"[]"+(Math.sqrt(2))*(this.length_x/2)*(Math.sin(  (1/(Math.PI*2)) * this.angle-(Math.PI/2))));
					this.will_x[1]=x_0+(Math.sqrt(2))*(this.length_x/3)*(Math.cos(   this.angle-(Math.PI/4)));
					this.will_y[1]=y_0+(Math.sqrt(2))*(this.length_x/3)*(Math.sin(   this.angle-(Math.PI/4)));
					
					this.will_x[2]=x_0-(Math.sqrt(2))*(this.length_x/3)*(Math.sin(   this.angle-(Math.PI/4)));
					this.will_y[2]=y_0+(Math.sqrt(2))*(this.length_x/3)*(Math.cos(   this.angle-(Math.PI/4)));
					
					this.will_x[3]=x_0-(Math.sqrt(2))*(this.length_x/3)*(Math.cos(   this.angle-(Math.PI/4)));
					this.will_y[3]=y_0-(Math.sqrt(2))*(this.length_x/3)*(Math.sin(   this.angle-(Math.PI/4)));
					
					this.will_x[4]=x_0+(this.length_x/3)*(Math.sin(   this.angle));
					this.will_y[4]=y_0-(this.length_x/3)*(Math.cos(   this.angle));
					
					this.will_x[5]=x_0-(this.length_x/3)*(Math.sin(   this.angle));
					this.will_y[5]=y_0+(this.length_x/3)*(Math.cos(   this.angle));
					
					this.can_move=1;
					this.ckeckCrash();
					
					
					
					
					
				}
				if(this.can_move==0){
					
					
					
					//alert(groundNum_x+"--"+groundNum_y);
					g.save();
					g.translate(this.screen_x/2,this.screen_y/2);
					
					g.fillStyle="#7A378B";
					g.fillRect(-this.length_x/2+8, -this.length_y/2-18,this.hp/5+4,9);
					g.fillStyle="black";
					g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.hp/5,5);
					g.fillStyle="red";
					g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.curr_hp/5,5);
					g.fillStyle="black";
					
					
					g.rotate(  this.angle );
					if(this.superState==1){
						if(this.kind==1){
							g.drawImage(speedUp, -this.length_x/2+5, -this.length_y/2-10+60, 40, 171) ;
						}
						else if(this.kind==2){
							g.drawImage(noHurt, -this.length_x/2-30, -this.length_y/2-10 , 110, 110) ;
						}
						
					}
					//绘制阴影
					g.drawImage(canvas_shadow[this.canvasNum], -this.length_x/2+10*Math.sin( this.angle), -this.length_y/2+10*Math.cos( this.angle) , this.length_x, this.length_y) ;
				
					g.drawImage(canvas[this.canvasNum], -this.length_x/2, (-this.length_y/2) , this.length_x, this.length_y);
					
					g.restore();
				}
					
					
				
			
			
				else{
					g.save();
				
					g.translate(this.screen_x/2,this.screen_y/2);
					
					

					//绘制阴影
					//g.drawImage(img_playerShadow, this.birth_x-10, this.birth_y+20, this.length_x, this.length_y) ;
					
					
					
					//绘制飞机
					if(this.position==1){
						/*
						if(  Math.abs( ((1/(Math.PI*2)) * this.angle) %(Math.PI*2) )<=(Math.PI/2)){
							g.fillStyle="#7A378B";
							g.fillRect(-this.length_x/2+8, -this.length_y/2+this.speed-18,this.hp/5+4,9);
							g.fillStyle="black";
							g.fillRect(-this.length_x/2+10, -this.length_y/2+this.speed-16,this.hp/5,5);
							g.fillStyle="red";
							g.fillRect(-this.length_x/2+10, -this.length_y/2+this.speed-16,this.curr_hp/5,5);
							g.fillStyle="black";
						}
						else {
							g.fillStyle="#7A378B";
							g.fillRect(-this.length_x/2+8, -this.length_y/2-this.speed-18,this.hp/5+4,9);
							g.fillStyle="black";
							g.fillRect(-this.length_x/2+10, -this.length_y/2-this.speed-16,this.hp/5,5);
							g.fillStyle="red";
							g.fillRect(-this.length_x/2+10, -this.length_y/2-this.speed-16,this.curr_hp/5,5);
							g.fillStyle="black";
						}
						*/
						//绘制血条
						g.fillStyle="#7A378B";
						g.fillRect(-this.length_x/2+8, -this.length_y/2-18,this.hp/5+4,9);
						g.fillStyle="black";
						g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.hp/5,5);
						g.fillStyle="red";
						g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.curr_hp/5,5);
						g.fillStyle="black";
						//血条over
						
						g.rotate(  this.angle );
						if(this.superState==1){
							if(this.kind==1){
								g.drawImage(speedUp, -this.length_x/2+5, -this.length_y/2-10+60+this.speed, 40, 171) ;
							}
							else if(this.kind==2){
								g.drawImage(noHurt, -this.length_x/2-30, -this.length_y/2-10+this.speed , 110, 110) ;
							}
							
						}
						//绘制阴影
						g.drawImage(canvas_shadow[this.canvasNum], -this.length_x/2+10*Math.sin( this.angle), -this.length_y/2+10*Math.cos( this.angle) , this.length_x, this.length_y) ;
				
						//g.drawImage(canvas[this.canvasNum], -this.length_x/2, -this.length_y/2+this.speed , this.length_x, this.length_y);
						g.drawImage(canvas[this.canvasNum], -this.length_x/2, (-this.length_y/2), this.length_x, this.length_y);
					}
					else {
						/*
						if(  Math.abs( ((1/(Math.PI*2)) * this.angle) %(Math.PI*2) )<=(Math.PI/2)){
							g.fillStyle="#7A378B";
							g.fillRect(-this.length_x/2+8, -this.length_y/2-this.speed-18,this.hp/5+4,9);
							g.fillStyle="black";
							g.fillRect(-this.length_x/2+10, -this.length_y/2-this.speed-16,this.hp/5,5);
							g.fillStyle="red";
							g.fillRect(-this.length_x/2+10, -this.length_y/2-this.speed-16,this.curr_hp/5,5);
							g.fillStyle="black";
						}
						else {
							g.fillStyle="#7A378B";
							g.fillRect(-this.length_x/2+8, -this.length_y/2+this.speed-18,this.hp/5+4,9);
							g.fillStyle="black";
							g.fillRect(-this.length_x/2+10, -this.length_y/2+this.speed-16,this.hp/5,5);
							g.fillStyle="red";
							g.fillRect(-this.length_x/2+10, -this.length_y/2+this.speed-16,this.curr_hp/5,5);
							g.fillStyle="black";
						}
						*/
						//绘制血条
						g.fillStyle="#7A378B";
						g.fillRect(-this.length_x/2+8, -this.length_y/2-18,this.hp/5+4,9);
						g.fillStyle="black";
						g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.hp/5,5);
						g.fillStyle="red";
						g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.curr_hp/5,5);
						g.fillStyle="black";
						//血条over
						
						g.rotate(  this.angle );
						if(this.superState==1){
							if(this.kind==1){
								g.drawImage(speedUp, -this.length_x/2+5, -this.length_y/2-10+60-this.speed, 40, 171) ;
							}
							else if(this.kind==2){
								g.drawImage(noHurt, -this.length_x/2-30, -this.length_y/2-10-this.speed , 110, 110) ;
							}
							
						}
						//绘制阴影
						g.drawImage(canvas_shadow[this.canvasNum], -this.length_x/2+10*Math.sin( this.angle), -this.length_y/2+10*Math.cos( this.angle) , this.length_x, this.length_y) ;
				
						//g.drawImage(canvas[this.canvasNum], -this.length_x/2, -this.length_y/2-this.speed, this.length_x, this.length_y) ;
						g.drawImage(canvas[this.canvasNum], -this.length_x/2, (-this.length_y/2), this.length_x, this.length_y);
					}
					if(this.moved==1){
						if(this.position==1){
							this.birth_x=this.birth_x+this.speed*(Math.sin( this.angle));
							this.birth_y=this.birth_y-this.speed*(Math.cos( this.angle));
						}
						else{
							this.birth_x=this.birth_x-this.speed*(Math.sin( this.angle));
							this.birth_y=this.birth_y+this.speed*(Math.cos( this.angle));
						}
						this.moved=0;
					}
					g.restore();
				}
			}

		}
		else {
			if(this.alive==1){

				g.save();
				g.translate(this.screen_x/2,this.screen_y/2);
				
				g.fillStyle="#7A378B";
				g.fillRect(-this.length_x/2+8, -this.length_y/2-18,this.hp/5+4,9);
				g.fillStyle="black";
				g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.hp/5,5);
				g.fillStyle="red";
				g.fillRect(-this.length_x/2+10, -this.length_y/2-16,this.curr_hp/5,5);
				g.fillStyle="black";
				
				
				g.rotate(  this.angle );
				if(this.superState==1){
					if(this.kind==1){
						g.drawImage(speedUp, -this.length_x/2+5, -this.length_y/2-10+60, 40, 171) ;
					}
					else if(this.kind==2){
						g.drawImage(noHurt, -this.length_x/2-30, -this.length_y/2-10 , 110, 110) ;
					}
					
				}
				g.drawImage(canvas[this.canvasNum], -this.length_x/2, (-this.length_y/2) , this.length_x, this.length_y);
				g.restore();
				
				//this.moved=1;
				//this.goCircle=0;
				if(this.position==0){
					this.position=1;
				}
				else if(this.position==1){
					this.position=0;
				}
				//alert("xx");
				
				if(this.position==1){
					this.birth_x=this.birth_x+this.speed*(Math.sin( this.angle));
					this.birth_y=this.birth_y-this.speed*(Math.cos( this.angle));
				}
				else{
					this.birth_x=this.birth_x-this.speed*(Math.sin( this.angle));
					this.birth_y=this.birth_y+this.speed*(Math.cos( this.angle));
				}
			}
		}
			
	},
	
	addBullet1:function()
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
				this.onFire=1;
			}

			var bullet = new Bullet1(this.screen_x-15+(Math.sin( this.angle))*(this.length_y/2),this.screen_y-(Math.cos( this.angle))*(this.length_y/2),this.angle,this.attack*1.2,this.playerId,(bullets.length));
			bullets.push(bullet);
			var bullet2 = new Bullet1(this.screen_x+(Math.sin( this.angle))*(this.length_y/2),this.screen_y-(Math.cos( this.angle))*(this.length_y/2),this.angle,this.attack*1.2,this.playerId,(bullets.length));
			bullets.push(bullet2);
			var bullet3 = new Bullet1(this.screen_x+15+(Math.sin( this.angle))*(this.length_y/2),this.screen_y-(Math.cos( this.angle))*(this.length_y/2),this.angle,this.attack*1.2,this.playerId,(bullets.length));
			bullets.push(bullet3);
		}
		else {
			if(this.onFire==1){
				m_fire1.play();
				this.onFire++;
				//alert("p");
			}
			else if(this.onFire==2){
				m_fire2.play();
				this.onFire++;
			}
			else if(this.onFire==3){
				m_fire3.play();
				this.onFire=1;
			}
			var bullet0 = new Bullet1(this.birth_x,this.birth_y,this.angle,this.attack,this.playerId,(bullets.length));
			bullets.push(bullet0);
		}
	},
	
	superZZ:function()
	{	
		if(this.kind==1){
			this.speed=(this.speed)*3;
			this.superState=1;
			var id_xx=this.playerId;
			setTimeout("sleepZZ();",3000);
		}
		else if(this.kind==2){
			this.superState=1;
			var id_xx=this.playerId;
			setTimeout("sleepZZ();",3000);
		}
		else if(this.kind==3){
			this.superState=1;
			m_fire4.play();
			this.addBullet1();
			var id_xx=this.playerId;
			setTimeout("sleepZZ();",3000);
		}
		else if(this.kind==0){
			var bullet = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle,(this.attack*2+70),this.playerId,(bullets.length));
			bullets.push(bullet);
			var bullet2 = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle+45,(this.attack*2+70),this.playerId,(bullets.length));
			bullets.push(bullet2);
			var bullet3 = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle+90,(this.attack*2+70),this.playerId,(bullets.length));
			bullets.push(bullet3);
			var bullet4 = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle+135,(this.attack*2+70),this.playerId,(bullets.length));
			bullets.push(bullet4);
			var bullet5 = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle+180,(this.attack*2+70),this.playerId,(bullets.length));
			bullets.push(bullet5);
			var bullet6 = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle-45,(this.attack*2+70),this.playerId,(bullets.length));
			bullets.push(bullet6);
			var bullet7 = new Bullet1(this.birth_x+(Math.sin( this.angle))*(this.length_y/2),this.birth_y-(Math.cos( this.angle))*(this.length_y/2),this.angle-90,(this.attack*2+70),this.playerId,(bullets.length));
			bullets.push(bullet7);
			var bullet8 = new Bullet1(this.birth_x+(Math.sin((1/(Math.PI*2)) * this.angle))*(this.length_y/2),this.birth_y-(Math.cos((1/(Math.PI*2)) * this.angle))*(this.length_y/2),this.angle-135,(this.attack*2+70),this.playerId,(bullets.length));
			bullets.push(bullet8);
			this.curr_hp=this.curr_hp-400;
			this.h=1;
			this.superState=1;
			var id_xx=this.playerId;
			setTimeout("sleepZZ();",3000);
		}
	},
		
	keymove:function()
	{
		var v = this.speed;
		if(key[this.K_UP]){
			
			
			if(((this.birth_x-this.length_x/2) <= (this.screen_x/2))||((this.birth_x+this.length_x/2) >= (this.x-(this.screen_x/2)))||((this.birth_y-this.length_y/2) < (this.screen_y/2))||((this.birth_y+this.length_y/2) > (this.y-(this.screen_y/2)))) {
				this.goCircle=4;
			}
			else{
				this.position=1;
				this.moved=1;
				this.goCircle=0;
				
				if(key[this.K_LEFT]){
					this.position=1;
					this.moved=1;
					this.angle=(this.angle-(this.speed/30)*(1/(Math.PI*2))+Math.PI*2)%(Math.PI*2);
					this.goCircle=3;
					
				}
				else if(key[this.K_RIGHT]){
					this.position=1;
					this.moved=1;
					this.angle=(this.angle+(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2);
					this.goCircle=3;
					
				}
			}
			if(AI_on==0){
				setP(this.birth_x,this.birth_y,this.angle);
				key_function();
			}
		}
		else if(key[this.K_DOWN]){
			if(((this.birth_x-this.length_x/2) <= (this.screen_x/2))||((this.birth_x+this.length_x/2) >= (this.x-(this.screen_x/2)))||((this.birth_y-this.length_y/2) < (this.screen_y/2))||((this.birth_y+this.length_y/2) > (this.y-(this.screen_y/2)))) {
				this.goCircle=4;
			}
			else {
				this.position=0;
				this.moved=1;
				this.goCircle=0;
				
				if(key[this.K_LEFT]){
					this.position=0;
					this.moved=1;
					this.angle=(this.angle-(this.speed/30)*(1/(Math.PI*2))+Math.PI*2)%(Math.PI*2);
					this.goCircle=3;
				}
				else if(key[this.K_RIGHT]){
					this.position=0;
					this.moved=1;
					this.angle=(this.angle+(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2);
					this.goCircle=3;
				}
			}
			if(AI_on==0){
				setP(this.birth_x,this.birth_y,this.angle);
				key_function();
			}
		}
		else if(key[this.K_LEFT]){
			this.angle=(this.angle-(this.speed/30)*(1/(Math.PI*2))+Math.PI*2)%(Math.PI*2);
			this.goCircle=1;
			if(AI_on==0){
				setP(this.birth_x,this.birth_y,this.angle);
				key_function();
			}
		}
		else if(key[this.K_RIGHT]){
			this.angle=(this.angle+(this.speed/30)*(1/(Math.PI*2)))%(Math.PI*2);
			this.goCircle=1;
			if(AI_on==0){
				setP(this.birth_x,this.birth_y,this.angle);
				key_function();
			}
		}
		

		if(key[this.K_XX]){
			if((this.lastBullet==-1)||((time-this.lastBullet)>(this.delay*34))){
				this.addBullet1();
				this.lastBullet=time;
				if(AI_on==0){
					xx_key();
					key_function();
				}
			}
		}
		/*
		else if(key[this.K_ZZ]){
			if((this.lastSuper==-1)||((time-this.lastSuper)>(this.delay*1000))){
				this.superZZ();
				this.lastSuper=time;
				zz_key();
				key_function();
			}
			
		}
		*/
		else {
			
		}
		
	},
	addBoom : function()
	{
		if(this.h==1){
			g.save();
						
			g.translate(this.screen_x/2,this.screen_y/2);
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
	},
	checkHit : function()
	{
		//check if hurt
	
		for(var i = 0; i < enemy_bullets.length;i ++)
		{
			var ex = enemy_bullets[i].birth_x; 
			var ey = enemy_bullets[i].birth_y;
			var attack=enemy_bullets[i].attack;
			var center_x=this.birth_x;
			var center_y=this.birth_y;
			
			if((gameStart==1)&&(this.alive==1)&&( Math.sqrt( Math.abs(center_x-ex)*Math.abs(center_x-ex)+Math.abs(center_y-ey)*Math.abs(center_y-ey) )<(this.length_x/2) ))
			{	
				
				if((this.kind==2)&&(this.superState==1)){
					
				}
				else{
					this.curr_hp-=attack;
					enemy_bullets[i].isDie=true;
					this.beHurtId=enemy_bullets[i].playerId;
					this.beHurtNum=enemy_bullets[i].num_i;
					this.h=1;
					m_fireHit.play();
					this.addBoom();
					zhen();
					//alert("zhen");
				}
			}
			
		}
		
		//END

	},

	update:function()
	{
		this.keymove();
		this.checkHit();
		if(this.h==1){
			
			if (this.curr_hp<=0){
				if(AI_on==0){
					hurt(this.curr_hp);
				}
				this.alive=0;
				death_num++;
				this.curr_hp=0;
				var storage=window.localStorage;
				storage.clear();
			}
			else{
				if(AI_on==0){
					hurt(this.curr_hp);
				}
			}
		}
		this.h=0;
		
	},
	
	ckeckCrash:function(){//布景的碰撞判断
		for(var i=0;i<scenerys.length;i++){
			if(scenerys[i].ifIn==1){
				for(var j=0;j<this.will_x.length;j++){
					if((this.will_x[j]>scenerys[i].scen_birth_x)&&(this.will_x[j]<(scenerys[i].scen_birth_x+scenerys[i].scen_length_x))&&(this.will_y[j]>scenerys[i].scen_birth_y)&&(this.will_y[j]<(scenerys[i].scen_birth_y+scenerys[i].scen_length_y))){
						this.can_move=0;
						//alert(this.can_move+":xx");
					}
				}
				
			}
		}
		for(var i=0;i<ai.length;i++){
			for(var j=0;j<this.will_x.length;j++){
				if((this.will_x[j]>ai[i].birth_x)&&(this.will_x[j]<(ai[i].birth_x+ai[i].length_x))&&(this.will_y[j]>ai[i].birth_y)&&(this.will_y[j]<(ai[i].birth_y+ai[i].length_y))){
					this.can_move=0;
					//alert(this.can_move+":xx");
				}
			}
		}
		for(var i=0;i<enemys.length;i++){
			for(var j=0;j<this.will_x.length;j++){
				if((this.will_x[j]>enemys[i].birth_x)&&(this.will_x[j]<(enemys[i].birth_x+enemys[i].length_x))&&(this.will_y[j]>enemys[i].birth_y)&&(this.will_y[j]<(enemys[i].birth_y+enemys[i].length_y))){
					this.can_move=0;
					//alert(this.can_move+":xx");
				}
			}
		}
	}
	
}


function Bullet1(x,y,a,attack,playerId,num_i)
{
	this.birth_x = x;//出生位置 x
	this.birth_y = y;//出生位置 y
	this.speed = 9;
	this.angle=a;
	this.isDie = false;
	this.attack=attack;
	this.playerId=playerId;
	this.num_i=num_i;
	this.pe = new cParticleEmitter();
}
Bullet1.prototype.draw = function()
{
	
	if (!this.isDie)
	{
		//设定子弹效果：index=3
		 
		//绘制粒子效果实例化
		if(this.pe.active){
		this.pe.position.x = this.birth_x-(player.birth_x-player.screen_x/2);
		this.pe.position.y = this.birth_y-(player.birth_y-player.screen_y/2);
		this.pe.update(1);
		this.pe.renderParticles( g );
		}
	}
	else{
		
	}
};
Bullet1.prototype.update = function()
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
			this.pe.stopParticleEmitter();
			this.pe=null;
		}
	}
};
Bullet1.prototype.ckeckCrashScenery=function(){//布景的碰撞判断
	for(var i=0;i<scenerys.length;i++){
		if(scenerys[i].ifIn==1){
			if((this.birth_x>scenerys[i].scen_birth_x)&&(this.birth_x<(scenerys[i].scen_birth_x+scenerys[i].scen_length_x))&&(this.birth_y>scenerys[i].scen_birth_y)&&(this.birth_y<(scenerys[i].scen_birth_y+scenerys[i].scen_length_y))){
				this.isDie=true;
			}	
		}
	}
};

Bullet1.prototype.ckeckCrashEnemy=function(){//布景的碰撞判断
	
	for(var i=0;i<enemys.length;i++){
		
		if((gameStart==1)&&(enemys[i].alive==1)&&( Math.sqrt( Math.abs(enemys[i].birth_x-this.birth_x)*Math.abs(enemys[i].birth_x-this.birth_x)+Math.abs(enemys[i].birth_y-this.birth_y)*Math.abs(enemys[i].birth_y-this.birth_y) )<(enemys[i].length_x/2) ))
		{
			this.isDie=true;
		}	
		
	}
}






