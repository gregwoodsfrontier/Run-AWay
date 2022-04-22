
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Button extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__Button"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): Button {
		return (gameObject as any)["__Button"];
	}

	private gameObject: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here.
	start()
	{
		this.gameObject.setInteractive()
		this.gameObject.on('pointerup', this.handlePointerUp, this)
		this.gameObject.on('pointerdown', this.handlePointerDown, this)
		this.gameObject.on('pointerover', this.handlePointerOver, this)
		this.gameObject.on('pointerout', this.handlePointerOut, this)
	}

	handlePointerUp(){}
	handlePointerDown(){}
	handlePointerOver(){}
	handlePointerOut(){}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
