
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import StateMachine from "../stateMachine";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlayerV2 extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "playerByTP", frame ?? "playerOnly-4.png");

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.stateM = new StateMachine(this, 'player-V2')
		this.stateM.addState('idle')
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	private stateM: StateMachine

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
