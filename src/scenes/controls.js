import Phaser from 'phaser';
import { FullSizeBtn } from '../components/fullSizeBtn';
import { HomeBtn } from '../components/homeBtn';

export default class Controls extends Phaser.Scene{
  constructor(){
    super({key: 'controls'})
    this.fullSizeBtn = new FullSizeBtn(this);
    this.homeBtn = new HomeBtn(this);
  }

  create(){
    this.add.image(0,0,"background").setScale(1.5);
    this.fullSizeBtn.create();
    this.homeBtn.create();
    this.add.image(200,170,"run_left_control").setScale(2);
    this.add.image(700,170,"run_right_control").setScale(2);
    
    this.add.image(200,320,"sit_control").setScale(2);
    this.add.image(700,320,"jump_control").setScale(2);

    this.add.image(200,470,"dash_control").setScale(2);
    this.add.image(700,470,"shoot_control").setScale(2);

    this.anims.create({           // Animación de Mike corriendo
      key: 'run',
      frames: this.anims.generateFrameNumbers('mikeRunShot', { start: 0, end: 5 }),
      frameRate: 7,
      repeat: -1    
    })
    const runRightSprite = this.add.sprite(830, 160, 'mikeRunShot').setScale(2.8);
    runRightSprite.play('run')
    const runLeftSprite = this.add.sprite(330, 160, 'mikeRunShot').setScale(2.8);
    runLeftSprite.play('run').setFlipX(true);

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('mikeJump', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    })
    const jumpSprite = this.add.sprite(830, 310, 'mikeJump').setScale(2.8);
    jumpSprite.play('jump')

    this.anims.create({
      key: 'Down',
      frames: this.anims.generateFrameNames('mikeDown', { start: 0, end: 2 }),
      frameRate: 4,
      repeat: -1
    })     
    const sitSprite = this.add.sprite(330, 310, 'mikeDown').setScale(2.8);
    sitSprite.play('Down')


    this.anims.create({     // Animación de Mike quieto
      key: 'idle_shoot',
      frames: this.anims.generateFrameNumbers('mikeIdleShoot', { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1
    })
    const shootSprite = this.add.sprite(830, 460, 'mikeIdle').setScale(2.8);
    shootSprite.play('idle_shoot')

    this.anims.create({
      key: 'Dash',
      frames: this.anims.generateFrameNames('mikeDash', { start: 0, end: 5 }),
      frameRate: 4,
      repeat: -1,
    })
    const dashSprite = this.add.sprite(330, 460, 'mikeDash').setScale(2.8);
    dashSprite.play('Dash')


  }
}