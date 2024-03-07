import Phaser from "phaser"

export default class PhotonDestructor extends Phaser.GameObjects.Sprite {
    /**
     * Constructor del enemigo
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, player, x, y) {
        super(scene, x, y, "photonDestructor");
        this.score = 0;
        this.setScale(0.4,0.5);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, player);
        this.body.setCollideWorldBounds();
    }
}