
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Button from "../components/Button";
/* START-USER-IMPORTS */
import eventsCenter from "../EventsCenter";
import { SCENE_SWITCH_EVENTS, AUDIO_PLAY_EVENTS } from "../types/scenes";
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

		// dithered_Triangles
		const dithered_Triangles = this.add.image(160, 1024, "Dithered Triangles");

		// lists
		const transition = [dithered_Triangles];

		// start_Button (components)
		new Button(start_Button);

		this.start_Anim1 = start_Anim1;
		this.logo_v2 = logo_v2;
		this.start_Button = start_Button;
		this.transition = transition;

		this.events.emit("scene-awake");
	}

	private start_Anim1!: Phaser.GameObjects.Sprite;
	private logo_v2!: Phaser.GameObjects.Image;
	private start_Button!: Phaser.GameObjects.Image;
	private transition!: Phaser.GameObjects.Image[];

	/* START-USER-CODE */
	private endScale = 1.2
	private introTrack!: Phaser.Sound.BaseSound
	private startAnimSFX!: Phaser.Sound.BaseSound
	// Write your code here

	create() {

		this.editorCreate();

		this.introTrack = this.sound.add('Ambient_Intro_Track_v3', {
			loop: true
		})
		this.startAnimSFX = this.sound.add('Start-Anim-SFX')

		this.introTrack.play()

		Button.getComponent(this.start_Button).handlePointerUp = () => {
			this.start_Button.setTexture("Start Button")
			this.hideUIElement()
			this.introTrack.stop()
		}

		Button.getComponent(this.start_Button).handlePointerDown = () => {
			eventsCenter.emit(AUDIO_PLAY_EVENTS.MENUSELECT)
			this.start_Button.setTexture("Start Button Pressed")
		}

		const buttons = [
			this.start_Button
		]

		buttons.forEach(button => {
			button.setData("idle", button.texture.key)
			const comp = Button.getComponent(button)
			comp.handlePointerOver = () => {
				this.scaleUp(button)
			}
			comp.handlePointerOut = () => {
				const idleTexture = button.getData("idle")
				button.setTexture(idleTexture)
				this.scaleDown(button)
			}
		})

		this.events.once('element-finished-tween', this.startTitleAnims, this)
		this.events.once('shape-finished', () => {
			this.time.delayedCall(500, this.startNewGame, undefined, this)
		}, this)
		this.start_Anim1.once(Phaser.Animations.Events.ANIMATION_COMPLETE, this.handleAnimsEnd,this)

		this.start_Anim1.play('idle-title')
	}

	private handleAnimsEnd()
	{
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

		this.start_Anim1.play('start-title', true)
		this.startAnimSFX.play()
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
			this.start_Button
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
		this.startAnimSFX.stop()
		eventsCenter.emit(SCENE_SWITCH_EVENTS.TO_GAME)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
