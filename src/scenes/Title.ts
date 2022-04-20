
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Button from "../components/Button";
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

		// start_Anim1
		const start_Anim1 = this.add.sprite(160, 320, "Start-Anim-1");

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

		// start_Button (components)
		new Button(start_Button);

		// volume_Button (components)
		new Button(volume_Button);

		// about_Button (components)
		new Button(about_Button);

		this.start_Anim1 = start_Anim1;
		this.start_Button = start_Button;
		this.volume_Button = volume_Button;
		this.about_Button = about_Button;

		this.events.emit("scene-awake");
	}

	private start_Anim1!: Phaser.GameObjects.Sprite;
	private start_Button!: Phaser.GameObjects.Image;
	private volume_Button!: Phaser.GameObjects.Image;
	private about_Button!: Phaser.GameObjects.Image;

	/* START-USER-CODE */
	private endScale = 1.2

	// Write your code here

	create() {

		this.editorCreate();

		Button.getComponent(this.start_Button).handlePointerUp = () => {
			this.startNewGame()
		}

		const buttons = [
			this.start_Button,
			this.volume_Button,
			this.about_Button
		]

		buttons.forEach(button => {
			const comp = Button.getComponent(button)
			comp.handlePointerOver = () => {
				this.scaleUp(button)
			}
			comp.handlePointerOut = () => {
				this.scaleDown(button)
			}
		})
	}

	private scaleDown(button: Phaser.GameObjects.Image)
	{
		const tween = this.tweens.addCounter({
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
		const tween = this.tweens.addCounter({
			from: 1,
			to: this.endScale,
			duration: 300,
			onUpdate: () => {
				const scalin = tween.getValue()
				button.setScale(scalin)
			}
		})
	}

	private startNewGame()
	{
		this.scene.stop('Title')
		this.scene.launch('Level')
		this.scene.launch('UI')
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
