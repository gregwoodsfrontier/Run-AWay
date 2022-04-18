
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PauseMenu extends Phaser.Scene {

	constructor() {
		super("Scene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// menu_Button
		this.add.image(288, 32, "Menu Button");

		// menu_Background
		this.add.image(160, 319, "Menu Background");

		// menu_Button_Pressed
		this.add.image(288, 32, "Menu Button Pressed");

		// start_Button
		this.add.image(160, 255, "Start Button");

		// restart_Button
		this.add.image(160, 287, "Restart Button");

		// volume_Button
		this.add.image(160, 319, "Volume Button");

		// about_Button
		this.add.image(160, 383, "About Button");

		// mainMenuButton
		this.add.image(160, 351, "MainMenuButton");

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
