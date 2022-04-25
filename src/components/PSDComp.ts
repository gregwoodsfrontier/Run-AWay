
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { PSD_STATE } from "../types/PSD";
import { DIRECTION, getDirectionName } from "../types/direction";
import Physics from "./Physics";
import JustMovement from "./JustMovement";
/* END-USER-IMPORTS */

export default class PSDComp extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__PSDComp"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		const scene = this.gameObject.scene
		const {x, y} = this.gameObject

		this.sprite = scene.physics.add.sprite(x, y, 'playerPSDeq', 3)
		this.sprite.play('bppsd-back-idle-none')

		this.stateMachine = new StateMachine(this, 'PSD')
		this.stateMachine.addState(PSD_STATE.EQIUP_IDLE, {
			onEnter: this.onEquipIdleEnter
		})
		.addState(PSD_STATE.EQUIP_WALK, {
			onUpdate: this.onEquipWalkUpdate
		})
		.addState(PSD_STATE.DEPLOY, {
			onEnter: this.onDeployEnter,
			onExit: this.onDeployExit
		})
		.setState(PSD_STATE.EQIUP_IDLE)


		this.sprite.setVisible(false)
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): PSDComp {
		return (gameObject as any)["__PSDComp"];
	}

	private gameObject: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */
	public stateMachine: StateMachine;
	public sprite: Phaser.Physics.Arcade.Sprite;
	private facingDir = DIRECTION.BACK
	private isHold = false
	private isAimMode = false
	// Write your code here.

	update(dt: number)
	{
		this.sprite.depth = this.gameObject.depth + 10
		// this.stateMachine.update(dt)
		this.updatePSDPos()
	}

	updatePSDPos()
	{
		this.sprite.setPosition(
			this.gameObject.x,
			this.gameObject.y
		)
	}

	setFacingDir(dir: number)
	{
		this.facingDir = dir
	}

	setAimState(boo: boolean)
	{
		this.isAimMode = boo
	}

	setHoldState(boo: boolean)
	{
		this.isHold = boo
	}

	private onEquipIdleEnter()
	{
		this.sprite.setVisible(true)
		this.sprite.setVelocity(0, 0)
		this.sprite.setPosition(this.gameObject.x, this.gameObject.y)

		// play idle anims
		const dirName = getDirectionName(this.facingDir)
		let holdName = ''

		if(this.isHold)
		{
			holdName = 'hold'
		}
		else
		{
			holdName = 'none'
		}

		if(dirName === 'front')
		{
			this.sprite.setVisible(false)
			return
		}

		this.sprite.play(`bppsd-${dirName}-idle-${holdName}`, true)
	}

	private onEquipWalkUpdate()
	{
		if(this.facingDir === DIRECTION.FRONT)
		{
			this.sprite.setVisible(false)
			return
		}

		this.sprite.setVisible(true)
		// this.movePSD()

		if(this.isAimMode)
		{
			return
		}

		// play walk anims
		const dirName = getDirectionName(this.facingDir)
		let holdName = ''

		if(this.isHold)
		{
			holdName = 'hold'
		}
		else
		{
			holdName = 'none'
		}

		this.sprite.play(`bppsd-${dirName}-walk-${holdName}`, true)
	}

	/* private movePSD()
	{
		const speed = JustMovement.getComponent(this.gameObject).speed
		const body = this.sprite.body as Phaser.Physics.Arcade.Body

		if(!speed){
			console.error('just movement is undefined in player.')
			return
		}

		if(!body)
		{
			return
		}

		switch(this.facingDir) {
			case DIRECTION.FRONT: {
				// this.sprite.setVelocity(0, speed)
				break
			}
			case DIRECTION.BACK: {
				body.setVelocity(0, -speed)
				break
			}
			case DIRECTION.LEFT: {
				body.setVelocity(-speed, 0)
				break
			}
			case DIRECTION.RIGHT: {
				body.setVelocity(speed, 0)
				break
			}
		}
	} */

	private onDeployEnter()
	{
		// hide the PSD
		this.sprite.setVisible(false)
		// emit event to Level to deploy PSD
		this.gameObject.scene.events.emit('deploy-PSD')
	}

	private onDeployExit()
	{
		this.gameObject.scene.events.emit('takeback-PSD')
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
