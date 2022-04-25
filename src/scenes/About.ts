
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class About extends Phaser.Scene {

	constructor() {
		super("About");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// about
		this.add.image(160, 320, "About");

		// back_Button
		this.add.image(51, 61, "Back-Button");

		// back_Button_Selected
		this.add.image(51, 61, "Back-Button-Selected");

		// view_Collection
		this.add.image(160, 366, "View Collection");

		// view_Collection_Pressed
		this.add.image(160, 366, "View Collection Pressed");

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
