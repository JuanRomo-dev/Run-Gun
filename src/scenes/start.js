import Phaser from 'phaser';

export default class Start extends Phaser.Scene{
  constructor(){
    super({key: 'start'})
  }

  create(){
    this.startButton = this.add.sprite(500,320,'btn_start').setInteractive().setScale(0.5);

    this.startButton.on('pointerdown', () =>{
      this.scene.start("level");
    })

    this.startButton.on('pointerover', () =>{
      this.startButton.setScale(0.6); // Restaura la escala al 50% de su tamaño original
    });

    this.startButton.on('pointerout', () =>{
      this.startButton.setScale(0.5); // Restaura la escala al 50% de su tamaño original
    });
  }
}