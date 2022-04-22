
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import eventsCenter from "../EventsCenter";
import { SCENE_SWITCH_EVENTS } from "../types/scenes";
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

		eventsCenter.on(SCENE_SWITCH_EVENTS.TO_PAUSE, this.switchToPauseMenu, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.TO_GAME, this.createNewGame, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.RESUME_GAME, this.resumeGame, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.TO_GAMEOVER, this.handleGameOver, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.TO_EXPLAINER, this.goToExplainer, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.RESUME_FROM_EXPLAIN, this.resumeFromExplainer, this)
		
		if(process.env.NODE_ENV === "development")
		{
			this.createNewGame()
		}

		this.startTitleScene()
	}

	private goToExplainer()
	{
		this.scene.pause("Level")
		this.scene.pause("UI")
		this.scene.launch("Explainer").bringToTop("Explainer")
	}

	private resumeFromExplainer()
	{
		this.scene.stop("Explainer")
		this.scene.resume("Level")
		this.scene.resume("UI")
	}

	private switchToPauseMenu()
	{
		this.scene.pause("Level")
		this.scene.pause("UI")
		this.scene.launch("Pause").bringToTop("Pause")
	}

	private resumeGame()
	{
		this.scene.stop("Pause")
		this.scene.resume("Level")
		this.scene.resume("UI")
	}

	private startTitleScene()
	{
		this.scene.launch("Title")
	}

	private createNewGame()
	{
		this.scene.stop("Title")
		this.scene.launch("Level")
		this.scene.launch("UI")
	}

	private handleGameOver()
	{
		this.scene.stop('Level')
		this.scene.stop('UI')
		this.scene.launch('GameOver')
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
