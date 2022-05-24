
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
import JustMovement from "../components/JustMovement";
import DepthSortY from "../components/DepthSortY";
import AnimationV2 from "../components/AnimationV2";
import CameraFollow from "../components/CameraFollow";
import SelectionSquare from "../components/SelectionSquare";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class JustPlayer extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "playerByTP", frame ?? "playerOnly-24.png");

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.width = 28;
		thisPhysics.height = 28;
		thisPhysics.offsetX = 18;
		thisPhysics.offsetY = 26;
		const thisJustMovement = new JustMovement(this);
		thisJustMovement.speed = 155;
		new DepthSortY(this);
		new AnimationV2(this);
		new CameraFollow(this);
		new SelectionSquare(this);

		/* START-USER-CTR-CODE */
		// Write your code here.
		// this.play(`player-left-walk-none`)
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
