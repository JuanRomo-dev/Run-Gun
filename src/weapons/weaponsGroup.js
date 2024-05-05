import Phaser from 'phaser';

export default class WeaponsGroup extends Phaser.GameObjects.Group {
  constructor(scene, weapons, player) {
    super(scene);
    this.addMultiple(weapons);

    this.getChildren().forEach((weapon) => {
      scene.physics.add.overlap(
        weapon,
        player,
        scene.hitWeapon,
        null,
        scene
      );
    });
  }
}
