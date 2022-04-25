
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Button from "../components/Button";
/* START-USER-IMPORTS */
import eventsCenter from "../EventsCenter";
import { SCENE_SWITCH_EVENTS } from "../types/scenes";
/* END-USER-IMPORTS */

export default class BackButton extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "Back-Button", frame);

		// this (components)
		new Button(this);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public currScene: string = "Explainer";

	/* START-USER-CODE */
	private endScale = 1.2

	start()
	{
		this.setButtonInput()
	}

	private setButtonInput()
	{
		const buttonComp = Button.getComponent(this)
		if(!buttonComp)
		{
			console.error('but comp is undefined')
			return
		}

		buttonComp.handlePointerUp = () => {
			this.setTexture("Back-Button")
			// this.scene.time.delayedCall(1000, this.goToTitle)
			this.resumeToNewGame()
		}
		buttonComp.handlePointerDown = () => {
			this.setTexture("Back-Button-Selected")
		}
		buttonComp.handlePointerOver = () => {
			this.scaleUp(this)
		}
		buttonComp.handlePointerOut = () => {
			this.scaleDown(this)
			this.setTexture("Back-Button")
		}
	}

	// Write your code here.
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

	private resumeToNewGame()
	{
		eventsCenter.emit(SCENE_SWITCH_EVENTS.RESUME_FROM_EXPLAIN)
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
