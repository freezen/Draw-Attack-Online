function Scenery(imgID,scen_birth_x,scen_birth_y,scen_length_x,scen_length_y)
{
	this.imgID=imgID;
	this.scen_birth_x=scen_birth_x;
	this.scen_birth_y=scen_birth_y;
	this.scen_length_x=scen_length_x;
	this.scen_length_y=scen_length_y;
	this.ifIn=0;//�ж��Ƿ���ҳ���ϣ���Ҫ��ʾ
	this.bullet_Through=0;//�ж��ӵ��Ƿ�ɴ�Խ��0������
	this.player_Through=1;//�ж�̹���Ƿ�ɴ�Խ��0������
}
Scenery.prototype.drawSceneryItem = function()
{
	
		if((this.scen_birth_x>(player.birth_x-player.screen_x/2))&&(this.scen_birth_x<(player.birth_x+player.screen_x/2))&&(this.scen_birth_y<(player.birth_y+player.screen_y/2))&&(this.scen_birth_y<(player.birth_y+player.screen_y/2))){
			
			var scen_img = document.getElementById(this.imgID);//get the bomb image object element
			g.drawImage(scen_img, this.scen_birth_x-(player.birth_x-player.screen_x/2), this.scen_birth_y-(player.birth_y-player.screen_y/2), this.scen_length_x, this.scen_length_y) ;
			this.ifIn=1;
		}
		else{
			this.ifIn=0;
		}		
	
};	


Scenery.prototype.update=function()
{
/*
	if(this.curr_hp<=0){
		this.alive=0;
		music_i+=1;
		death_num++;
		m_die[music_i-1].play();
	}
	this.keymove();
	*/
};