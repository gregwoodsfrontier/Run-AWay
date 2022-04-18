
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
import JustMovement from "../components/JustMovement";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Bullet extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "PCProjectile", frame);

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.width = 7;
		thisPhysics.height = 2;
		const thisJustMovement = new JustMovement(this);
		thisJustMovement.speed = 180;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
	fire(x: number, y: number)
	{
		this.setActive(true)
		this.setVisible(true)
		this.setPosition(x, y, 2000)
		this.scene.physics.add.existing(this)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.enable = true
		body.x = this.x
		body.y = this.y
		this.scene.physics.world.add(body)
	}

	despawn()
	{
		this.setActive(false)
		this.setVisible(false)
		// this.setPosition(-50, -50)

		const body = this.body as Phaser.Physics.Arcade.Body

		if(!body)
		{
			return
		}

		body.enable = false
		this.scene.physics.world.remove(body)
	}

	update()
	{
		if(this.y < - 1000)
		{
			this.despawn()
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
