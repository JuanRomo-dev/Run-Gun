import Phaser from 'phaser';
import PhotonDestructor from './photonDestructor';

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
      frameRate: 8,
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
    this.speed = 320;
    this.fallSpeed = 220;
    this.jumpSpeed = -350;
    this.dashSpeed = 500;
    
    // Estados del jugador
    this.isInAir = false;
    this.isDashing = false;
    this.canDash = true;
    
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.direction = "right"
    // Keys
    this.cursors = this.scene.input.keyboard.addKeys({
      spacebar: Phaser.Input.Keyboard.KeyCodes.SPACE,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      ctrl: Phaser.Input.Keyboard.KeyCodes.CTRL
    })
    
    this.handleControls();
    this.controls = this.keyboardControls;  
  }

  /**
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  point(score) {
    this.score += score;
    this.updateScore();
  }

  /**
   * Actualiza la UI con la puntuación actual
   */
  updateScore() {
    this.label.text = "Score: " + this.score;
  }

  // Para el movimiento del jugador
  handleControls() {// FORMA EN LA QUE PUEDE CAMBAIR DE DIRECCION EN EL AIRE
    this.keyboardControls = {
      movementControl: () => {
        if (this.body.onFloor()) { // Si está en el suelo
          if (this.cursors.down.isDown) { // Y está agachado
            this.anims.play('mikeIsDown', true);
            this.body.setVelocityX(0);
            this.body.setSize(19, 28,false);
            if(this.direction=="left"){
              this.body.setOffset(6, 6); // Ajustar la posición del hitbox desde la parte inferior del sprite

            }
            else{
              this.body.setOffset(8.5, 6); // Ajustar la posición del hitbox desde la parte inferior del sprite

            }
          }else if (this.cursors.right.isDown) { 
            this.body.setSize(19, 34,false);// Player se mueve a la derecha
            
            this.direction = "right";
            this.body.setVelocityX(this.speed);
            this.anims.play('mike_run', true).setFlipX(false);
            this.body.setOffset(8, 0);
          } else if (this.cursors.left.isDown) {
            this.body.setSize(19, 34,false); // Player se mueve a la izquierda
            this.direction = "left";
            this.body.setVelocityX(-this.speed);
            this.anims.play('mike_run', true).setFlipX(true);
            this.body.setOffset(8, 0);
          } else { // Player está quieto
            this.body.setSize(19, 34,false);
            this.body.setVelocityX(0);
            this.anims.play('mike_idle', true);
          
            this.body.setOffset(8,0);
          }
          // Control de salto
          if (Phaser.Input.Keyboard.JustDown(this.cursors.spacebar)) { // Si la tecla de espacio se presiona
            this.body.setVelocityY(this.jumpSpeed);
            this.anims.play('mike_jump', true);
          }
        } else { // Si está en el aire
          const airResistance = 0.989; // Factor de resistencia del aire
          this.body.setVelocityX(this.body.velocity.x * airResistance);
          // Cambiar de dirección en el aire sin cambiar la velocidad
          if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.direction = "left";
            this.body.setVelocityX(-Math.abs(this.body.velocity.x)); // Cambia la dirección sin cambiar la magnitud de la velocidad
            this.anims.play('mike_jump', true).setFlipX(true);
          } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.direction = "right";
            this.body.setVelocityX(Math.abs(this.body.velocity.x)); // Cambia la dirección sin cambiar la magnitud de la velocidad
            this.anims.play('mike_jump', true).setFlipX(false);
          }
        }
      },
  
  
      
      dashControl: () => {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.ctrl) && this.canDash) {
          this.initDash();
          this.play('mikeDash', true);
        }
      },
    };
  }/*
  handleControls() { //Esta opcion es para que el personaje no pueda cambiar de direccion en el salto y simplemente se vaya frenando si sigue en la direccion del salto y si no que se detenga
    this.keyboardControls = {
      movementControl: () => {
        if (this.body.onFloor()) { // Si está en el suelo
          if (this.cursors.down.isDown) { // Y está agachado
            this.anims.play('mikeIsDown', true);
            this.body.setVelocityX(0);
            this.body.setSize(19, 28,false);
            if(this.direction=="left"){
              this.body.setOffset(6, 6); // Ajustar la posición del hitbox desde la parte inferior del sprite

            }
            else{
              this.body.setOffset(8.5, 6); // Ajustar la posición del hitbox desde la parte inferior del sprite

            }
           } else if (this.cursors.right.isDown) { 
            this.body.setSize(19, 34,false);// Player se mueve a la derecha
            
            this.direction = "right";
            this.body.setVelocityX(this.speed);
            this.anims.play('mike_run', true).setFlipX(false);
            this.body.setOffset(8, 0);
          } else if (this.cursors.left.isDown) {
            this.body.setSize(19, 34,false); // Player se mueve a la izquierda
            this.direction = "left";
            this.body.setVelocityX(-this.speed);
            this.anims.play('mike_run', true).setFlipX(true);
            this.body.setOffset(8, 0);
          } else { // Player está quieto
            this.body.setSize(19, 34,false);
            this.body.setVelocityX(0);
            this.anims.play('mike_idle', true);
          
            this.body.setOffset(8,0);
          }
          // Control de salto
          if (Phaser.Input.Keyboard.JustDown(this.cursors.spacebar)) { // Si la tecla de espacio se presiona
            this.body.setVelocityY(this.jumpSpeed);
            this.body.jumpStartVelocityX = this.body.velocity.x; // Guarda la velocidad horizontal al comenzar el salto
            this.anims.play('mike_jump', true);
            this.body.jumpDirection = this.direction; // Guarda la dirección del salto
          }
        } else { // Si está en el aire
          if (this.body.velocity.x !== 0) {
            const minVelocity = 50;
            const dragFactor = 0.99;

            this.body.setVelocityX(this.body.velocity.x * dragFactor);

            if (Math.abs(this.body.velocity.x) < minVelocity) {
              this.body.setVelocityX(minVelocity * Math.sign(this.body.velocity.x));
            }
          }

          if (this.body.jumpDirection === "left" && this.cursors.right.isDown && this.body.velocity.x < 0) {
            this.body.setVelocityX(this.body.velocity.x * 0.95);
          } else if (this.body.jumpDirection === "right" && this.cursors.left.isDown && this.body.velocity.x > 0) {
            this.body.setVelocityX(this.body.velocity.x * 0.95);
          }
        }
      },

      dashControl: () => {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.ctrl) && this.canDash) {
          this.initDash();
          this.play('mikeDash', true);
        }
      },
    };
  }*/

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
