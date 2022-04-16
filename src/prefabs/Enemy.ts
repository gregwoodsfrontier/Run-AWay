
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
import DepthSortY from "../components/DepthSortY";
import FollowTarget from "../components/FollowTarget";
import AnimationV2 from "../components/AnimationV2";
import JustMovement from "../components/JustMovement";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Enemy extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "swarm-front-walk-1", frame);

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.width = 32;
		thisPhysics.height = 40;
		thisPhysics.offsetX = 16;
		thisPhysics.offsetY = 26;
		new DepthSortY(this);
		const thisFollowTarget = new FollowTarget(this);
		thisFollowTarget.range = 130;
		new AnimationV2(this);
		const thisJustMovement = new JustMovement(this);
		thisJustMovement.speed = 90;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
