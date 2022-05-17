
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class DepthSortY {

	constructor(gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container) {
		this.gameObject = gameObject;
		(gameObject as any)["__DepthSortY"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container): DepthSortY {
		return (gameObject as any)["__DepthSortY"];
	}

	private gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
