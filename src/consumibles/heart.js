import Phaser from 'phaser';

export default class Heart extends Phaser.GameObjects.Sprite {
    life = 1;
    name = "heart";

    constructor(scene, x, y) {
        super(scene, x, y, "ui-heart-full");
        this.setScale(3,3);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
    }       


}