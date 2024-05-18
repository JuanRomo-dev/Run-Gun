import Phaser from 'phaser';
import { FullSizeBtn } from '../components/fullSizeBtn';
/**
 * Escena de fin de juego. Cuando se han recogido todas las estrellas, se presenta un
 * texto que indica que el juego se ha acabado.
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
export default class Victory extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'victory' });
    this.fullSizeBtn = new FullSizeBtn(this);
  }

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   */
  create() {
    this.fullSizeBtn.create();
    this.add.text(550, 250, 'Felicidades, has completado el Juego')
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center');  // Centramos el texto dentro del cuadro de texto

    this.restartBtn = this.add.sprite(550,420,'btn_restart').setInteractive().setScale(4);

    this.restartBtn.on('pointerdown', () =>{
      this.scene.start("start");
    })

    this.restartBtn.on('pointerover', () =>{
      this.restartBtn.setScale(5); // Restaura la escala al 50% de su tamaño original
    });

    this.restartBtn.on('pointerout', () =>{
      this.restartBtn.setScale(4); // Restaura la escala al 50% de su tamaño original
    });
    
  }

}