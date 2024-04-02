import Phaser from 'phaser';

export default class T1000 extends Phaser.GameObjects.Sprite {
  life = 10;
  score = 5;

  constructor(scene, player, x, y) {
    super(scene, x, y, "t-1000");
    this.setScale(3, 3);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.physics.add.collider(this, player);
    this.body.setCollideWorldBounds();
  }
}
