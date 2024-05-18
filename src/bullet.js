import Phaser from 'phaser';

class Bullet extends Phaser.GameObjects.Sprite {
  damage = 0;
  endScreenWidth = 7648;
  parabola = false;
  rotacion = 0.3;
  giro = 0;
  lanzador;
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene.physics.add.existing(this);
    this.setScale(3, 3);
  }

  fire(player) {
    this.damage = player.bulletDamage;
    this.body.reset(player.x, player.y);
    this.body.setAllowGravity(false);


    if(player.textureBullet == "knife1"){      
      this.setScale(1.5, 1.5);
      this.body.setOffset(0, 10);
      if(player.direction == "right"){
        this.setFlipX(false);
      }
      else if(player.direction == "left"){
        this.setFlipX(true);
      }
      
    }

    this.setActive(true);
    this.setVisible(true);
    if(player.direction == "right"){
      this.body.setVelocityX(player.bulletVelocity);
    }
    else if(player.direction == "left"){
      this.body.setVelocityX(-player.bulletVelocity);
    }
  }

  throw(player) {
    let random = Math.floor(Math.random() * 5) + 1;

    this.setTexture("knife" + random.toString());
    this.damage = player.bulletDamage;
    this.body.reset(player.x, player.y);
    this.body.setAllowGravity(true);
    this.body.setOffset(10, 10);
    this.parabola = true;
    this.lanzador = player;
    this.setActive(true);
    this.setVisible(true);
    this.body.setVelocityY(-300);
    this.setScale(1.5, 1.5);
    if(player.direction == "right"){
      this.body.setVelocityX(player.bulletVelocity); 
    }
    else if(player.direction == "left"){
      this.body.setVelocityX(-player.bulletVelocity);
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

//    this.scene.cameras.main.centerX
    const cameraX = this.scene.cameras.main.scrollX;
    const cameraY = this.scene.cameras.main.scrollY;

    const cameraWidth = this.scene.cameras.main.width;

    if(this.parabola){
      this.giro = this.giro + this.rotacion;
      this.setRotation(this.giro);
    }

    if (this.x > cameraX + cameraWidth || this.x < cameraX) {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    }
  }

  changeTexture(textureKey) {
    this.setTexture(textureKey);
    console.log("textura actual", this.texture.key);
  }
}

export default class Bullets extends Phaser.GameObjects.Group {
  constructor(scene, texture) {
    super(scene);

    this.createMultiple({
      frameQuantity: 250,
      key: texture,
      active: false,
      visible: false,
      classType: Bullet,
    });
  }

  fireBullet(player) {
    let bullet = this.getFirstDead(false);
    console.log(bullet.texture.key);
    
    if (bullet) {
      bullet.changeTexture(player.textureBullet); 
      if (bullet.texture.key === "bullet") {
        this.scene.sound.play("disparoPistola");
      }
      else if (bullet.texture.key === "m16_bullet") {
        this.scene.sound.play("disparoM16");
      }
      else if (bullet.texture.key === "rifle_bullet") {
        this.scene.sound.play("disparoAK47");
      }
      bullet.fire(player);
    }
  }

  throwKnife(player) {
    let bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.changeTexture(player.textureBullet); 
      bullet.throw(player);
    }
  }



}


  
