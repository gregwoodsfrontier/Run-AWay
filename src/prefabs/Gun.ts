
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { DIRECTION } from "../types/direction";
import { getDirectionName } from "../types/direction";
import { GUN_STATES } from "../types/gunStates";
/* END-USER-IMPORTS */

export default class Gun extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "left-gunonly-1", frame);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.sceneUpdate, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	// Write your code here.
	private direction = DIRECTION.LEFT
	private SM?: StateMachine

	private start()
	{
		this.direction = DIRECTION.LEFT

		this.SM = new StateMachine(this, 'bpPsd')
		this.SM.addState(GUN_STATES.IDLE, {
			onEnter: this.onIdleEnter
		})
		.addState(GUN_STATES.WALK, {
			onEnter: this.onWalkEnter,
			onUpdate: this.onWalkUpdate
		})
		.addState(GUN_STATES.PUTBACK, {
			onEnter: this.onPutbackEnter
		})
		.setState(GUN_STATES.IDLE)
	}

	isCurrentState(state: string)
	{
		return this.SM?.isCurrentState(state)
	}

	private onWalkEnter()
	{
		this.setVisible(true)
	}

	private onPutbackEnter()
	{
		this.setVisible(false)
	}

	private sceneUpdate(dt: number)
	{
		this.SM?.update(dt)
	}

	setStateWithDir(dir: number, state: string)
	{
		this.setDirection(dir)
		this.SM?.setState(state)
	}

	checkCurrentState(state: string)
	{
		return this.SM?.isCurrentState(state)
	}

	setDirection(dir: number)
	{
		if(dir < 0|| dir > 3)
		{
			console.error('such direction does not exist')
			return
		}

		this.direction = dir
	}

	private onIdleEnter()
	{
		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		const sprName = `${dirName}-gunonly-1`

		this.stop()
		this.setVisible(true)
		this.setTexture(sprName)
		
	}

	private onWalkUpdate()
	{
		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		this.play(`${dirName}-gun`, true)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
