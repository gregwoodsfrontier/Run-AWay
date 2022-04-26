
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ZoneComp extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__ZoneComp"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		const { scene } = this.gameObject
		this.zone = scene.add.zone(this.LocX, this.LocY, this.width, this.height)
		scene.physics.world.enable(this.zone)

		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): ZoneComp {
		return (gameObject as any)["__ZoneComp"];
	}

	private gameObject: Phaser.GameObjects.Image;
	public LocX: number = 0;
	public LocY: number = 0;
	public width: number = 32;
	public height: number = 32;

	/* START-USER-CODE */
	public zone: Phaser.GameObjects.Zone

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
