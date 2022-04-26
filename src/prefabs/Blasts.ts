
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Blasts extends Phaser.GameObjects.Sprite {
	public wall: Phaser.GameObjects.Sprite;

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "raw-break-interact" , frame ?? 100);

		/* START-USER-CTR-CODE */
		this.scene.physics.add.existing(this)
		this.play("trap-explode-projectile");
		/* END-USER-CTR-CODE */
	}

	DamagePlayer(obj1?:Phaser.GameObjects.Sprite , obj2? :Phaser.GameObjects.Sprite){
		//set the player's damage
	}

	/* START-USER-CODE */
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
