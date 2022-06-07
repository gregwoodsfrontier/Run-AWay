
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CheckDistance extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Container) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__CheckDistance"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Container): CheckDistance {
		return (gameObject as any)["__CheckDistance"];
	}

	private gameObject: Phaser.GameObjects.Container;
	public limit: number = 0;
	public target!: Phaser.GameObjects.GameObject;

	/* START-USER-CODE */

	// Write your code here.
	update()
	{
		if(this.checkTrueIfWithin())
		{
			this.execute()
		}
	}

	execute(){}

	checkTrueIfWithin()
	{
		if(!this.target.x || !this.target.y)
		{
			return
		}
		
		const distance = Phaser.Math.Distance.Between(this.gameObject.x, this.gameObject.y, this.target.x, this.target.y)
		
		return distance < this.limit
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
