
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { AIM_STATE } from "../types/aimCompState";
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
	public stateMachine: StateMachine;
	public facingDir: number = 0;
	public movingDir: number = 0;

	/* START-USER-CODE */
	// Write your code here.
	private onEmptyEnter()
	{

	}

	private onIdleEnter()
	{

	}

	private onWalkUpdate()
	{

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
