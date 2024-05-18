export class FullSizeBtn{
  constructor(scene){
    this.scene = scene;
  }

  create(){
    console.log("creado");
    this.fullSizeBtn = this.scene.add.sprite(1050,50,'btnFullSize').setInteractive().setScrollFactor(0);
    this.fullSizeBtn.on('pointerdown', () =>{
      if(!this.scene.scale.isFullscreen){
        this.fullSizeBtn.setFrame(1);
        this.scene.scale.startFullscreen();
      }else{
        this.fullSizeBtn.setFrame(0);
        this.scene.scale.stopFullscreen();
      }
    });
    
    
    this.fullSizeBtn.on('pointerover', () =>{
      this.fullSizeBtn.setScale(1.1); 
    });
    this.fullSizeBtn.on('pointerout', () =>{
      this.fullSizeBtn.setScale(1); 
    });

  }

}