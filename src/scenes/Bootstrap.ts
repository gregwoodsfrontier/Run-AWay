
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import { IGameOverSceneData, ILevelData } from "../types/scenes";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

// TODO: Bootstrap should be handling all the scene transition but since
// I could not figure that out yet, it is pasued for now
export default class Bootstrap extends Phaser.Scene {

	constructor() {
		super("Bootstrap");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// image_1
		const image_1 = this.add.image(320, 180, "FufuSuperDino");
		image_1.alpha = 0;
		image_1.alphaTopLeft = 0;
		image_1.alphaTopRight = 0;
		image_1.alphaBottomLeft = 0;
		image_1.alphaBottomRight = 0;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.startTitleScene()
		// this.createNewGame()
	}

	private startTitleScene()
	{
		this.scene.launch("Title")
	}

	private createNewGame()
	{
		this.scene.stop("Title")
		this.scene.launch("Level", {
			onGameOver: this.handleGameOver,
			onPauseMenu: this.handlePause
		})
		this.scene.launch("UI")
	}

	private handlePause()
	{
		this.scene.pause("Level")
		this.scene.launch("Pause", {
			onResumeGame: this.handleGameFromPause
		})
	}

	private handleGameFromPause()
	{
		this.scene.stop("Pause")
		this.scene.resume("Level")
	}

	private handleGameOver()
	{
		this.scene.stop('Level')
		this.scene.stop('UI')

		this.scene.launch('Gameover')
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
