import Phaser from 'phaser';

export default class M16 extends Phaser.GameObjects.Sprite {
  bulletDamage = 8;
  bulletVelocity = 575;
  name = "m16";
  ammo = 25;
  textureBullet = "m16_bullet"
  constructor(scene, x, y) {
      super(scene, x, y, "m16");
      this.setScale(3,3);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setCollideWorldBounds();
      this.body.setAllowGravity(false);
  }       

}
