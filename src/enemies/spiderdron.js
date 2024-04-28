import Phaser from 'phaser';

export default class Spiderdron extends Phaser.GameObjects.Sprite {
    life = 5;
    score = 20;
    /**
     * Constructor del enemigo
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.GameObjects.Sprite} player jugador
     */
    constructor(scene, player, x, y) {
        super(scene, x, y, "spiderDron");
        this.setScale(1,1);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);  
        this.body.setCollideWorldBounds();
        this.speed = 200;
        this.jumpSpeed = -100;
        this.player = player;
        this.direccion = false;

    }



    

/**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del enemigo.
   * @override
   */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if(this.life <= 0){
            this.anims.play('spiderdron_dead', true);
        }else if(this.player.y + 20< this.y){ //si el jugador esta arriba
            this.body.setVelocityX(0);
            this.anims.play('spiderdron_idle', true);
        }else{

            let movimiento = this.speed;
            if (this.player.x  < this.x) { //si el jugador está a la izquierda 
                movimiento = -this.speed;
                this.direccion = true;
            }else if (this.player.x > this.x){ //si el jugador está a la derecha
                movimiento = this.speed;
                this.direccion = false;
            }


            if(Math.abs(this.player.x - this.x) > 70){ //Si esta demasiado lejos del jugador
                this.body.setVelocityX(movimiento);
                this.anims.play('spiderdron_run', true).setFlipX(this.direccion); 
            }else{
                this.body.setVelocityX(0);
                this.anims.play('spiderdron_atack', true).setFlipX(this.direccion);
            }
        }   

    }

}
