
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import JustMovement from "./JustMovement";
/* END-USER-IMPORTS */

export default class FollowTarget extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__FollowTarget"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): FollowTarget {
		return (gameObject as any)["__FollowTarget"];
	}

	private gameObject: Phaser.GameObjects.Sprite;
	public target: Phaser.GameObjects.Sprite;
	public range: number = 35;
	public deadRangeX: number = 15;
	public deadRangeY: number = 60;

	/* START-USER-CODE */

	// Write your code here.
	update()
	{
		if(!this.checkRequireComps())
		{
			return
		}

		if(!this.checkWithinRange())
		{
			return
		}

		this.moveToTarget()
	}

	moveToTarget()
	{
		const diffX = this.target.x - this.gameObject.x
		const diffY = this.target.y - this.gameObject.y
		const moveComp = JustMovement.getComponent(this.gameObject)

		if(diffX > this.deadRangeX)
		{
			moveComp.moveRight()
			// TODO: should emit events of gameObject rather than just move
		}
		else if(diffX < -this.deadRangeX)
		{
			moveComp.moveLeft()
			// TODO: should emit events of gameObject rather than just move
		}
		else if(diffY > this.deadRangeY)
		{
			moveComp.moveDown()
			// TODO: should emit events of gameObject rather than just move
		}
		else if(diffY < -this.deadRangeY)
		{
			moveComp.moveUp()
			// TODO: should emit events of gameObject rather than just move
		}
		else
		{
			moveComp.stayStill()
			// TODO: should emit events of gameObject rather than just move
		}
	}

	checkRequireComps()
	{
		if(!JustMovement.getComponent(this.gameObject))
		{
			console.warn('FollowTarget needs JustMovement comp in order to function')
			return false
		}

		return true
	}

	setTarget(_tar: Phaser.GameObjects.Sprite)
	{
		this.target = _tar
	}

	checkWithinRange()
	{
		if(!this.target || !this.gameObject)
		{
			return
		}

		const distance = Phaser.Math.Distance.BetweenPoints(this.gameObject, this.target)

		return distance <= this.range
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
