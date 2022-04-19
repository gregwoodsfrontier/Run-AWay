
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
		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.createNewGame()
	}

	private startTitleScene()
	{
		this.scene.launch("Title")
	}

	private createNewGame()
	{
		console.log('new game')
		this.scene.launch("Level")
		this.scene.launch("UI")
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
