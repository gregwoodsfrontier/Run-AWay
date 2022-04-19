
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import { ITitleData, ILevelData } from "../types/scenes";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Title extends Phaser.Scene {

	constructor() {
		super("Title");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// image
		this.add.image(-177, 162, "gamedevjs");

		// text
		const text = this.add.text(-177, 300, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Gamedev JS Game Jam\n2022";
		text.setStyle({ "align": "center", "fontFamily": "Arial", "fontSize": "2em" });

		// startGame
		const startGame = this.add.text(-283, 396, "", {});
		startGame.text = "Start Game!";
		startGame.setStyle({ "fontSize": "32px" });

		// start_Anim1
		this.add.image(160, 320, "Start Anim1");

		// logo_v2
		const logo_v2 = this.add.image(160, 142, "Logo v2");
		logo_v2.scaleX = 0.7061279801116807;
		logo_v2.scaleY = 0.7061279801116807;

		// start_Button
		const start_Button = this.add.image(160, 191, "Start Button");

		// volume_Button
		const volume_Button = this.add.image(160, 255, "Volume Button");

		// about_Button
		const about_Button = this.add.image(160, 223, "About Button");

		this.start_Button = start_Button;
		this.volume_Button = volume_Button;
		this.about_Button = about_Button;

		this.events.emit("scene-awake");
	}

	private start_Button!: Phaser.GameObjects.Image;
	private volume_Button!: Phaser.GameObjects.Image;
	private about_Button!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.start_Button.on('pointerup', this.handleStartUp, this)
	}

	private handleStartUp()
	{
		this.scene.stop('Title')
		this.scene.launch('Level')
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
