import Phaser from 'phaser';
import { sceneEvents } from '../events/eventsCenter';

export default class GameUI extends Phaser.Scene{
    constructor(){
      super({key: 'game-ui'})
    }

    create(){
       this.hearts = this.add.group({
        classType: Phaser.GameObjects.Image
      })

      this.hearts.createMultiple({
        key: 'ui-heart-full',
        setXY: {
          x: 70,
          y: 38,
          stepX:17
        },
        quantity: 5
      })
      sceneEvents.on('player-health-changed', this.handlePlayerHealthChanged, this)
    }

    handlePlayerHealthChanged(health){
		this.hearts.children.each((go, idx) => {
			const heart = go;
			if (idx < health)
			{
				heart.setTexture('ui-heart-full')
			}
			else
			{
				heart.setTexture('ui-heart-empty')
			}
		})
	}
}