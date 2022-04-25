
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Button from "../components/Button";
/* START-USER-IMPORTS */
import eventsCenter from "../EventsCenter";
import { SCENE_SWITCH_EVENTS } from "../types/scenes";
/* END-USER-IMPORTS */

export default class MainMenuButton extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "MainMenu-Button-Red", frame);

		// this (components)
		new Button(this);

		/* START-USER-CTR-CODE */
		// Write your code here.
		// this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		/* END-USER-CTR-CODE */
	}

	public currentScene: string = "GameOver";
	private endScale = 1.2
	/* START-USER-CODE */
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
			this.setTexture("MainMenu-Button-Red")
			// this.scene.time.delayedCall(1000, this.goToTitle)
			this.goToTitle()
		}
		buttonComp.handlePointerDown = () => {
			this.setTexture("MainMenu-Button-Red-Selected")
		}
		buttonComp.handlePointerOver = () => {
			this.scaleUp(this)
		}
		buttonComp.handlePointerOut = () => {
			this.scaleDown(this)
			this.setTexture("MainMenu-Button-Red")
		}
	}

	private goToTitle()
	{
		eventsCenter.emit(SCENE_SWITCH_EVENTS.TO_TITLE, this.currentScene)
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

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
