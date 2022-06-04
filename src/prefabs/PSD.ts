
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
/* START-USER-IMPORTS */
import eventsCenter from "../EventsCenter";
import { GameState } from "../manager/gameState";
import StateMachine from "../stateMachine";
import { AUDIO_PLAY_EVENTS } from "../types/scenes";
import PSDField from "./psdField";
import { DEPLOY_PSD_STATES } from "../types/PSD";
import { EVENTKEYS } from "../types/eventKeys";
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
		this.stateMachine.addState(DEPLOY_PSD_STATES.BACKPACK, {
			onEnter: this.onBackpackEnter
		})
		.addState(DEPLOY_PSD_STATES.DEPLOY, {
			onEnter: this.onDeployEnter
		})
		.setState(DEPLOY_PSD_STATES.BACKPACK)

		// this.innerField = new PSDField(this.scene, this.x - 16, this.y - 16)
		this.innerField = new PSDField(this.scene, -200, 0)
		this.innerField.makeNextLevel(1)
		
		// this.outerField = new PSDField(this.scene, this.x - 16, this.y - 16)
		this.outerField = new PSDField(this.scene, -200, 0)
		this.outerField.makeNextLevel(3)
		/* END-USER-CTR-CODE */
	}

	public HP: number = 100;
	public energy: number = 100;

	/* START-USER-CODE */
	public stateMachine: StateMachine
	public innerField?: PSDField
	public outerField?: PSDField
	// Write your code here.
	public deploy()
	{
		this.stateMachine.setState(DEPLOY_PSD_STATES.DEPLOY)
	}

	public returnToPlayer()
	{
		this.stateMachine.setState(DEPLOY_PSD_STATES.BACKPACK)
	}

	private onBackpackEnter()
	{
		GameState.setPSDDeploy(false)
		eventsCenter.emit(AUDIO_PLAY_EVENTS.DEPLOY)
		this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
			this.scene.time.delayedCall(500, () => {
				this.despawn();
				this.clearAllField()
				this.scene.events.emit(EVENTKEYS.PSD_FULLY_SHUTDOWN)
			})
		}, this)
		this.play('psd-return', true)		
	}	

	private onDeployEnter()
	{
		GameState.setPSDDeploy(true)
		eventsCenter.emit(AUDIO_PLAY_EVENTS.DEPLOY)
		this.spawn(this.x, this.y).play('psd-deploy', true)
		this.generateField()
	}

	private clearAllField()
	{
		// this.innerField?.clearField()
		// this.outerField?.clearField()
		this.innerField?.setPosition(-200, 0)
		this.outerField?.setPosition(-200, 0)
	}

	private generateField()
	{
		if(GameState.energy < 10)
		{
			console.error('you dont have energy for PSD')
		}
		else if(GameState.energy < 70)
		{
			console.error('can only deploy inner field')
			eventsCenter.emit(AUDIO_PLAY_EVENTS.FIELD_START)
			this.innerField?.setPosition(this.x - 16, this.y -16)
			return
		}
		else
		{
			eventsCenter.emit(AUDIO_PLAY_EVENTS.FIELD_START)
			this.innerField?.setPosition(this.x - 16, this.y -16)
			this.outerField?.setPosition(this.x - 16, this.y -16)
		}
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
