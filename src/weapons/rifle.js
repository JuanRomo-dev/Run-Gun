import Phaser from 'phaser';

export default class Rifle extends Phaser.GameObjects.Sprite {
  bulletDamage = 4;
  bulletVelocity = 600;
  name = "rifle";
  ammo = 20;
  textureBullet = "rifle_bullet"

  constructor(scene, x, y) {
      super(scene, x, y, "rifle");
      this.setScale(3,3);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setCollideWorldBounds();
  }       

}
