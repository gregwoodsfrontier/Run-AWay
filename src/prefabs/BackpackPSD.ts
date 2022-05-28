
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { DIRECTION } from "../types/direction";
import { getDirectionName } from "../types/direction";
import { PSD_STATES } from "../types/PSD";
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
		this.SM.addState(PSD_STATES.IDLE, {
			onEnter: this.onIdleEnter
		})
		.addState(PSD_STATES.WALK, {
			onEnter: this.onWalkEnter,
			onUpdate: this.onWalkUpdate
		})
		.addState(PSD_STATES.DEPLOY, {
			onEnter: this.onDeployEnter
		})
		.setState(PSD_STATES.IDLE)
	}

	isSMCurrentState(state: string)
	{
		return this.SM?.isCurrentState(state)
	}

	private onDeployEnter()
	{
		// this.setVisible(false)
		this.setAlpha(0)
	}

	private sceneUpdate(dt: number)
	{
		if(this.direction === DIRECTION.FRONT)
		{
			this.setVisible(false)
		}
		else
		{
			this.setVisible(true)
		}

		this.SM?.update(dt)
	}

	setHoldState(boo: boolean)
	{
		this.isHold = boo
	}

	setToWalkWithDir(dir: number)
	{
		this.setDirection(dir)
		this.SM?.setState(PSD_STATES.WALK)
	}

	setToIdleWithDir(dir: number)
	{
		this.setDirection(dir)
		this.SM?.setState(PSD_STATES.IDLE)
	}

	setToDeployWithDir(dir: number)
	{
		this.setDirection(dir)
		this.SM?.setState(PSD_STATES.DEPLOY)
	}

	setDirection(dir: number)
	{
		if(dir < 0 || dir > 3)
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

	private onWalkEnter()
	{
		this.setAlpha(1)
		this.setVisible(true)
	}

	private onIdleEnter()
	{
		const dirName = getDirectionName(this.direction)

		const spr = `${dirName}-walk-01`

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		if(this.direction === DIRECTION.FRONT)
		{
			console.warn('backpack does not have front anims')
			return
		}

		this.stop()
		this.setTexture(spr)
		this.setAlpha(1)
		this.setVisible(true)
	}

	private onWalkUpdate()
	{
		const dirName = getDirectionName(this.direction)

		const hold = this.giveHoldStateStr()

		const spr = `${dirName}-${hold}`

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		if(this.direction === DIRECTION.FRONT)
		{
			console.warn('backpack does not have front anims')
			return
		}

		this.play(spr, true)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
