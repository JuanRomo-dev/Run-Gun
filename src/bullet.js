import Phaser from 'phaser';

class Bullet extends Phaser.GameObjects.Sprite {
  damage = 2;
  endScreenWidth = 3200;

  constructor(scene, x, y) {
    super(scene, x, y, "bullet");
    this.scene.physics.add.existing(this);
    this.setScale(3, 3);
  }

  fire(player) {
    this.body.reset(player.x, player.y);
    this.body.setAllowGravity(false);

    this.setActive(true);
    this.setVisible(true);
    if(player.direction == "right"){
      this.body.setVelocityX(player.bulletVelocity);
    }
    else if(player.direction == "left"){
      this.body.setVelocityX(-player.bulletVelocity);
    }
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
      frameQuantity: 40,
      key: "bullet",
      active: false,
      visible: false,
      classType: Bullet,
    });
  }

  fireBullet(player) {
    let bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.fire(player);
    }
  }
}
