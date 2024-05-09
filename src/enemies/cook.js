import Phaser from 'phaser';
import { sceneEvents } from "../events/eventsCenter.js";

export default class Cook extends Phaser.GameObjects.Sprite {
    life = 20;
    score = 20;
    tickRate = 0.5;
    shootRate = 1000; //milisegundos
    bulletVelocity = 400;
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
        this.speed = 100;
        this.jumpSpeed = -100;
        this.player = player;
        this.direction = "left";
        this.setScale(2, 2);
        this.activo = false;

    }

/**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del enemigo.
   * @override
   */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.body.setSize(28,51); // Mantener el mismo tamaño del colisionador
        //this.body.setOffset(4,0); // Mantener el mismo desplazamiento del colisionador
        //this.setTint(0xffffff);

        if(Math.abs(this.player.x - this.x) < 400){
            this.activo = true;
            



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
            }else{
                this.body.setVelocityX(0);
                if (this.player.x  < this.x) { //si el jugador está a la izquierda
                    this.anims.play('cook_atack', true).setFlipX(true);
                    //this.body.setSize(23,34); // Mantener el mismo tamaño del colisionador
                    //this.body.setOffset(21.5,0); // Mantener el mismo desplazamiento del colisionador
                    this.fire(t)
                }else{ //si el jugador está a la derecha
                    this.direction = "right"
                    this.anims.play('cook_atack', true).setFlipX(false);
                    //this.body.setSize(23,34); // Mantener el mismo tamaño del colisionador
                    //this.body.setOffset(6,0); // Mantener el mismo desplazamiento del colisionador
                    this.fire(t)
                }
            }
        }   
    }

    initBullets(bullets){
        this.bullets = bullets;
    }

    fire(time){
        if(time > this.tickRate){
            this.bullets.fireBullet(this);
            this.tickRate = time + this.shootRate;
        }
    }

    dead(scene){
        sceneEvents.emit('game-over')
        scene.scene.start("end")
        this.destroy();
    }

}
