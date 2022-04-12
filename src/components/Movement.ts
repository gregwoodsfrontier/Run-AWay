
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Movement extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__Movement"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): Movement {
		return (gameObject as any)["__Movement"];
	}

	private gameObject: Phaser.GameObjects.Sprite;
	public speed: number = 10;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
