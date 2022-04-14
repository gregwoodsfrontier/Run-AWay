
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Bootstrap extends Phaser.Scene {

	constructor() {
		super("Bootstrap");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// image_1
		const image_1 = this.add.image(320, 180, "FufuSuperDino");
		image_1.alpha = 0;
		image_1.alphaTopLeft = 0;
		image_1.alphaTopRight = 0;
		image_1.alphaBottomLeft = 0;
		image_1.alphaBottomRight = 0;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
