import Phaser from "phaser";

export default class T1000 extends Phaser.GameObjects.Sprite {
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, player, x, y) {
    super(scene, x, y, "t-1000");
    this.score = 0;
    this.setScale(3, 3);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.physics.add.collider(this, player);
    this.body.setCollideWorldBounds();
  }
}
