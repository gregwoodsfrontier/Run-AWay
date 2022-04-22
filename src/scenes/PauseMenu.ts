
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PauseMenu extends Phaser.Scene {

	constructor() {
		super("Pause");

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
		const start_Button = this.add.image(160, 255, "Start Button");

		// restart_Button
		const restart_Button = this.add.image(160, 287, "Restart Button");

		// volume_Button
		const volume_Button = this.add.image(160, 319, "Volume Button");

		// about_Button
		const about_Button = this.add.image(160, 383, "About Button");

		// mainMenuButton
		const mainMenuButton = this.add.image(160, 351, "MainMenuButton");

		this.start_Button = start_Button;
		this.restart_Button = restart_Button;
		this.volume_Button = volume_Button;
		this.about_Button = about_Button;
		this.mainMenuButton = mainMenuButton;

		this.events.emit("scene-awake");
	}

	private start_Button!: Phaser.GameObjects.Image;
	private restart_Button!: Phaser.GameObjects.Image;
	private volume_Button!: Phaser.GameObjects.Image;
	private about_Button!: Phaser.GameObjects.Image;
	private mainMenuButton!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	private resumeGame()
	{
		this.scene.stop('Pause')
		this.scene.resume('Level')
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
