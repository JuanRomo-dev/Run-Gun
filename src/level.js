import Phaser from 'phaser';

import Bullets from './bullet.js';
import EnemyGruop from './enemyGroup.js';
import Platform from './platform.js';
import Player from './player.js';
import T1000 from './t-1000.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas.
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella.
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  enemies = [];

  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: "level" });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    this.bases = this.add.group();
    this.player = new Player(this, 200, 300);
    //new PhotonDestructor(this, this.player, 300, 100);

    this.bullets = new Bullets(this);
    new Platform(this, this.player, this.bases, 150, 450);
    new Platform(this, this.player, this.bases, 1050, 450);
    new Platform(this, this.player, this.bases, 600, 300);
    new Platform(this, this.player, this.bases, 150, 200);
    new Platform(this, this.player, this.bases, 1050, 200);

    this.enemies.push(new T1000(this, this.player, 450, 100));
    this.enemies.push(new T1000(this, this.player, 800, 160));
    this.enemyGroup = new EnemyGruop(this, this.enemies);

    this.spaceDown = this.input.keyboard.addKey("SPACE");
    this.spaceDown.on(
      "down",
      function () {
        this.bullets.fireBullet(this.player);
      },
      this
    );

    this.enemies.forEach((e) => {
      this.physics.add.overlap(this.bullets, e, this.hitEnemy, null, this);
    });

  }

  hitEnemy(bullets, enemy) {
    enemy.life -= bullets.damage;
    console.log("🚀 ~ Level ~ hitEnemy ~  enemy.life:", enemy.life);

    if (enemy.life <= 0) {
      this.player.point(enemy.score)
      enemy.destroy();
    }
    bullets.destroy();
    return false;
  }
}
