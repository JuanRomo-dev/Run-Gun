export class MusicBtn{
  mute = false;
  constructor(scene){
    this.scene = scene;
  }

  create(){
    this.musicBtn = this.scene.add.sprite(1000,50,'btnMusic').setInteractive().setScale(0.6).setScrollFactor(0);
    this.musicBtn.on('pointerdown', () =>{
      if(!this.mute){
        this.scene.sound.pauseAll(); // Detener toda la música
        this.musicBtn.setFrame(1);
        this.mute= true;
      }else{
        this.scene.sound.resumeAll(); // Detener toda la música

        this.musicBtn.setFrame(0);
        this.mute= false;
      }
    });
    
    this.musicBtn.on('pointerover', () =>{
      this.musicBtn.setScale(0.7); 
    });
    this.musicBtn.on('pointerout', () =>{
      this.musicBtn.setScale(0.6); 
    });

  }

}