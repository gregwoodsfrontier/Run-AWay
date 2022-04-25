
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
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

		// gameOver_Anim_13
		const gameOver_Anim_13 = this.add.image(160, 320, "GameOver-Anim-13");
		gameOver_Anim_13.scaleX = 2.06047846236235;
		gameOver_Anim_13.scaleY = 2.06047846236235;

		// mainMenu_Button_Red
		const mainMenu_Button_Red = this.add.image(160, 448, "MainMenu-Button-Red");

		// mainMenu_Button_Red_Selected
		const mainMenu_Button_Red_Selected = this.add.image(160, 448, "MainMenu-Button-Red-Selected");

		// newGame_Button_Red
		const newGame_Button_Red = this.add.image(160, 480, "NewGame-Button-Red");

		// newGame_Button_Red_Selected
		const newGame_Button_Red_Selected = this.add.image(160, 480, "NewGame-Button-Red-Selected");

		this.mainMenu_Button_Red = mainMenu_Button_Red;
		this.mainMenu_Button_Red_Selected = mainMenu_Button_Red_Selected;
		this.newGame_Button_Red = newGame_Button_Red;
		this.newGame_Button_Red_Selected = newGame_Button_Red_Selected;

		this.events.emit("scene-awake");
	}

	private mainMenu_Button_Red!: Phaser.GameObjects.Image;
	private mainMenu_Button_Red_Selected!: Phaser.GameObjects.Image;
	private newGame_Button_Red!: Phaser.GameObjects.Image;
	private newGame_Button_Red_Selected!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
