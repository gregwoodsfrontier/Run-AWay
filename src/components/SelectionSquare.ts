
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import { DIRECTION } from "../types/direction";
/* END-USER-IMPORTS */

export default class SelectionSquare extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__SelectionSquare"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.dir = 0

		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): SelectionSquare {
		return (gameObject as any)["__SelectionSquare"];
	}

	private gameObject: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */
	private selectSquare!: Phaser.GameObjects.Zone
	private dir: number

	// Write your code here.
	start()
	{
		const {scene, x, y} = this.gameObject
		// this.selectSquare = scene.add.rectangle(x, y, 32, 32, 0xff0000, 0).setDepth(1000)
		this.selectSquare = scene.add.zone(x, y, 32, 32)
		scene.physics.world.enable(this.selectSquare);
		(this.selectSquare.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
		(this.selectSquare.body as Phaser.Physics.Arcade.Body).moves = false;
		// this.selectSquare.setStrokeStyle(2, 0xff0000)

		// this.gameObject.scene.events.on('selection-sq', this.updateSelectionSquare, this)
	}

	getSelectionSquare()
	{
		return this.selectSquare
	}

	setDir(dir: number)
	{
		this.dir = dir
	}

	update()
	{
		this.showSquare()
		this.updateSelectionSquare(this.dir)
	}

	private showSquare()
	{
		const body = this.selectSquare.body as Phaser.Physics.Arcade.Body
		body.debugBodyColor = body.touching.none ? 0x00ffff : 0xffff00;
	}


	private updateSelectionSquare(dir: number, distance: number = 50)
	{
		if(!this.selectSquare)
		{
			return
		}

		const {x, y} = this.gameObject

		switch(dir)
		{
			case DIRECTION.FRONT: {
				this.selectSquare.setPosition(x, y + distance)
				break
			}
			case DIRECTION.BACK: {
				this.selectSquare.setPosition(x, y - 0.8 * distance)
				break
			}
			case DIRECTION.LEFT: {
				this.selectSquare.setPosition(x - 0.7*distance, y + 16)
				break
			}
			case DIRECTION.RIGHT: {
				this.selectSquare.setPosition(x + 0.7*distance, y + 16)
				break
			}
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
