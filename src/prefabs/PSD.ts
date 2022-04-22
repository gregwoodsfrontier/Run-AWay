
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
import { GameState } from "../manager/gameState";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import psdField from "./psdField";
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
	public stateMachine: StateMachine
	public innerField?: psdField
	public outerField?: psdField
	// Write your code here.
	public deploy()
	{
		this.stateMachine.setState(PSD_STATE.DEPLOY)
	}

	public returnToPlayer()
	{
		this.stateMachine.setState(PSD_STATE.BACKPACK)
	}

	private onBackpackEnter()
	{
		GameState.isPSDDeployed = false
		this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, this.despawn, this)
		this.playReverse('psd-deploy', true)
		this.clearAllField()
	}

	private onDeployEnter()
	{
		GameState.isPSDDeployed = true
		this.spawn(this.x, this.y).play('psd-deploy', true)
		this.generateField()
	}

	private clearAllField()
	{
		this.innerField?.clearField()
		this.outerField?.clearField()
	}

	private generateField()
	{
		this.innerField = new psdField(this.scene, this.x - 16, this.y - 16)
		this.innerField.makeNextLevel(1)

		this.outerField = new psdField(this.scene, this.x - 16, this.y - 16)
		this.outerField.makeNextLevel(3)
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
