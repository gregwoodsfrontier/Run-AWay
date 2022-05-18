
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

export default class BackpackPSD extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "left-walk-01", frame);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.sceneUpdate, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	private direction = DIRECTION.LEFT
	private isHold = false
	private SM?: StateMachine
	// Write your code here.
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

	setHoldState(boo: boolean)
	{
		this.isHold = boo
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

	giveHoldStateStr()
	{
		if(this.isHold)
		{
			return 'hold'
		}
		return 'walk'
	}

	private onIdleEnter()
	{
		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		this.setTexture(`${dirName}-walk-01`)
	}

	private onWalkUpdate()
	{
		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		const hold = this.giveHoldStateStr()

		this.play(`${dirName}-${hold}`, true)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
