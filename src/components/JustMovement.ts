
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class JustMovement extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__JustMovement"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container): JustMovement {
		return (gameObject as any)["__JustMovement"];
	}

	private gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container;
	public speed: number = 10;

	/* START-USER-CODE */

	// Write your code here.
	moveUp()
	{
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

		body.setVelocity(0, -this.speed)
	}

	moveDown()
	{
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

		body.setVelocity(0, this.speed)
	}

	moveLeft()
	{
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

		body.setVelocity(-this.speed, 0)
	}

	moveRight()
	{
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

		body.setVelocity(this.speed, 0)
	}

	stayStill()
	{
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

		body.setVelocity(0, 0)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
