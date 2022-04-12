
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MainGame extends Phaser.Scene {

	constructor() {
		super("MainGame");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// sprite_1
		const sprite_1 = this.add.sprite(320, 180, "493-export", 1);
		sprite_1.scaleX = 0.5;
		sprite_1.scaleY = 0.5;

		this.sprite_1 = sprite_1;

		this.events.emit("scene-awake");
	}

	public sprite_1!: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
