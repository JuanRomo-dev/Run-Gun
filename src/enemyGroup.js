import Phaser from "phaser";

export default class EnemyGroup extends Phaser.GameObjects.Group {
  constructor(scene, enemies) {
    super(scene);
    this.addMultiple(enemies);

    this.getChildren().forEach((enemy) => {
      scene.physics.add.overlap(
        scene.bullets,
        enemy,
        scene.hitEnemy,
        null,
        scene
      );
    });
  }
}
