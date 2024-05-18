export class HomeBtn{
  constructor(scene){
    this.scene = scene;
  }

  create(){
    this.homeBtn = this.scene.add.sprite(50,50,'btn_exit').setInteractive().setScrollFactor(0);
    this.homeBtn.on('pointerdown', () =>{
      this.scene.scene.start("start");
    });
    
    this.homeBtn.on('pointerover', () =>{
      this.homeBtn.setScale(1.1); 
    });
    this.homeBtn.on('pointerout', () =>{
      this.homeBtn.setScale(1); 
    });

  }

}