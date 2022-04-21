
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
enum PSD_STATE {
	BACKPACK = 'backpack',
	DEPLOY = 'deploy'
}
/* END-USER-IMPORTS */

export default class PSD extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "raw-break-interact", frame ?? 68);

		this.name = "PSD";

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.static = true;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.stateMachine = new StateMachine(this, 'psd')
		this.stateMachine.addState(PSD_STATE.BACKPACK, {
			onEnter: this.onBackpackEnter
		})
		.addState(PSD_STATE.DEPLOY, {
			onEnter: this.onDeployEnter
		})
		.setState(PSD_STATE.BACKPACK)
		/* END-USER-CTR-CODE */
	}

	public HP: number = 100;
	public energy: number = 100;

	/* START-USER-CODE */
	private stateMachine: StateMachine
	// Write your code here.
	private onBackpackEnter()
	{
		this.playReverse('psd-deploy', true)
		this.once(Phaser.Animations.Events.ANIMATION_COMPLETE + 'psd-deploy', () => {
			this.scene.time.delayedCall(300, () => {
				this.despawn()
			})
		})
	}

	private onDeployEnter()
	{
		this.spawn(this.x, this.y).play('psd-deploy', true)
		this.createPSDField()
	}

	private createPSDField()
	{

	}

	spawn(x: number, y: number)
	{
		this.setActive(true)
		this.setVisible(true)
		this.setPosition(x, y, 2000)
		// this.scene.physics.add.existing(this)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.enable = true
		this.scene.physics.world.add(body)

		return this
	}

	despawn()
	{
		this.setActive(false)
		this.setVisible(false)
		this.setPosition(-500, -500, -2000)
		const body = this.body as Phaser.Physics.Arcade.Body
		if(!body)
		{
			return
		}

		body.enable = false
		this.scene.physics.world.remove(body)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
