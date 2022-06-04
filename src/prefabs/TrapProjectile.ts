
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
import JustMovement from "../components/JustMovement";
/* START-USER-IMPORTS */
export interface IPhysicsComp {
	width: number,
	height: number,
	offsetX: number,
	offsetY: number
}
/* END-USER-IMPORTS */

export default class TrapProjectile extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "raw-break-interact", frame ?? 77);

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.width = 32;
		thisPhysics.height = 16;
		thisPhysics.offsetY = 8;
		const thisJustMovement = new JustMovement(this);
		thisJustMovement.speed = 50;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	setPhysicsData(data: IPhysicsComp)
	{
		const thisPhysics = new Physics(this);
		thisPhysics.width = data.width
		thisPhysics.height = data.height
		thisPhysics.offsetX = data.offsetX
		thisPhysics.offsetY = data.offsetY
	}

	setMovementSpeed(spd: number)
	{
		const thisJustMovement = new JustMovement(this);
		thisJustMovement.speed = spd;
	}

	// Write your code here.
	despawn()
	{
		this.destroy()
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
