
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { AIM_STATE } from "../types/aimCompState";
import JustMovement from "./JustMovement";
import Physics from "./Physics";
import { DIRECTION } from "../types/direction";
/* END-USER-IMPORTS */

export default class AimComp {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		this.gameObject = gameObject;
		(gameObject as any)["__AimComp"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.stateMachine = new StateMachine(this, 'aim-comp')
		this.stateMachine.addState(AIM_STATE.EMPTY, {
			onEnter: this.onEmptyEnter
		})
		.addState(AIM_STATE.STAY, {
			onEnter: this.onIdleEnter
		})
		.addState(AIM_STATE.WALK, {
			onUpdate: this.onWalkUpdate
		})

		this.stateMachine.setState(AIM_STATE.EMPTY)


		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): AimComp {
		return (gameObject as any)["__AimComp"];
	}

	private gameObject: Phaser.GameObjects.Sprite;
	public stateMachine!: StateMachine;
	public facingDir: number = 0;
	public movingDir: number = 0;

	/* START-USER-CODE */
	// Write your code here.
	private checkCompRequirements()
	{
		if(!Physics.getComponent(this.gameObject) || !JustMovement.getComponent(this.gameObject))
		{
			return false
		}

		return true
	}

	private onEmptyEnter()
	{
		// clear tint to exit Aim mode
		this.gameObject.clearTint()
	}

	private onIdleEnter()
	{
		if(!this.checkCompRequirements())
		{
			return
		}

		const movementComp = JustMovement.getComponent(this.gameObject)

		this.displayAimMode()

		movementComp.stayStill()
	}

	setFacingDir(dir: number)
	{
		this.facingDir = dir
	}

	setMovingDir(dir: number)
	{
		this.movingDir = dir
	}

	private onWalkUpdate()
	{
		this.displayAimMode()

		const movementComp = JustMovement.getComponent(this.gameObject)

		if(this.facingDir === DIRECTION.FRONT || this.facingDir === DIRECTION.BACK)
		{
			switch (this.movingDir)
			{
				case DIRECTION.LEFT: {
					movementComp.moveLeft()
					break
				}

				case DIRECTION.RIGHT: {
					movementComp.moveRight()
					break
				}

				default: {
					console.warn('you cannot move along your facing direction.')
					break
				}
			}

		}
		else
		{
			switch (this.movingDir) {
				case DIRECTION.BACK: {
					movementComp.moveUp()
					break
				}

				case DIRECTION.FRONT: {
					movementComp.moveDown()
					break
				}

				default: {
					console.warn('you cannot move along your facing direction.')
					break
				}
			}
		}
	}

	private displayAimMode()
	{
		this.gameObject.setTint(0x00ffff)
	}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
