
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ZoneComp from "../components/ZoneComp";
import Physics from "../components/Physics";
import { time } from "console";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MudTrap extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "raw-break-interact", frame ?? 88);

		// this (components)
		const thisZoneComp = new ZoneComp(this);
		thisZoneComp.width = 25;
		thisZoneComp.height = 25;
		const thisPhysics = new Physics(this);
		thisPhysics.static = true;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.setFrame(88 + Phaser.Math.Between(0, 3))
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
	getZone()
	{
		return ZoneComp.getComponent(this).zone	
	}

	start()
	{
		const sceneInstance = this.scene.scene.get(this.scene.scene.key)
		if(!sceneInstance || !sceneInstance.player)
		{
			return
		}


	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
