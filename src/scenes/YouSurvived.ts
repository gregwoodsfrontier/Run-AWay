
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import MainMenuButton from "../prefabs/MainMenuButton";
import NewGameButton from "../prefabs/NewGameButton";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class YouSurvived extends Phaser.Scene {

	constructor() {
		super("YouSurvived");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// mainMenu_Button_Red_Selected
		const mainMenu_Button_Red_Selected = this.add.image(160, 386, "MainMenu-Button-Red-Selected");

		// newGame_Button_Red_Selected
		const newGame_Button_Red_Selected = this.add.image(160, 419, "NewGame-Button-Red-Selected");

		// 70per_Black_BG
		this.add.image(160, 320, "70per-Black-BG");

		// byTeam
		this.add.image(65, 562, "ByTeam");

		// logo_v2
		const logo_v2 = this.add.image(160, 320, "Logo v2");
		logo_v2.scaleX = 0.885327816705385;
		logo_v2.scaleY = 0.885327816705385;

		// youSurvived
		const youSurvived = this.add.image(160, 180, "YouSurvived");
		youSurvived.scaleX = 3.5937905673970443;
		youSurvived.scaleY = 3.5937905673970443;

		// mainMenu_Button_Red
		const mainMenu_Button_Red = new MainMenuButton(this, 160, 386);
		this.add.existing(mainMenu_Button_Red);

		// newGame_Button_Red
		const newGame_Button_Red = new NewGameButton(this, 160, 420);
		this.add.existing(newGame_Button_Red);

		this.mainMenu_Button_Red_Selected = mainMenu_Button_Red_Selected;
		this.newGame_Button_Red_Selected = newGame_Button_Red_Selected;
		this.mainMenu_Button_Red = mainMenu_Button_Red;
		this.newGame_Button_Red = newGame_Button_Red;

		this.events.emit("scene-awake");
	}

	private mainMenu_Button_Red_Selected!: Phaser.GameObjects.Image;
	private newGame_Button_Red_Selected!: Phaser.GameObjects.Image;
	private mainMenu_Button_Red!: MainMenuButton;
	private newGame_Button_Red!: NewGameButton;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
