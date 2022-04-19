
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { PSD_STATE } from "../types/PSD";
/* END-USER-IMPORTS */

export default class PSDComp {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		this.gameObject = gameObject;
		(gameObject as any)["__PSDComp"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		const scene = this.gameObject.scene
		const {x, y} = this.gameObject

		this.stateMachine = new StateMachine(this, 'PSD')
		this.stateMachine.addState(PSD_STATE.EQIUP_IDLE)
		.addState(PSD_STATE.EQUIP_WALK)
		.addState(PSD_STATE.EQUIP_HOLD_IDLE)
		.addState(PSD_STATE.EQUIP_HOLD_WALK)
		.addState(PSD_STATE.DEPLOY)
		.setState(PSD_STATE.EQIUP_IDLE)

		this.sprite = scene.add.sprite(x, y, 'bppsd-back-idle-none')
		// this.sprite.setVisible(false)
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): PSDComp {
		return (gameObject as any)["__PSDComp"];
	}

	private gameObject: Phaser.GameObjects.Sprite;
	

	/* START-USER-CODE */
	public stateMachine: StateMachine;
	public sprite: Phaser.GameObjects.Sprite;
	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
