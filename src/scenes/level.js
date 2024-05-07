import Phaser from 'phaser';

import Bullets from '../bullet.js';
import EnemyGruop from '../enemies/enemyGroup.js';
import PhotonDestructor from '../enemies/photonDestructor.js';
import DeathZone from '../deathZones/deathZone.js';
import DeathZoneGroup from '../deathZones/deathZoneGroup.js';
import T1000 from '../enemies/t-1000.js';
import { sceneEvents } from "../events/eventsCenter.js";
import Player from '../heroes/player.js';
export default class Level extends Phaser.Scene {
  enemies = [];
  weapons = [];
  deathZones = [];
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
    this.scene.run("game-ui")
    // Animaciones del photonDestructor
    this.photonDestructor_anim = this.cache.json.get("photonDestructor_anim");
    this.anims.fromJSON(this.photonDestructor_anim);

    // Animaciones del spiderdron
    this.spiderdron_anim = this.cache.json.get("spiderdron_anim");
    this.anims.fromJSON(this.spiderdron_anim);

    // Animaciones del t-1000
    this.t1000_anim = this.cache.json.get("t1000_anim");
    this.anims.fromJSON(this.t1000_anim);

    this.stars = 10;

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
      key: 'mikeDown',
      frames: this.anims.generateFrameNames('mikeDown', { start: 0, end: 2 }),
      frameRate: 4,
      repeat: 1
    })

    this.anims.create({
      key: 'mikeIsDown',
      frames: this.anims.generateFrameNames('mikeIsDown', { start: 0, end: 0 })
    })
 
    // Cargar mapa
    const mapa = this.map = this.make.tilemap({
      key: 'rungun'
    });
    // Cargar tilesets y capas
    const pared = mapa.addTilesetImage('escenario', 'tiles1');
    const suelo = mapa.addTilesetImage('fondo', 'tiles2');
    const decorations = mapa.addTilesetImage('decorations', 'tiles3');
    const utensilios = mapa.addTilesetImage('muebles', 'tiles4');
    const mesas = mapa.addTilesetImage('mesas', 'tiles5');
    
    
    this.paredLayer = this.map.createLayer('fondo', pared);
    this.sueloLayer = this.map.createLayer('suelo', [suelo, pared]);
    this.ventanasLayer = this.map.createLayer('ventanas', decorations);
    this.plataformasLayer = this.map.createLayer('plataformas', [utensilios, decorations]);
    this.mueblesLayer = this.map.createLayer('muebles', [mesas, utensilios]);
    this.mesasLayer = this.map.createLayer('mesas', mesas);
    this.spawnerLayer = this.map.getObjectLayer('spawnerLayer');
    this.deathLayer = this.map.getObjectLayer('deathLayer');
    
    console.log(this.spawnerLayer);
   
    this.player = new Player(this, 100, 510);
    
    
    // Movimiento cámara sobre el jugador
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    this.cameras.main.startFollow(this.player)
    
    // Bounds del nivel
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    
    // Colisión con el suelo
    this.sueloLayer.setCollisionBetween(0, 1000);
    this.physics.add.collider(this.player, this.sueloLayer);
    
    // Colisión con las plataformas
    this.plataformasLayer.setCollisionBetween(0, 1000);
    this.physics.add.collider(this.player, this.plataformasLayer);
    this.physics.add.collider(this.enemies, this.plataformasLayer);
    
    // Colisión con las mesas
    this.plataformasLayer.setCollisionBetween(0, 1000);
    this.physics.add.collider(this.player, this.mesasLayer);

    
    this.bullets = new Bullets(this);
    this.enemyBullets = new Bullets(this);

    // this.enemies.push(new T1000(this, this.player, 450, 100));
    this.enemies.push(new T1000(this, this.player, 1400, 160));
    this.enemies.push(new PhotonDestructor(this, this.player, 1500, 100));
    
    
    this.spawnerLayer.objects.forEach((spawnerObject) => {
      console.log("spawn:", spawnerObject.properties[0].value);
      if (spawnerObject.properties[0].value === 'PhotonDestructor') {
        console.log("posicion nuevo", spawnerObject.x, spawnerObject.y);
        this.enemies.push(new PhotonDestructor(this, this.player, spawnerObject.x, spawnerObject.y));
      }
      else if (spawnerObject.properties[0].value === 'T-1000') {
        console.log("posicion nuevo", spawnerObject.x, spawnerObject.y);
        this.enemies.push(new T1000(this, this.player, spawnerObject.x, spawnerObject.y));
      }
    });
    
    // Cargar deathZones
    this.deathLayer.objects.forEach((deathObject) => {
      console.log("death object:", deathObject);
      this.deathZones.push(new DeathZone(this, this.player, deathObject.x, deathObject.y, deathObject.width, deathObject.height));
    });
    
    this.enemyGroup = new EnemyGruop(this, this.enemies, this.player, this.enemyBullets);
    this.deathZoneGroup = new DeathZoneGroup(this, this.deathZones, this.player);
    
    // this.weapons.push(new Rifle(this, 200, 510));
    // this.weaponsGroup = new WeaponsGroup(this, this.weapons, this.player)

    // Colisión enemigos con suelo
    this.enemies.forEach((enemy) => {
      this.physics.add.collider(enemy, this.sueloLayer);
    })
    

    this.input.on(
      "pointerdown",
      function () {
        this.bullets.fireBullet(this.player);
      },
      this
    );

  }

  hitEnemy(bullets, enemy) {
    enemy.life -= bullets.damage;
    enemy.setTint(0xff0000);
    if (enemy.life <= 0) {
      this.player.updateScore(enemy.score)
      enemy.destroy();
    }
    bullets.destroy();
    return false;  
  }

  hitPlayer(bullets, player) {
    player.loseLife();
    player.setTint(0xff0000);
    sceneEvents.emit('player-health-changed', player.life)
    if (player.life <= 0){
      player.destroy();
      this.scene.start("end");
    }
    bullets.destroy();
    return false;
  }
  
  hitWeapon(weapon, player) {
    player.updateBulletVelocity(weapon);
    weapon.destroy();
    return false;
  }
  
  playerDeath(player, deathZone) {
    player.destroy();
    this.scene.start("end");
  }
  

  initMap() {
    // Crear tilemap
    



  }
}
