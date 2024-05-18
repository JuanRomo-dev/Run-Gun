import Phaser from 'phaser';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  bulletDamage;
  bulletVelocity;
  defaultbulletDamage = 4;
  defaultbulletVelocity = 450;
  ammo = undefined;
  weapon = undefined;
  textureBullet = "bullet"
  life = 6;
  isShooting = false;
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, "player");
    this.setDepth(10);
    this.anims.create({
      key: 'mikeDash',
      frames: this.anims.generateFrameNames('mikeDash', { start: 0, end: 5 }),
      frameRate: 8,
      repeat: 0
    })
    
    this.on('animationcomplete', end => {
      if (this.anims.currentAnim.key === 'mikeDash') {
        this.isDashing = false;
      }
    });
    
    this.bulletDamage = this.defaultbulletDamage;
    this.bulletVelocity = this.defaultbulletVelocity;

    this.score = 0;
    this.setScale(1.8, 1.8);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.body.setSize(33, 35);
    this.idleTime = null;
    
    // Datos del jugador
    this.speed = 300;
    this.fallSpeed = 270;
    this.jumpSpeed = -350;
    this.dashSpeed = 500;
    
    // Estados del jugador
    this.isInAir = false;
    this.isDashing = false;
    this.canDash = true;
  
    this.direction = "right"


    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.labelScore = this.scene.add.text(10, 10, "Score: 0");
    this.labelScore.setScrollFactor(0);
    this.lifeScore = this.scene.add.text(10, 30, "Life:");
    this.lifeScore.setScrollFactor(0);

    //UI ammo
    this.labelAmmo = this.scene.add.text(10, 50, "Ammo: ∞");
    this.labelAmmo.setScrollFactor(0);

    // Keys
    this.cursors = this.scene.input.keyboard.addKeys({
      spacebar: Phaser.Input.Keyboard.KeyCodes.SPACE,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      ctrl: Phaser.Input.Keyboard.KeyCodes.CTRL,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
    })
    
    this.handleControls();
    this.controls = this.keyboardControls;  

  }

  updateWeapon(weapon) {
    this.scene.sound.play('getWeapon');
    this.bulletVelocity = weapon.bulletVelocity;
    this.bulletDamage = weapon.bulletDamage;
    this.textureBullet = weapon.textureBullet;
    if(this.weapon === undefined || this.weapon.name !== weapon.name)
      this.ammo = weapon.ammo;
    else 
      this.ammo += weapon.ammo;
    this.weapon = weapon;
    this.updateAmmoLabel(this.ammo);
  }

  updateConsumible(consumable){
    if (this.life < 6) {
        this.scene.sound.play('pickup', { volume: 0.3 });
        this.life += consumable.life;
      }
  }
  loseLife() {
    this.scene.sound.play('damaged', { volume: 0.7 } );
    --this.life;
  }

  updateAmmoLabel(ammo){
    if(this.weapon !== undefined)
      this.labelAmmo.text = "Ammo: " + ammo;
    else
      this.labelAmmo.text = "Ammo: ∞";
  }

  restAmmo(){
    if(this.weapon != undefined){
      this.ammo--;
      if(this.ammo === 0){
        this.weapon = undefined;
        this.ammo = undefined;
        this.bulletDamage = this.defaultbulletDamage;
        this.bulletVelocity = this.defaultbulletVelocity
        this.textureBullet = "bullet";
      }
      this.updateAmmoLabel(this.ammo);
    }
  }

  shootAnimation(){
    this.anims.play('mike_idle_shoot', true).setFlipX(false);

  }

  updateScore(enemyScore) {
    this.score += enemyScore;
    this.labelScore.text = "Score: " + this.score;
  }


  // Para el movimiento del jugador
  handleControls() {
    this.keyboardControls = {
      movementControl: () => {
        if (this.body.onFloor()) { // Si está en el suelo
          if (this.cursors.down.isDown) { // Y está agachado
            this.body.setVelocityX(0);
            if(!this.isShooting)
              this.anims.play('mikeIsDown', true);
            else {
              if (this.textureBullet === "bullet") {
                this.anims.play('mikeIsDownShoot', true);
              }
              else if (this.weapon.name == "m16") {
                this.anims.play('mikeIsDownM16', true);
              } else if (this.weapon.name == "rifle") {
                this.anims.play('mikeIsDownAK', true);
              }
              this.once('animationcomplete', () =>{ 
                this.isShooting = false;
              });
            }
          } else if (this.cursors.right.isDown) { // Player se mueve a la derecha
            this.direction = "right";
            this.body.setVelocityX(this.speed);
            if (this.textureBullet == "bullet") {
              this.anims.play('mike_run', true).setFlipX(false);
            } else if (this.weapon.name == "m16") {
              this.anims.play('mike_run_m16', true).setFlipX(false);
            } else if (this.weapon.name == "rifle") {
              this.anims.play('mike_run_ak', true).setFlipX(false);
            }
          } else if (this.cursors.left.isDown) { // Player se mueve a la izquierda
            this.direction = "left";
            this.body.setVelocityX(-this.speed);
            if (this.textureBullet == "bullet") {
              this.anims.play('mike_run', true).setFlipX(true);
            } else if (this.weapon.name == "m16") {
              this.anims.play('mike_run_m16', true).setFlipX(true);
            } else if (this.weapon.name == "rifle") {
              this.anims.play('mike_run_ak', true).setFlipX(true);
            }
          } else { // Player está quieto
            this.body.setVelocityX(0);
            if(!this.isShooting)
              this.anims.play('mike_idle', true);
            else {
              if (this.textureBullet === "bullet") {
                this.anims.play('mike_idle_shoot', true);
                this.once('animationcomplete', () =>{ 
                this.isShooting = false;
              });
              }
              else if (this.weapon.name == "m16") {
                console.log("m16_bullet");
                this.anims.play('mike_idle_m16', true);
                this.once('animationcomplete', () =>{ 
                this.isShooting = false;
              });
              }
              else if (this.weapon.name == "rifle") {
                console.log("Animacionnnnnn riffle_bullet");
                this.anims.play('mike_idle_ak', true);
                this.once('animationcomplete', () =>{ 
                this.isShooting = false;
              });
              }
              
            }
          }
          // Control de salto
          if (Phaser.Input.Keyboard.JustDown(this.cursors.spacebar)) { // Si la tecla de espacio se presiona
            this.body.setVelocityY(this.jumpSpeed);
            this.scene.sound.play('jump', { volume: 0.3 });
            if (this.textureBullet == "bullet") {
              this.anims.play('mike_jump', true);
            } else if (this.weapon.name == "m16") { 
              this.anims.play('mike_jump_m16', true);
            }
            else if (this.weapon.name == "rifle") {
              this.anims.play('mike_jump_ak', true);
            }
          }
        } else if (this.body.velocity.y < 0) { // Si está saltando (subiendo verticalmente)
          if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
          } else if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
          }
        } else { // Si ha terminado el salto (bajando verticalmente)
          this.anims.play('mike_fall', true);
          const airResistance = 0.989; // Factor de resistencia del aire
          if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.fallSpeed * airResistance);
          } else if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.fallSpeed *  airResistance);
          }
        }
      },
      
      dashControl: () => {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.shift) && this.canDash) {
          this.initDash();
          this.scene.sound.play('dash');
          this.play('mikeDash', true);
        }
      },

    }
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t, dt) {
    super.preUpdate(t, dt);
    this.setTint(0xffffff);

    if (!this.isDashing) {
      this.controls.movementControl();
      this.controls.dashControl();
    }
  }

  initDash() {
    this.isDashing = true;
    this.canDash = false;
    if (this.cursors.right.isDown) {   // Dash a la derecha
      this.body.setVelocityX(this.dashSpeed);
    }
    else if (this.cursors.left.isDown) {   // Dash a la izquierda
      this.body.setVelocityX(-this.dashSpeed);
    }
    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.canDash = true;
      }
    });
  }
}
