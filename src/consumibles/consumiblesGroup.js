import Phaser from 'phaser';

export default class ConsumiblesGroup extends Phaser.GameObjects.Group {
  constructor(scene, consumibles, player) {
    super(scene);
    this.addMultiple(consumibles);

    this.getChildren().forEach((consumible) => {
      scene.physics.add.overlap(
        consumible,
        player,
        scene.hitConsumible,
        null,
        scene
      );
    });
  }
}
