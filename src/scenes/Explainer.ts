
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import BackButton from "../prefabs/BackButton";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Explainer extends Phaser.Scene {

	constructor() {
		super("Explainer");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// 70per_Black_BG
		this.add.image(160, 320, "70per-Black-BG");

		// rules_Page
		this.add.image(160, 320, "Rules-Page");

		// back_Button
		const back_Button = new BackButton(this, 51, 83);
		this.add.existing(back_Button);

		this.back_Button = back_Button;

		this.events.emit("scene-awake");
	}

	private back_Button!: BackButton;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.back_Button.start()
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
