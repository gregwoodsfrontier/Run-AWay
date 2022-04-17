
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
		
		
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): SelectionSquare {
		return (gameObject as any)["__SelectionSquare"];
	}

	private gameObject: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */
	private selectSquare!: Phaser.GameObjects.Rectangle

	// Write your code here.
	start()
	{
		const {scene, x, y} = this.gameObject
		this.selectSquare = scene.add.rectangle(x, y, 32, 32, 0xff0000, 0).setDepth(1000)
		this.selectSquare.setStrokeStyle(2, 0xff0000)

		this.gameObject.scene.events.on('selection-sq', this.updateSelectionSquare, this)
	}

	private updateSelectionSquare(dir: number, distance: number = 70)
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
				this.selectSquare.setPosition(x, y - distance)
				break
			}
			case DIRECTION.LEFT: {
				this.selectSquare.setPosition(x - distance, y)
				break
			}
			case DIRECTION.RIGHT: {
				this.selectSquare.setPosition(x + distance, y)
				break
			}
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
