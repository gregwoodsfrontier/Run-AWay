
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { DIRECTION, getDirectionName } from "../types/direction";
import { HOLD_ITEM } from "../types/holdItem";
import JustMovement from "./JustMovement";
import Physics from "./Physics";
import { HOLD_COMP_STATE } from "../types/holdCompState";
import { GameState } from "../manager/gameState";
/* END-USER-IMPORTS */

export default class HoldComp {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		this.gameObject = gameObject;
		(gameObject as any)["__HoldComp"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.stateMachine = new StateMachine(this, "hold-comp")

		this.stateMachine.addState(HOLD_COMP_STATE.EMPTY, {
			onEnter: this.onEmptyEnter
		})
		.addState(HOLD_COMP_STATE.IDLE, {
			onEnter: this.onHoldIdleEnter
		})
		.addState(HOLD_COMP_STATE.WALK, {
			onUpdate: this.onHoldWalkUpdate
		})

		this.stateMachine.setState(HOLD_COMP_STATE.EMPTY)

		const {scene} = this.gameObject

		this.gunSprite = scene.add.sprite(-20, -20, "front-gunonly-idle")
		this.disableGun()

		this.gObjMovement = JustMovement.getComponent(this.gameObject)

		this.gunPhysics = new Physics(this.gunSprite)
		this.gunPhysics.offsetX = 32
		this.gunPhysics.offsetY = 32

		this.gunMovement = new JustMovement(this.gunSprite)

		// this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.stateUpdate, this);
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): HoldComp {
		return (gameObject as any)["__HoldComp"];
	}

	private gameObject: Phaser.GameObjects.Sprite;
	public stateMachine!: StateMachine;
	public direction: number = 1;
	public item: number = 0;

	/* START-USER-CODE */
	private gunSprite: Phaser.GameObjects.Sprite
	private gObjMovement: JustMovement
	private gunPhysics: Physics
	private gunMovement: JustMovement
	private hand: number = 0

	// Write your code here.
	private enableGun()
	{
		if(!this.gunSprite)
		{
			return
		}
		this.gunSprite.setActive(true)
		this.gunSprite.setVisible(true)
		this.gunSprite.setDepth(this.gameObject.depth + 60)

		if(!this.gunSprite.body)
		{
			return
		}

		const body = this.gunSprite.body as Phaser.Physics.Arcade.Body
		body.enable = true
		this.gameObject.scene.physics.world.add(body)

	}

	private disableGun()
	{
		if(!this.gunSprite)
		{
			return
		}
		this.gunSprite.setActive(false)
		this.gunSprite.setVisible(false)

		if(!this.gunSprite.body)
		{
			return
		}

		const body = this.gunSprite.body as Phaser.Physics.Arcade.Body
		body.enable = false
		this.gameObject.scene.physics.world.remove(body)
	}

	private onEmptyEnter()
	{
		this.hand = HOLD_ITEM.NONE
		GameState.setGunDeploy(false)
		this.disableGun()
	}

	private onHoldIdleEnter()
	{
		this.hand = HOLD_ITEM.GUN
		GameState.setGunDeploy(true)

		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		this.enableGun()

		this.gunSprite.setPosition(
			this.gameObject.x,
			this.gameObject.y
		)

		this.gunMovement.stayStill()

		this.gunSprite.play(`${dirName}-gunonly-idle`, true)
	}

	private assignGunSpeedTo(spd: number)
	{
		this.gunMovement.speed = spd
	}

	private onHoldWalkUpdate()
	{
		GameState.setGunDeploy(true)
		if(!this.gObjMovement)
		{
			console.error('just movement comp is not present on game object.')
			return
		}

		this.assignGunSpeedTo(this.gObjMovement.speed)		

		if(this.hand < HOLD_ITEM.GUN)
		{
			console.error('game object should be holding something.')
			return
		}

		this.enableGun()

		this.gunSprite.setPosition(
			this.gameObject.x,
			this.gameObject.y
		)

		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		switch (this.direction) {
			case DIRECTION.BACK: {
				this.gunMovement.moveUp()
				break
			}

			case DIRECTION.FRONT: {
				this.gunMovement.moveDown()
				break
			}

			case DIRECTION.LEFT: {
				this.gunMovement.moveLeft()
				break
			}

			case DIRECTION.RIGHT: {
				this.gunMovement.moveRight()
				break
			}
		}

		this.gunSprite.play(`${dirName}-gunonly-walk`, true)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
