
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import MainMenuButton from "../prefabs/MainMenuButton";
import NewGameButton from "../prefabs/NewGameButton";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class GameOver extends Phaser.Scene {

	constructor() {
		super("GameOver");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// dithered_Triangles
		this.add.image(160, 316, "Dithered Triangles");

		// gameOverLogo
		const gameOverLogo = this.add.sprite(160, 320, "GameOver-Anim-13");
		gameOverLogo.scaleX = 2.06047846236235;
		gameOverLogo.scaleY = 2.06047846236235;

		// mainMenu_Button_Red
		const mainMenu_Button_Red = new MainMenuButton(this, 160, 448);
		this.add.existing(mainMenu_Button_Red);

		// newGame_Button_Red
		const newGame_Button_Red = new NewGameButton(this, 160, 480);
		this.add.existing(newGame_Button_Red);

		// mainMenu_Button_Red (prefab fields)
		mainMenu_Button_Red.currentScene = "GameOver";

		// newGame_Button_Red (prefab fields)
		newGame_Button_Red.currentScene = "GameOver";

		this.gameOverLogo = gameOverLogo;
		this.mainMenu_Button_Red = mainMenu_Button_Red;
		this.newGame_Button_Red = newGame_Button_Red;

		this.events.emit("scene-awake");
	}

	private gameOverLogo!: Phaser.GameObjects.Sprite;
	private mainMenu_Button_Red!: MainMenuButton;
	private newGame_Button_Red!: NewGameButton;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.gameOverLogo.play('gameover-logo', true)

		this.mainMenu_Button_Red.start()
		this.newGame_Button_Red.start()
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
