import Phaser from "phaser";

import Platform from "./platform.js";
import Player from "./player.js";
import T1000 from "./t-1000.js";

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas.
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella.
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
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
    this.stars = 10;
    this.bases = this.add.group();

    // Establecer ciclos de animación

    this.anims.create({     // Animación de Mike quieto
      key: 'mike_idle',
      frames: this.anims.generateFrameNumbers('mikeIdle', { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'mike_jump',
      frames: this.anims.generateFrameNumbers('mikeJump', { start: 0, end: 3 }),
      frameRate: 6
    })

    this.anims.create({
      key: 'mike_idle2',
      frames: this.anims.generateFrameNumbers('mikeIdle2', { start: 0, end: 5 }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({           // Animación de Mike corriendo
      key: 'mike_run',
      frames: this.anims.generateFrameNumbers('mike', { start: 0, end: 5 }),
      frameRate: 9,
      repeat: -1    // Para que se repita el ciclo;
    })

    this.anims.create({
      key: 'mike_fall',
      frames: this.anims.generateFrameNumbers('mikeFall', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: -1
    })

    this.anims.create({
      key: 'mike_crouching',
      frames: this.anims.generateFrameNumbers('mikeCrouching', { start: 0, end: 2 }),
      frameRate: 3,
      repeat: -1
    })

    this.player = new Player(this, 300, 300);

    new T1000(this, this.player, 400, 100);
    new Platform(this, this.player, this.bases, 150, 450);
    new Platform(this, this.player, this.bases, 1050, 450);
;
    new Platform(this, this.player, this.bases, 150, 200);
    new Platform(this, this.player, this.bases, 1050, 200);
    this.spawn();
  }

  /**
   * Genera una estrella en una de las bases del escenario
   * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
   * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
   */
  spawn(from = null) {
    Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
  }

  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
  starPickt(base) {
    this.player.point();
    if (this.player.score == this.stars) {
      this.scene.start("end");
    } else {
      let s = this.bases.children.entries;
      this.spawn(s.filter((o) => o !== base));
    }
  }
}
