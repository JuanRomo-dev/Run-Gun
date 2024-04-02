import Phaser from "phaser";

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
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
      frameRate: 5,
      repeat: 0
    })
    
    this.on('animationcomplete', end => {
      if (this.anims.currentAnim.key === 'mikeDash') {
        this.isDashing = false;
      }
    });
    
    this.score = 0;
    this.setScale(3, 3);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.body.setSize(33, 36);
    this.idleTime = null;
    
    // Datos del jugador
    this.speed = 300;
    this.fallSpeed = 300;
    this.jumpSpeed = -400;
    this.dashSpeed = 400;
    
    // Estados del jugador
    this.isInAir = false;
    this.isDashing = false;
   
    
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.cursors = this.scene.input.keyboard.addKeys({
      spacebar: Phaser.Input.Keyboard.KeyCodes.SPACE,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      ctrl: Phaser.Input.Keyboard.KeyCodes.CTRL
    })
    this.updateScore();
      this.on('animationcomplete-mikeDash', function() {
      // Restablecer la velocidad del jugador a su valor normal
      this.body.setVelocityX(this.speed); // Ajusta esto según tu lógica
      this.isDashing = false; // Reiniciar el indicador de dash
    }, this);
  }

  /**
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  point() {
    this.score++;
    this.updateScore();
  }

  /**
   * Actualiza la UI con la puntuación actual
   */
  updateScore() {
    this.label.text = "Score: " + this.score;
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t, dt) {
    super.preUpdate(t, dt);


    if (this.body.onFloor() ) {   // Si está en el suelo
      if (this.body.velocity.x === 0) {     // Y está quieto
        if (this.cursors.down.isDown) {    // Y está agachado
          console.log("down")
          this.anims.play('mikeIsDown', true);
        }
        else {
          this.anims.play('mike_idle', true);
        }
      }
      
      if (this.cursors.right.isDown) {    // Y se mueve a la derecha
        if (this.cursors.ctrl.isDown && !this.isDashing) {   // Y realiza un Dash
          this.isDashing = true;
          this.body.setVelocityX(this.speed * 1.5);
          this.anims.play('mikeDash', true);  
        }
        else if (this.cursors.spacebar.isDown) {    // Y está saltando
          this.anims.stop('mike_run', true);
          this.body.setVelocityY(this.jumpSpeed);
          this.anims.play('mike_jump', true);
        }
        else {
          this.body.setVelocityX(this.speed);
          this.anims.play('mike_run', true).setFlipX(false);
        }
      }
      else if (this.cursors.left.isDown) {    // Y se mueve a la izquierda
        if (this.cursors.ctrl.isDown && !this.isDashing) {   // Y realiza un Dash
          this.isDashing = true;
          this.body.setVelocityX(-this.speed * 1.5);
          this.anims.play('mikeDash', true).setFlipX(true);  
        }
        else if (this.cursors.spacebar.isDown) {   // Y está saltando
          this.anims.stop('mike_run', true);
          this.body.setVelocityY(this.jumpSpeed);
          this.anims.play('mike_jump', true);
          
        }
        else {    // No está saltando
          this.body.setVelocityX(-this.speed);
          this.anims.play('mike_run', true).setFlipX(true); 
        }
      }
      else if (this.cursors.spacebar.isDown) {    // Está saltando
        this.body.setVelocityY(this.jumpSpeed);
        this.anims.play('mike_jump', true);

      }
      else {
        this.body.setVelocityX(0);
      }
    }
    else if (this.body.velocity.y < 0) {    // Si está saltando (es decir, está subiendo verticalmente)
      if (this.cursors.right.isDown) {
        this.body.setVelocityX(this.speed);
      }
      else if (this.cursors.left.isDown) {
        this.body.setVelocityX(-this.speed);
      
      }
    }
    else {    // Si ha tarminado el salto (es decir, está cayendo verticalmente)
      this.anims.play('mike_fall', true);
      if (this.cursors.right.isDown) {
        this.body.setVelocityX(this.fallSpeed);
      }
      else if (this.cursors.left.isDown) {
        this.body.setVelocityX(-this.fallSpeed);
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.ctrl) && !this.isDashing) {
      this.isDashing = true;
      this.scene.time.delayedCall(500, () => {
        this.isDashing = false;
      });
    }
  }
}
