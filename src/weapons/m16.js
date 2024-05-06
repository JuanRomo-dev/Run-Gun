import Phaser from 'phaser';

export default class M16 extends Phaser.GameObjects.Sprite {
  bulletDamage = 5;
  bulletVelocity = 500;
  name = "m16";
  ammo = 25;

  constructor(scene, x, y) {
      super(scene, x, y, "m16");
      this.setScale(3,3);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setCollideWorldBounds();
  }       

}
