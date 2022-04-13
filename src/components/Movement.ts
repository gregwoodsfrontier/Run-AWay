
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";

export default class Movement {
	
	constructor(gameObject: Phaser.GameObjects.Sprite) {
		this.gameObject = gameObject;
		(gameObject as any)["__Movement"] = this;
		
		/* START-USER-CTR-CODE */
		const scene = this.gameObject.scene;
		

		// each time the scene is updated, call the `update` method
        scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		/* END-USER-CTR-CODE */
	}
	
	static getComponent(gameObject: Phaser.GameObjects.Sprite): Movement {
		return (gameObject as any)["__Movement"];
	}
	
	private gameObject: Phaser.GameObjects.Sprite;
	
	/* START-USER-CODE */
	update()
	{
		const scene = this.gameObject.scene;
		const cursors = scene.input.keyboard.createCursorKeys();
		const speed = 200
		const player = this.gameObject

		const body = player.body as Phaser.Physics.Arcade.Body

		if(!player.active)
		{
			return
		}

		if(!body)
		{
			return
		}

		if (cursors.left.isDown)
		{
			body.setVelocity(-speed, 0)
			player.play('player-walk-left', true)
		}
		else if (cursors.right.isDown)
		{
			body.setVelocity(speed, 0)
			player.play('player-walk-right', true)
		}
		else if (cursors.up.isDown)
		{
			body.setVelocity(0, -speed)
			player.play('player-walk-up', true)
		}
		else if (cursors.down.isDown)
		{
			body.setVelocity(0, speed)
			player.play('player-walk-down', true)
		}
		else
		{
			body.setVelocity(0, 0)
			const key = player.anims.currentAnim.key
			const parts = key.split('-')
			const direction = parts[2]
			player.play(`player-idle-${direction}`)
		}
	}

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
