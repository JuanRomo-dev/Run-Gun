import Phaser from "phaser";

import Boot from "./scenes/boot.js";
import End from "./scenes/end.js";
import GameUI from "./scenes/gameUI.js";
import Level from "./scenes/level.js";
import Start from "./scenes/start.js";
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1100,
    height: 640
  },
  pixelArt: true,
  scene: [Boot, Level, End, GameUI,  Start],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 450 },
      debug: false,
    },
  },
};

new Phaser.Game(config);
