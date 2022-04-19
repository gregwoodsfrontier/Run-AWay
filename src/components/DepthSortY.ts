
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class DepthSortY {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		this.gameObject = gameObject;
		(gameObject as any)["__DepthSortY"] = this;

		/* START-USER-CTR-CODE */
		const scene = this.gameObject.scene;


		// each time the scene is updated, call the `update` method
        scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): DepthSortY {
		return (gameObject as any)["__DepthSortY"];
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
			player.play('left-walk', true)
		}
		else if (cursors.right.isDown)
		{
			body.setVelocity(speed, 0)
			player.play('right-walk', true)
		}
		else if (cursors.up.isDown)
		{
			body.setVelocity(0, -speed)
			player.play('back-walk', true)
		}
		else if (cursors.down.isDown)
		{
			body.setVelocity(0, speed)
			player.play('front-walk', true)
		}
		else
		{
			body.setVelocity(0, 0)
			const key = player.anims.currentAnim.key
			const parts = key.split('-')
			const direction = parts[0]
			player.play(`${direction}-idle`)
		}
	}

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
