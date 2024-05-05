import Phaser from 'phaser';

export default class EnemyGroup extends Phaser.GameObjects.Group {
  constructor(scene, enemies, player, enemyBullets) {
    super(scene);
    this.addMultiple(enemies);

    this.getChildren().forEach((enemy) => {
      enemy.initBullets(enemyBullets);

      scene.physics.add.overlap(
        scene.bullets,
        enemy,
        scene.hitEnemy,
        null,
        scene
      );

      scene.physics.add.overlap(
        enemyBullets,
        player,
        scene.hitPlayer,
        null,
        scene
      );
    });
  }
}
