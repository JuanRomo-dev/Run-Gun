import Phaser from 'phaser';

export default class PhotonDestructor extends Phaser.GameObjects.Sprite {
    life = 15;
    score = 20;
    tickRate = 0.5;
    shootRate = 1000; //milisegundos
    bulletVelocity = 400;
    textureBullet = "enemy_bullet";
    /**
     * Constructor del enemigo
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.GameObjects.Sprite} player jugador
     */
    constructor(scene, player, x, y, suelo, plataforma) {
        super(scene, x, y, "photonDestructor");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, player);
        this.body.setCollideWorldBounds();
        this.speed = 100;
        this.jumpSpeed = -100;
        this.player = player;
        this.direction = "left";
        this.setScale(2.3, 2.3);
        this.suelo = suelo;
        this.limitLeft = scene.physics.add.sprite(x, y, null);
        
        
        
        this.limitRight = scene.physics.add.sprite(x, y, null);
        this.limitLeft.setSize(5,1);
        this.limitRight.setSize(5,1);
        this.scene.add.existing(this.limitLeft);
        this.scene.add.existing(this.limitRight);
        this.scene.physics.add.existing(this.limitLeft);
        this.scene.physics.add.existing(this.limitRight);  
        this.limitLeft.setVisible(false);
        this.limitRight.setVisible(false);
        this.limitLeft.body.setCollideWorldBounds();
        this.limitRight.body.setCollideWorldBounds();
        this.scene.physics.add.collider(this.limitLeft, suelo);
        this.scene.physics.add.collider(this.limitRight, suelo);
        this.scene.physics.add.collider(this.limitLeft, plataforma);
        this.scene.physics.add.collider(this.limitRight, plataforma);
    }
/**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del enemigo.
   * @override
   */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.body.setSize(23,37); // Mantener el mismo tamaño del colisionador
        this.body.setOffset(4,0); // Mantener el mismo desplazamiento del colisionador
        this.setTint(0xffffff);


        let bordeIzq = this.limitLeft.body.blocked.down;
        let bordeDer = this.limitRight.body.blocked.down;
        this.limitLeft.setGravityY(10000);
        this.sensorIzq();
        this.sensorDer();
        if(!bordeIzq){
            this.x = this.x+0.05;
        }
        if(!bordeDer){
            this.x = this.x-0.05;
        }


        if(this.player.y < this.y || !bordeIzq || !bordeDer){ //si el jugador esta arriba
            this.body.setVelocityX(0);
            this.anims.play('photondestructor_idle', true);
            
            
        }else{
            if(Math.abs(this.player.x - this.x) > 350){ //Si esta demasiado lejos del jugador

                if (this.player.x  < this.x) { //si el jugador está a la izquierda 
                    this.body.setVelocityX(-this.speed);
                    this.anims.play('photondestructor_run', true).setFlipX(true); 
                }else if (this.player.x > this.x){ //si el jugador está a la derecha
                    this.body.setVelocityX(this.speed);
                    this.anims.play('photondestructor_run', true).setFlipX(false); 
                }else{
                    this.body.setVelocityX(0);
                }
            }else{
                this.body.setVelocityX(0);
                if (this.player.x  < this.x) { //si el jugador está a la izquierda
                    //this.anims.play('desenfundado', true).setFlipX()
                    this.anims.play('photondestructor_shoot', true).setFlipX(true);
                    this.body.setSize(23,34); // Mantener el mismo tamaño del colisionador
                    this.body.setOffset(21.5,0); // Mantener el mismo desplazamiento del colisionador
                    this.fire(t)
                }else{ //si el jugador está a la derecha
                    this.direction = "right"
                    this.anims.play('photondestructor_shoot', true).setFlipX(false);
                    this.body.setSize(23,34); // Mantener el mismo tamaño del colisionador
                    this.body.setOffset(6,0); // Mantener el mismo desplazamiento del colisionador
                    this.fire(t)
                }
            }
        }   
        
    }

    initBullets(bullets){
        this.bullets = bullets;
    }

    fire(time){
        if(time > this.tickRate){
            this.bullets.fireBullet(this);
            this.tickRate = time + this.shootRate;
        }
    }
    
    sensorIzq(){
        this.limitLeft.setPosition(this.x-(this.body.width/2), this.body.bottom);
    }

    sensorDer(){
        this.limitRight.setPosition(this.x+(this.body.width/2) +1, this.body.bottom);
    }

}