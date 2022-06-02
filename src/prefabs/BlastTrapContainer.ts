
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import BlastTrapV2 from "./BlastTrapV2";
import TrapProjectile from "./TrapProjectile";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class BlastTrapContainer extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// blastTrapV2
		const blastTrapV2 = new BlastTrapV2(scene, 0, 0);
		this.add(blastTrapV2);

		// trapProjectile_right
		const trapProjectile_right = new TrapProjectile(scene, 32, 0);
		trapProjectile_right.visible = true;
		this.add(trapProjectile_right);

		// trapProjectile_up
		const trapProjectile_up = new TrapProjectile(scene, 0, -16);
		trapProjectile_up.angle = -90;
		trapProjectile_up.visible = true;
		this.add(trapProjectile_up);

		// trapProjectile_left
		const trapProjectile_left = new TrapProjectile(scene, -32, 0);
		trapProjectile_left.angle = -180;
		trapProjectile_left.visible = true;
		this.add(trapProjectile_left);

		// trapProjectile_down
		const trapProjectile_down = new TrapProjectile(scene, 0, 32);
		trapProjectile_down.angle = 90;
		trapProjectile_down.visible = true;
		this.add(trapProjectile_down);

		this.blastTrapV2 = blastTrapV2;
		this.trapProjectile_right = trapProjectile_right;
		this.trapProjectile_up = trapProjectile_up;
		this.trapProjectile_left = trapProjectile_left;
		this.trapProjectile_down = trapProjectile_down;

		this.trapProjArr = [
			this.trapProjectile_down,
			this.trapProjectile_left,
			this.trapProjectile_right,
			this.trapProjectile_up
		]

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this)
      	this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
		/* END-USER-CTR-CODE */
	}

	public blastTrapV2: BlastTrapV2;
	public trapProjectile_right: TrapProjectile;
	public trapProjectile_up: TrapProjectile;
	public trapProjectile_left: TrapProjectile;
	public trapProjectile_down: TrapProjectile;

	/* START-USER-CODE */
	private trapProjArr: TrapProjectile[]

	// Write your code here.
	start()
	{
		this.trapProjArr.forEach(item => {
			const proj = item as TrapProjectile
			proj.visible = false
		})
	}

	update()
	{

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
