// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// text
		const text = this.add.text(400, 436, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Phaser 3 + Phaser Editor 2D\nVite + TypeScript";
		text.setStyle({ "align": "center", "fontFamily": "Arial", "fontSize": "3em" });

		// image
		this.add.image(400, 243, "FufuSuperDino");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload()
	{
		//this.load.image("FufuSuperDino", '../../static/assets/FufuSuperDino.png')
	}

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here