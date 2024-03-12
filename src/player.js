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
    this.score = 0;
    this.setScale(3, 3);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.body.setSize(33, 36);
    this.speed = 300;
    this.fallSpeed = 200;
    this.jumpSpeed = -400;
    this.isInAir = false;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.cursors = this.scene.input.keyboard.addKeys({
      spacebar: Phaser.Input.Keyboard.KeyCodes.SPACE,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    })
    this.updateScore();
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


    if (this.body.onFloor()) {   // Si está en el suelo
      if (this.body.velocity.x === 0) {     // Y está quieto
        this.anims.play('mike_idle', true);
      }
      if (this.cursors.down.isDown) {    // Y está agachado
        this.anims.play('mike_crouching');
      }
      if (this.cursors.right.isDown) {    // Y se mueve a la derecha
        this.body.setVelocityX(this.speed);
        this.anims.play('mike_run', true);
      }
      else if (this.cursors.left.isDown) {    // Y se mueve a la izquierda
        this.body.setVelocityX(-this.speed);
        this.anims.play('mike_run', true).setFlipX(true);
      }
      else if (this.cursors.spacebar.isDown) {    // Y está saltando
        this.body.setVelocityY(this.jumpSpeed);
        this.anims.play('mike_jump', true);
      }
    } else {    // Si está en el aire
      
    }


    if (!this.body.onFloor()) {
      this.isInAir = true;
      this.anims.play('mike_fall', true);
      if (this.cursors.right.isDown) {
        this.body.setVelocityX(this.fallSpeed);
      }
      else if (this.cursors.left.isDown) {
        this.body.setVelocityX(-this.fallSpeed);
      }
    }
    else {    // Si está en el suelo
      if(this.cursors.down.isDown) {
        this.anims.play('mike_crouching', true);
      } 
    }
    if (this.cursors.spacebar.isDown && !this.isInAir) {
      this.isInAir = true;
      this.body.setVelocityY(this.jumpSpeed);
      this.anims.play('mike_jump', true);
    }
    if (this.cursors.left.isDown && this.body.onFloor()) {
      this.body.setVelocityX(-this.speed);
      this.anims.play('mike_run', true).setFlipX(true);
    } else if (this.cursors.right.isDown && this.body.onFloor()) {
      this.body.setVelocityX(this.speed);
      this.anims.play('mike_run', true).setFlipX(false);
    } else {
      if (this.body.onFloor()) {
        this.body.setVelocityX(0);
        this.anims.play('mike_idle', true);
      }
    }
    if (this.body.onFloor()) {
      this.isInAir = false;
    }
  }
}
