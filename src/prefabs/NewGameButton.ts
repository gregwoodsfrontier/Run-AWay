
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Button from "../components/Button";
/* START-USER-IMPORTS */
import eventsCenter from "../EventsCenter";
import { SCENE_SWITCH_EVENTS } from "../types/scenes";
/* END-USER-IMPORTS */

export default class NewGameButton extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "NewGame-Button-Red", frame);

		// this (components)
		new Button(this);

		/* START-USER-CTR-CODE */
		// Write your code here.
		// this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this)
		/* END-USER-CTR-CODE */
	}

	public currentScene: string = "GameOver";

	/* START-USER-CODE */
	private endScale = 1.2

	start()
	{
		this.setButtonInput()
	}
	// Write your code here.

	private setButtonInput()
	{
		const buttonComp = Button.getComponent(this)
		buttonComp.handlePointerUp = () => {
			this.setTexture("NewGame-Button-Red")
			// this.scene.time.delayedCall(1000, this.goToNewGame)
			this.goToNewGame()
		}
		buttonComp.handlePointerDown = () => {
			this.setTexture("NewGame-Button-Red-Selected")
		}
		buttonComp.handlePointerOver = () => {
			this.scaleUp(this)
		}
		buttonComp.handlePointerOut = () => {
			this.scaleDown(this)
			this.setTexture("NewGame-Button-Red")
		}
	}

	private goToNewGame()
	{
		eventsCenter.emit(SCENE_SWITCH_EVENTS.BACK_TO_GAME, this.currentScene)
	}

	private scaleDown(button: Phaser.GameObjects.Image)
	{
		const tween = this.scene.tweens.addCounter({
			from: this.endScale,
			to: 1,
			duration: 300,
			onUpdate: () => {
				const scalin = tween.getValue()
				button.setScale(scalin)
			}
		})
	}

	private scaleUp(button: Phaser.GameObjects.Image)
	{
		const tween = this.scene.tweens.addCounter({
			from: 1,
			to: this.endScale,
			duration: 300,
			onUpdate: () => {
				const scalin = tween.getValue()
				button.setScale(scalin)
			}
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
