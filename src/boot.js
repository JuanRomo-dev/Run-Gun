import Phaser from "phaser";

import base from "../assets/sprites/base.png";
import mike from "../assets/sprites/mike.png";
import platform from "../assets/sprites/platform.png";
import star from "../assets/sprites/star.png";
import t1000 from "../assets/sprites/t-1000.png";
import mike_running from "../assets/sprites/mike_running.png";
import mike_idle from "../assets/sprites/mike_idle.png";
import mike_idle2 from "../assets/sprites/mike_idle2.png";
import mike_jump from "../assets/sprites/mike_jump.png";
import mike_fall from "../assets/sprites/mike_fall.png";

/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: "boot" });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath("assets/sprites/");

    // Cargar spritesheet
    this.load.spritesheet('mikeIdle', mike_idle, { frameWidth: 33, frameHeight: 35 });    // Spritesheet de Mike quieto

    this.load.spritesheet('mikeJump', mike_jump, { frameWidth: 33, frameHeight: 35 });    // Spritesheet de Mike saltando

    this.load.spritesheet('mike', mike_running, { frameWidth: 33, frameHeight: 35 }); // Spritesheet de Mike corriendo

    this.load.spritesheet('mikeIdle2', mike_idle2, { frameWidth: 33, frameHeight: 35 });

    this.load.spritesheet('mikeFall', mike_fall, { frameWidth: 33, frameHeight: 35 })

    this.load.image("platform", platform);
    this.load.image("base", base);
    this.load.image("star", star);
    this.load.image("t-1000", t1000);
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start("level");
    
  }
}
