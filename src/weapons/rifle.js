import Phaser from 'phaser';

export default class Rifle extends Phaser.GameObjects.Sprite {
  bulletVelocity = 600;
  name = "rifle";

  constructor(scene, x, y) {
      super(scene, x, y, "rifle");
      this.setScale(3,3);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.scene.physics.add.collider(this, player);
      this.body.setCollideWorldBounds();
  }

}
