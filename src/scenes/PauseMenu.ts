
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Button from "../components/Button";
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

		// menu_Background
		const menu_Background = this.add.image(160, 319, "Menu Background");

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

		// lists
		const buttonList = [mainMenuButton, about_Button, volume_Button, restart_Button, start_Button];

		// start_Button (components)
		new Button(start_Button);

		// restart_Button (components)
		new Button(restart_Button);

		// volume_Button (components)
		new Button(volume_Button);

		// about_Button (components)
		new Button(about_Button);

		// mainMenuButton (components)
		new Button(mainMenuButton);

		this.menu_Background = menu_Background;
		this.start_Button = start_Button;
		this.restart_Button = restart_Button;
		this.volume_Button = volume_Button;
		this.about_Button = about_Button;
		this.mainMenuButton = mainMenuButton;
		this.buttonList = buttonList;

		this.events.emit("scene-awake");
	}

	private menu_Background!: Phaser.GameObjects.Image;
	private start_Button!: Phaser.GameObjects.Image;
	private restart_Button!: Phaser.GameObjects.Image;
	private volume_Button!: Phaser.GameObjects.Image;
	private about_Button!: Phaser.GameObjects.Image;
	private mainMenuButton!: Phaser.GameObjects.Image;
	private buttonList!: Phaser.GameObjects.Image[];

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		
		this.buttonList.forEach(e => {
			e.setVisible(true)
			console.log(e)
		})
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
