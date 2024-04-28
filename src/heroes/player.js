import Phaser from 'phaser';

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  
  bulletVelocity = 600;
  life = 5;
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, "player");
    
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
    this.fallSpeed = 220;
    this.jumpSpeed = -350;
    this.dashSpeed = 500;
    
    // Estados del jugador
    this.isInAir = false;
    this.isDashing = false;
    this.canDash = true;
    
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.labelScore = this.scene.add.text(10, 10, "Score: 0");
    this.labelScore.setScrollFactor(0);
    this.lifeScore = this.scene.add.text(10, 30, "Life: 5");
    this.lifeScore.setScrollFactor(0);
    this.direction = "right"
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


  loseLife(){
    this.life--;
    this.lifeScore.text = "Life: " + this.life;
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
            this.anims.play('mikeIsDown', true);
          } else if (this.cursors.right.isDown) { // Player se mueve a la derecha
            this.direction = "right";
            this.body.setVelocityX(this.speed);
            this.anims.play('mike_run', true).setFlipX(false);
          } else if (this.cursors.left.isDown) { // Player se mueve a la izquierda
            this.direction = "left";
            this.body.setVelocityX(-this.speed);
            this.anims.play('mike_run', true).setFlipX(true);
          } else { // Player está quieto
            this.body.setVelocityX(0);
            this.anims.play('mike_idle', true);
          }
          // Control de salto
          if (Phaser.Input.Keyboard.JustDown(this.cursors.spacebar)) { // Si la tecla de espacio se presiona
            this.body.setVelocityY(this.jumpSpeed);
            this.anims.play('mike_jump', true);
          }
        } else if (this.body.velocity.y < 0) { // Si está saltando (subiendo verticalmente)
          if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
          } else if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
          }
        } else { // Si ha terminado el salto (bajando verticalmente)
          this.anims.play('mike_fall', true);
          if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.fallSpeed);
          } else if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.fallSpeed);
          }
        }
      },
      
      dashControl: () => {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.shift) && this.canDash) {
          this.initDash();
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
