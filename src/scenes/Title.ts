
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

		// triangle_1
		const triangle_1 = this.add.triangle(48, 672, 0, 128, 64, 0, 128, 128);
		triangle_1.scaleY = 0.5;
		triangle_1.isFilled = true;
		triangle_1.fillColor = 0;

		// triangle
		const triangle = this.add.triangle(160, 672, 0, 128, 64, 0, 128, 128);
		triangle.scaleY = 0.5;
		triangle.isFilled = true;
		triangle.fillColor = 0;

		// triangle_2
		const triangle_2 = this.add.triangle(272, 672, 0, 128, 64, 0, 128, 128);
		triangle_2.scaleY = 0.5;
		triangle_2.isFilled = true;
		triangle_2.fillColor = 0;

		// rectangle_1
		const rectangle_1 = this.add.rectangle(0, 704, 320, 700);
		rectangle_1.setOrigin(0, 0);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 0;

		// lists
		const transition = [triangle_1, rectangle_1, triangle, triangle_2];

		// start_Button (components)
		new Button(start_Button);

		// volume_Button (components)
		new Button(volume_Button);

		// about_Button (components)
		new Button(about_Button);

		this.start_Anim1 = start_Anim1;
		this.logo_v2 = logo_v2;
		this.start_Button = start_Button;
		this.volume_Button = volume_Button;
		this.about_Button = about_Button;
		this.transition = transition;

		this.events.emit("scene-awake");
	}

	private start_Anim1!: Phaser.GameObjects.Sprite;
	private logo_v2!: Phaser.GameObjects.Image;
	private start_Button!: Phaser.GameObjects.Image;
	private volume_Button!: Phaser.GameObjects.Image;
	private about_Button!: Phaser.GameObjects.Image;
	private transition!: Array<Phaser.GameObjects.Triangle|Phaser.GameObjects.Rectangle>;

	/* START-USER-CODE */
	private endScale = 1.2

	// Write your code here

	create() {

		this.editorCreate();

		Button.getComponent(this.start_Button).handlePointerUp = () => {
			this.hideUIElement()
			// this.startNewGame()
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

		this.events.once('element-finished-tween', this.startTitleAnims, this)
		this.events.once('shape-finished', () => {
			this.time.delayedCall(500, this.startNewGame, undefined, this)
		}, this)
		this.start_Anim1.once(Phaser.Animations.Events.ANIMATION_COMPLETE, this.handleAnimsEnd,this)
	}

	private handleAnimsEnd()
	{
		console.log('handle anims end')
		// add transition scene
		this.transition.forEach(e => {
			this.tweens.add({
				targets: e,
				duration: 800,
				y: '-=728',
				onUpdate: () => {
					this.start_Anim1.y -= 2
				},
				onComplete: () => {
					this.events.emit('shape-finished')
				}
			})
		})
	}

	private startTitleAnims()
	{
		if(!this.start_Anim1)
		{
			return
		}

		this.start_Anim1.play('start-anim', true)
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

	private hideUIElement()
	{
		const elements = [
			this.logo_v2,
			this.start_Button,
			this.about_Button,
			this.volume_Button
		]

		elements.forEach(e => {
			const alphaTween = this.tweens.addCounter({
				duration: 1000,
				from: 1,
				to: 0,
				onUpdate: () => {
					const value = alphaTween.getValue()
					e.setAlpha(value)
				}
			})
		})

		this.events.emit('element-finished-tween')
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
