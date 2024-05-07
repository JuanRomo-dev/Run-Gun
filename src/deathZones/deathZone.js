import Phaser from 'phaser';

export default class DeathZone extends Phaser.GameObjects.Sprite {
    /**
     * Constructor del enemigo
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {Phaser.GameObjects.Sprite} player jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {number} w Ancho
     * @param {number} h Alto
     */
    constructor(scene, player, x, y, w, h) {
        super(scene, x, y, "deathZone", w, h);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(this, player);
        this.body.setCollideWorldBounds();
        this.player = player;
        this.width = w;
        this.height = h;
        this.body.setSize(w, h);
    }

    /**
       * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del enemigo.
       * @override
       */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
       
    }
};
    