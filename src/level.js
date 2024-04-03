import Phaser from 'phaser';

import Bullets from './bullet.js';
import EnemyGruop from './enemyGroup.js';
import PhotonDestructor from './photonDestructor.js';
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
    
    // Animación del photonDestructor corriendo
    this.photonDestructor_anim = this.cache.json.get("photonDestructor_anim");
    this.anims.fromJSON(this.photonDestructor_anim);

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
    const terrain = mapa.addTilesetImage('escenario', 'tiles2');
    this.sueloLayer = this.map.createLayer('suelo', terrain);
    this.fondoLayer = this.map.createLayer('fondo', terrain);
    
    this.player = new Player(this, 300, 300);

    // Movimiento cámara sobre el jugador
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    this.cameras.main.startFollow(this.player)
    
    // Bounds del nivel
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    
    // Colisión con el suelo
    this.sueloLayer.setCollisionBetween(0, 1000);
    this.physics.add.collider(this.player, this.sueloLayer);

    
    this.bullets = new Bullets(this);
    new Platform(this, this.player, this.bases, 150, 450);
    new Platform(this, this.player, this.bases, 150, 200);
    new Platform(this, this.player, this.bases, 1050, 200);

    this.enemies.push(new T1000(this, this.player, 450, 100));
    this.enemies.push(new T1000(this, this.player, 800, 160));
    this.enemies.push(new PhotonDestructor(this, this.player, 300, 100));
    this.enemyGroup = new EnemyGruop(this, this.enemies);

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

    this.enemies.forEach((e) => {
      this.physics.add.overlap(this.bullets, e, this.hitEnemy, null, this);
    });

  }

  hitEnemy(bullets, enemy) {
    enemy.life -= bullets.damage;
    console.log("🚀 ~ Level ~ hitEnemy ~ enemy.life:", enemy)

    if (enemy.life <= 0) {
      console.log("🚀 ~ Level ~ hitEnemy ~ enemy.score:", enemy.score)        
      this.player.point(enemy.score)
      enemy.destroy();
    }
    bullets.destroy();
    return false;
  }
  
  initMap() {
    // Crear tilemap
    



  }
}
