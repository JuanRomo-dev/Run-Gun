import Phaser from "phaser";

import base from "../assets/sprites/base.png";
import mike from "../assets/sprites/mike.png";
import platform from "../assets/sprites/platform.png";
import star from "../assets/sprites/star.png";
import t1000 from "../assets/sprites/t-1000.png";
import photonDestructor from "../assets/sprites/photondestructor.png";
import photonDestructor_running from "../assets/sprites/atlas_photonDestructor_running.png";
import photonDestructor_running_json from "../assets/sprites/atlas_photonDestructor_running.json";


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
    this.load.image("platform", platform);
    this.load.image("base", base);
    this.load.image("star", star);
    this.load.image("player", mike);
    this.load.image("t-1000", t1000);
    this.load.image("photonDestructor", photonDestructor);

    this.load.atlas("photonDestructor_running", photonDestructor_running, photonDestructor_running_json);
    //this.load.spritesheet('photonDestructor_running', photonDestructor_running, { frameWidth: 40, frameHeight: 40 }); // Spritesheet de Mike corriendo

  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start("level");
  }
}
