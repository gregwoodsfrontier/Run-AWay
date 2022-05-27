
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import DepthSortY from "../components/DepthSortY";
import AnimationV2 from "../components/AnimationV2";
import CameraFollow from "../components/CameraFollow";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class JustPlayer extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "playerByTP", frame ?? "playerOnly-24.png");

		// this (components)
		new DepthSortY(this);
		new AnimationV2(this);
		new CameraFollow(this);

		/* START-USER-CTR-CODE */
		// Write your code here.
		// this.play(`player-left-walk-none`)
		this.start()
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
	start()
	{
		this.play('player-front-walk-none', true)
	}

	/* update()
	{

	} */

	private playMoveLeftAnims()
	{
		console.log('move-left is received')
		this.play('player-left-walk-none')
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
