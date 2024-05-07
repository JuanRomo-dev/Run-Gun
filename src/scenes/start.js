import Phaser from 'phaser';

export default class Start extends Phaser.Scene{
  constructor(){
    super({key: 'start'})
  }

  create(){
    this.startButton = this.add.sprite(500,320,'btn_start').setInteractive();

    this.startButton.on('pointerdown', () =>{
      this.scene.start("level");
    })

  }
}