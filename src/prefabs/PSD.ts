
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PSD extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "raw-break-interact", frame ?? 68);

		this.name = "PSD";

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public HP: number = 100;

	/* START-USER-CODE */

	// Write your code here.
	spawn(x: number, y: number)
	{
		this.setActive(true)
		this.setVisible(true)
		this.setPosition(x, y, 2000)
		this.scene.physics.add.existing(this)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.enable = true
		this.scene.physics.world.add(body)

		return this
	}

	despawn()
	{
		this.setActive(false)
		this.setVisible(false)
		this.setPosition(-500, -500, -2000)
		const body = this.body as Phaser.Physics.Arcade.Body
		if(!body)
		{
			return
		}

		body.enable = false
		this.scene.physics.world.remove(body)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
