import Phaser from 'phaser';
import { FullSizeBtn } from '../components/fullSizeBtn';
export default class Start extends Phaser.Scene{
  constructor(){
    super({key: 'start'})
    this.fullSizeBtn = new FullSizeBtn(this);

  }

  create(){
    this.add.image(0,0,"background").setScale(1.5);
    this.fullSizeBtn.create();
    this.startButton = this.add.sprite(550,280,'btn_start').setInteractive().setScale(0.5);
    this.controlesButton = this.add.sprite(550, 420, "bnt_controles").setInteractive().setScale(1.5);
    this.startButton.on('pointerdown', () =>{
      this.scene.start("level");
    })
    this.startButton.on('pointerover', () =>{
      this.startButton.setScale(0.6); 
    });
    this.startButton.on('pointerout', () =>{
      this.startButton.setScale(0.5); 
    });

    this.controlesButton.on('pointerdown', () =>{
      this.scene.start("controls");
    })
    this.controlesButton.on('pointerover', () =>{
      this.controlesButton.setScale(1.6); 
    });
    this.controlesButton.on('pointerout', () =>{
      this.controlesButton.setScale(1.5); 
    });
    
  }
}