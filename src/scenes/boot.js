import Phaser from 'phaser';

import enemy_bullet from "../../assets/img/enemy_bullet.png";
import logo_estudio from "../../assets/img/logo_estudio.png";
import m16 from "../../assets/img/m16.png";
import m16_bullet from "../../assets/img/m16_bullet.png";
import rifle from "../../assets/img/rifle.png";
import rifle_bullet from "../../assets/img/rifle_bullet.png";
import thunder from "../../assets/img/thunder.png";
import map from '../../assets/maps/rungun.json';
import bullet from '../../assets/sprites/bullet.png';
import mike_dash from '../../assets/sprites/Dash.png';
import mike_idle_shoot from "../../assets/sprites/idle_shooting.png";
import mike_jump from '../../assets/sprites/Jump2.png';
import mike_down from '../../assets/sprites/mike_down.png';
import mike_fall from '../../assets/sprites/mike_fall.png';
import mike_idle from '../../assets/sprites/mike_idle.png';
import mike_idle2 from '../../assets/sprites/mike_idle2.png';
import mike_running from '../../assets/sprites/mike_running.png';
import mike_running_shoot from "../../assets/sprites/mike_running_shooting.png";
import mike_is_down from '../../assets/sprites/mikeIsDown.png';
import photonDestructor from '../../assets/sprites/photonDestructor.png';
import photonDestructor_atlas_png from '../../assets/sprites/photondestructor/photondestructor.png';
import photonDestructor_animacion from '../../assets/sprites/photondestructor/photondestructor_anim.json';
import photonDestructor_atlas from '../../assets/sprites/photondestructor/photondestructor_atlas.json';
import mike_is_down_shoot from "../../assets/sprites/Sitdown_shooting.png";
import spiderdron from '../../assets/sprites/spiderdron.png';
import spiderdron_atlas_png from '../../assets/sprites/spiderdron/spiderdron.png';
import spiderdron_animacion from '../../assets/sprites/spiderdron/spiderdron_anim.json';
import spiderdron_atlas from '../../assets/sprites/spiderdron/spiderdron_atlas.json';
import t1000 from '../../assets/sprites/t-1000.png';
import t1000_atlas_png from '../../assets/sprites/t1000/t1000.png';
import t1000_animacion from '../../assets/sprites/t1000/t1000_anim.json';
import t1000_atlas from '../../assets/sprites/t1000/t1000_atlas.json';
import bricks from '../../assets/tilesets/bricks.png';
import decorations from '../../assets/tilesets/Decorations.png';
import ware from '../../assets/tilesets/House-kitchen.png';
import tables from '../../assets/tilesets/Living Room.png';
import fondos from '../../assets/tilesets/Terrain.png';
import btn_restart from "../../assets/ui/btn_restart.png";
import btn_start from "../../assets/ui/btn_start.png";
import ui_heart_empty from "../../assets/ui/ui_heart_empty.png";
import ui_heart_full from "../../assets/ui/ui_heart_full.png";
import cook from '../../assets/sprites/cook.png';
import cook_atlas_png from '../../assets/sprites/cook/cook.png';
import cook_animacion from '../../assets/sprites/cook/cook_anim.json';
import cook_atlas from '../../assets/sprites/cook/cook_atlas.json';
import doorOpen from '../../assets/sprites/doorOpen.png';
import doorClosed from '../../assets/sprites/doorClosed.png';
const level1 = require("url:../../assets/music/level1.wav");
const photonDeath = require("url:../../assets/sounds/photonDeath.mp3");
const t1000Death = require("url:../../assets/sounds/t-1000Death.wav");
const disparoPistola = require("url:../../assets/sounds/disparoPistola.mp3");
const disparoM16 = require("url:../../assets/sounds/disparoM16.wav");
const disparoAK = require("url:../../assets/sounds/ak47-shot.wav");

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

    // Cargar el mapa y las imágenes de los tilesets
    this.load.tilemapTiledJSON('rungun', map);
    this.load.image('tiles1', fondos);
    this.load.image('tiles2', bricks);
    this.load.image('tiles3', decorations);
    this.load.image('tiles4', ware);
    this.load.image('tiles5', tables);

    
    // Cargar spritesheet
    this.load.spritesheet('mikeIdle', mike_idle, { frameWidth: 33, frameHeight: 35 });    // Spritesheet de Mike quieto

    this.load.spritesheet('mikeIdleShoot', mike_idle_shoot, { frameWidth: 33, frameHeight: 35 })

    this.load.spritesheet('mikeJump', mike_jump, { frameWidth: 33, frameHeight: 35 });    // Spritesheet de Mike saltando

    this.load.spritesheet('mike', mike_running, { frameWidth: 33, frameHeight: 35 }); // Spritesheet de Mike corriendo

    this.load.spritesheet('mikeRunShot', mike_running_shoot, { frameWidth: 33, frameHeight: 35 })

    this.load.spritesheet('mikeIdle2', mike_idle2, { frameWidth: 33, frameHeight: 35 });  

    this.load.spritesheet('mikeFall', mike_fall, { frameWidth: 33, frameHeight: 35 });    // Spritesheet de Mike cayendo

    this.load.spritesheet('mikeDown', mike_down, { frameWidth: 33, frameHeight: 35 });    // Spritesheet de Mike agachandose

    this.load.spritesheet('mikeIsDown', mike_is_down, { frameWidth: 33, frameHeight: 35 });    // Spritesheet de Mike ya agachado

    this.load.spritesheet("mikeIsDownShoot", mike_is_down_shoot, { frameWidth: 33, frameHeight: 35 })

    this.load.spritesheet('mikeDash', mike_dash, { frameWidth: 33, frameHeight: 35 });
    
    this.load.audio('level1', level1);
    
    this.load.audio('photonDeath', photonDeath);
    
    this.load.audio('t1000Death', t1000Death);
    
    this.load.audio('disparoPistola', disparoPistola);
    
    this.load.audio('disparoM16', disparoM16);
    
    this.load.audio('disparoAK47', disparoAK);
    
    // Carga de los assets del photon destructor
    this.load.image("photonDestructor", photonDestructor);
    this.load.json("photonDestructor_anim", photonDestructor_animacion);
    this.load.atlas("photondestructor", photonDestructor_atlas_png, photonDestructor_atlas);

    // Carga de los assets del spiderdron
    this.load.image("spiderDron", spiderdron);
    this.load.json("spiderdron_anim", spiderdron_animacion);
    this.load.atlas("spiderdron", spiderdron_atlas_png, spiderdron_atlas);

    // Carga de los assets del t1000
    this.load.image("T1000", t1000);
    this.load.json("t1000_anim", t1000_animacion);
    this.load.atlas("t1000", t1000_atlas_png, t1000_atlas);

    // Carga de los assets del cook
    this.load.image("Cook", cook);
    this.load.json("cook_anim", cook_animacion);
    this.load.atlas("cook", cook_atlas_png, cook_atlas);


    // Carga de los assets de la puerta
    this.load.image("doorOpen", doorOpen);
    this.load.image("doorClosed", doorClosed);
    

    this.load.image('ui-heart-empty', ui_heart_empty)
		this.load.image('ui-heart-full', ui_heart_full)
    this.load.image('logo', logo_estudio);
    this.load.image("btn_start",btn_start)
    this.load.image("btn_restart", btn_restart)

    //Carga de los assets de weapons
    this.load.image('rifle', rifle);
    this.load.image('m16', m16);
    this.load.image('thunder', thunder);
    this.load.image("bullet", bullet);
    this.load.image("enemy_bullet", enemy_bullet);
    this.load.image("m16_bullet", m16_bullet);
    this.load.image("rifle_bullet", rifle_bullet);
    
  }

  create() {
    let image = this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2, 'logo');
    image.setAlpha(0); 
    image.setScale(0.5);

    this.tweens.add({
      targets: image,
      alpha: 1,
      duration: 2500,
      ease: 'Linear',
      yoyo: true,
      onComplete: () => { 
        this.scene.start("start");
      }
    });
  }
}
