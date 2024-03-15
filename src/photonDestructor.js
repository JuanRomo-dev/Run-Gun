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
        this.setScale(3,3);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, player);
        this.body.setCollideWorldBounds();
        this.speed = 100;
        this.jumpSpeed = -100;
        this.player = player;
    }

/**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del enemigo.
   * @override
   */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.player.x  < this.x) { //si el jugador está a la izquierda 
            this.body.setVelocityX(-this.speed);
            this.anims.play('photonDestructor_running', true).setFlipX(true); 
        }else if (this.player.x > this.x){ //si el jugador está a la derecha
            this.body.setVelocityX(this.speed);
            this.anims.play('photonDestructor_running', true).setFlipX(false); 
        }else{
            this.body.setVelocityX(0);
        }
    }

}
