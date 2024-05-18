import Phaser from 'phaser';
import { sceneEvents } from "../events/eventsCenter.js";

export default class Cook extends Phaser.GameObjects.Sprite {
    life = 250;
    score = 20;
    tickRate = 0.5;
    shootRate = 500; //milisegundos
    bulletVelocity = 230;
    textureBullet = "knife";
    /**
     * Constructor del enemigo
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.GameObjects.Sprite} player jugador
     */
    constructor(scene, player, x, y) {
        super(scene, x, y, "Cook");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, player);
        this.body.setCollideWorldBounds();
        this.speed = 200;
        this.jumpSpeed = -100;
        this.player = player;
        this.direction = "left";
        this.setScale(2, 2);
        this.activo = false;

        //Crea el puerta
        this.door = scene.physics.add.sprite(6505, 500, "doorOpen"); 
        this.door.setScale(1.5,2); 
        this.door.setSize(25,200);
        this.door.setOffset(0, -90);
        this.door.setDepth(0);
        this.scene.add.existing(this.door);
        this.scene.physics.add.existing(this.door); 
        this.door.body.setCollideWorldBounds();
        this.door.body.allowGravity = false;
        this.door.body.immovable = true;    
        this.scene.physics.add.collider(this.door, this);
    }

/**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del enemigo.
   * @override
   */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.body.setSize(28,51); // Mantener el mismo tamaño del colisionador
        this.setTint(0xffffff);

        if(Math.abs(this.player.x - this.x) < 400){ 
            this.activo = true;
            //cierra la puerta 
            this.scene.physics.add.collider(this.door, this.player);
            this.door.setTexture('doorClosed');
            this.door.setOffset(30, -90);
        }


        if(!this.activo){ //si el boss no esta activo
            this.body.setVelocityX(0);
            this.anims.play('cook_idle', true);
        }else{
            if(Math.abs(this.player.x - this.x) > 350){ //Si esta demasiado lejos del jugador

                if (this.player.x  < this.x) { //si el jugador está a la izquierda 
                    this.body.setVelocityX(-this.speed);
                    this.anims.play('cook_run', true).setFlipX(true); 
                }else if (this.player.x > this.x){ //si el jugador está a la derecha
                    this.body.setVelocityX(this.speed);
                    this.anims.play('cook_run', true).setFlipX(false); 
                }else{
                    this.body.setVelocityX(0);
                }
            }else if(Math.abs(this.player.x - this.x) < 300){ //Si esta demasiado cerca del jugador

                if (this.player.x  < this.x) { //si el jugador está a la izquierda 
                    this.body.setVelocityX(this.speed);
                    this.anims.play('cook_run', true).setFlipX(true); 
                }else if (this.player.x > this.x){ //si el jugador está a la derecha
                    this.body.setVelocityX(-this.speed);
                    this.anims.play('cook_run', true).setFlipX(false); 
                }else{
                    this.body.setVelocityX(0);
                }
            }else{
                this.body.setVelocityX(0);
                if (this.player.x  < this.x) { //si el jugador está a la izquierda
                    this.direction = "left"
                    this.anims.play('cook_atack', true).setFlipX(true);
                }else{ //si el jugador está a la derecha
                    this.direction = "right"
                    this.anims.play('cook_atack', true).setFlipX(false);
                    
                }
            }
            this.fire(t)
        }   
    }

    initBullets(bullets){
        this.bullets = bullets;
    }

    fire(time){
        if(time > this.tickRate){
            this.bullets.throwKnife(this);
            this.tickRate = time + this.shootRate;
        }
    }

    dead(scene){
        sceneEvents.emit('game-over');
        scene.scene.start("end");
        this.destroy();
    }

}
