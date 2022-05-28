
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
import JustMovement from "../components/JustMovement";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Bullet extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "PCProjectile32", frame ?? 0);

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.width = 16;
		thisPhysics.height = 16;
		thisPhysics.offsetX = 8;
		thisPhysics.offsetY = 8;
		const thisJustMovement = new JustMovement(this);
		thisJustMovement.speed = 380;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.life = this.maxlife
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	private life = 0
	private maxlife = 2000

	// Write your code here.
	fire(x: number, y: number)
	{
		this.setActive(true)
		this.setVisible(true)
		this.setPosition(x, y, 2000)
		this.scene.physics.add.existing(this)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.enable = true
		this.scene.physics.world.add(body)
		this.addToUpdateList()
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

		this.resetLife()
	}

	resetLife()
	{
		this.life = this.maxlife
	}

	//@ts-ignore
	update(time: number, dt: number)
	{
		this.life -= dt

		if(this.y < - 1000 || this.life < 0)
		{
			this.despawn()
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
