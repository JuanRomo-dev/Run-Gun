import Phaser from 'phaser';

class Bullet extends Phaser.GameObjects.Sprite {
  damage = 2;
  velocity = 600;
  endScreenWidth = 1200;

  constructor(scene, x, y) {
    super(scene, x, y, "bullet");
    this.scene.physics.add.existing(this);
    this.setScale(3, 3);
  }

  fire(x, y) {
    this.body.reset(x, y);
    this.body.setAllowGravity(false);

    this.setActive(true);
    this.setVisible(true);
    this.body.setVelocityX(this.velocity);

    console.log("bullet (x,y) ", this.x, this.y);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    // Reset the bullets when it reaches end of screen
    if (this.x > this.endScreenWidth) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

export default class Bullets extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);

    this.createMultiple({
      frameQuantity: 20,
      key: "bullet",
      active: false,
      visible: false,
      classType: Bullet,
    });
  }

  fireBullet(x, y) {
    let bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.fire(x, y);
    }
  }
}
