import Phaser from "phaser"

export default class PhotonDestructor extends Phaser.GameObjects.Sprite {
    /**
     * Constructor del enemigo
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.GameObjects.Sprite} player jugador
     */
    constructor(scene, player, x, y) {
        super(scene, x, y, "photonDestructor");
        this.score = 0;
        this.setScale(0.4,0.5);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, player);
        this.body.setCollideWorldBounds();
        this.speed = 100;
        this.jumpSpeed = -100;
        //this.body.setVelocityX(this.speed);
    }

/**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del enemigo.
   * @override
   */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        //this.body.setVelocityX(-this.speed);
        /*
        if (this.player.x < this.x) { falla aqui
            this.body.setVelocityX(-this.speed);
        }else if (this.player.x > this.x){
            this.body.setVelocityX(this.speed);
        }else{
            this.body.setVelocityX(0);
        }
        */
    }

}