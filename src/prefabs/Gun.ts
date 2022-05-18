
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { DIRECTION } from "../types/direction";
import { getDirectionName } from "../types/direction";
enum STATES {
	IDLE = 'IDLE',
	WALK = 'WALK'
}
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
		this.SM.addState(STATES.IDLE, {
			onEnter: this.onIdleEnter
		})
		.addState(STATES.WALK, {
			onUpdate: this.onWalkUpdate
		})
		.setState(STATES.IDLE)
	}

	private sceneUpdate(dt: number)
	{
		this.SM?.update(dt)
	}

	setToWalkWithDir(dir: number)
	{
		this.setDirection(dir)
		this.SM?.setState(STATES.WALK)
	}

	setToIdleWithDir(dir: number)
	{
		this.setDirection(dir)
		this.SM?.setState(STATES.IDLE)
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

		this.setTexture(`${dirName}-gunonly-1`)
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
