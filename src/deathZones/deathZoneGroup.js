import Phaser from 'phaser';

export default class DeathZoneGroup extends Phaser.GameObjects.Group {
  constructor(scene, deathZones, player) {
    super(scene);
    this.addMultiple(deathZones);

      this.getChildren().forEach((death_zone) => {
          scene.physics.add.overlap(
              death_zone,
              player,
              scene.playerDeath,
              null,
              scene
          );
      });
  }
}