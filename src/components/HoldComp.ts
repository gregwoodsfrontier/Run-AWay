
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { DIRECTION, getDirectionName } from "../types/direction";
import { HOLD_ITEM } from "../types/holdItem";
import JustMovement from "./JustMovement";
import Physics from "./Physics";
/* END-USER-IMPORTS */

export default class HoldComp extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__HoldComp"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.stateMachine = new StateMachine(this, "hold")

		this.stateMachine.addState("empty", {
			onUpdate: this.onEmptyUpdate
		})
		.addState("hold-idle", {
			onEnter: this.onHoldIdleEnter
		})
		.addState("hold-walk", {
			onUpdate: this.onHoldWalkUpdate
		})

		this.stateMachine.setState("empty")

		const {scene, x, y} = this.gameObject

		this.gunSprite = scene.add.sprite(x, y, "front-gunonly-idle")
		this.gObjMovement = JustMovement.getComponent(this.gameObject)

		this.gunPhysics = new Physics(this.gunSprite)
		this.gunMovement = new JustMovement(this.gunSprite)

		// this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.stateUpdate, this);
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): HoldComp {
		return (gameObject as any)["__HoldComp"];
	}

	private gameObject: Phaser.GameObjects.Sprite;
	public stateMachine: StateMachine;
	public direction: number = 1;
	public item: number = 0;

	/* START-USER-CODE */
	private gunSprite: Phaser.GameObjects.Sprite
	private gObjMovement: JustMovement
	private gunPhysics: Physics
	private gunMovement: JustMovement

	// Write your code here.
	private onEmptyUpdate()
	{

	}

	private onHoldIdleEnter()
	{
		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		this.gunSprite.play(`${dirName}-gunonly-idle`, true)
	}

	private assignGunSpeedTo(spd: number)
	{
		this.gunMovement.speed = spd
	}

	private onHoldWalkUpdate()
	{
		if(!this.gObjMovement)
		{
			console.error('just movement comp is not present on game object.')
			return
		}

		this.assignGunSpeedTo(this.gObjMovement.speed)		

		if(this.item < 1)
		{
			console.error('game object should be holding something.')
			return
		}

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
