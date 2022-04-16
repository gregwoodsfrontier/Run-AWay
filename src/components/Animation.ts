
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Animation extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__Animation"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): Animation {
		return (gameObject as any)["__Animation"];
	}

	private gameObject: Phaser.GameObjects.Sprite;
	public frontWalk: string = "";
	public backWalk: string = "";
	public leftWalk: string = "";
	public rightWalk: string = "";

	/* START-USER-CODE */

	// Write your code here.
	// [char]-[dir]-[state]-[holdstate]

	playLeft()
	{
		this.gameObject.play(this.leftWalk, true)
	}

	playRight()
	{
		this.gameObject.play(this.rightWalk, true)
	}

	playFront()
	{
		this.gameObject.play(this.frontWalk, true)
	}

	playBack()
	{
		this.gameObject.play(this.backWalk, true)
	}

	playIdleFromWalk()
	{
		const key = this.gameObject.anims.currentAnim.key
		const parts = key.split('-')
		const char = parts[0]
		const direction = parts[1]

		if(parts.length < 4)
		{
			this.gameObject.play(`${char}-${direction}-idle`)
		}
		else
		{
			this.gameObject.play(`dude-${direction}-idle-hold`, true)
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
