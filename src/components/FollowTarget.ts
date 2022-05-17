
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import JustMovement from "./JustMovement";
import { DIRECTION } from "../types/direction";
/* END-USER-IMPORTS */

export default class FollowTarget extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__FollowTarget"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		// this.target = this.gameObject.scene.add.sprite(-50, -50, "playerHoldGun-20")
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): FollowTarget {
		return (gameObject as any)["__FollowTarget"];
	}

	private gameObject: Phaser.GameObjects.Sprite;
	public target!: Phaser.GameObjects.Sprite;
	public range: number = 35;
	public deadRangeX: number = 15;
	public deadRangeY: number = 60;

	/* START-USER-CODE */
	public active = true
	// Write your code here.
	update()
	{
		if(!this.active)
		{
			return
		}

		if(!this.checkRequireComps())
		{
			return
		}

		if(!this.checkWithinRange())
		{
			// this.gameObject.emit('move', DIRECTION.BACK)
			// this.gameObject.emit('stay-still')
			return
		}

		this.moveToTarget()
	}

	deactivate()
	{
		this.active = false
	}

	activate()
	{
		this.active = true
	}

	moveToTarget()
	{
		const diffX = this.target.x - this.gameObject.x
		const diffY = this.target.y - this.gameObject.y
		// const moveComp = JustMovement.getComponent(this.gameObject)

		if(diffX > this.deadRangeX)
		{
			this.gameObject.emit('move', DIRECTION.RIGHT)
		}
		else if(diffX < -this.deadRangeX)
		{
			this.gameObject.emit('move', DIRECTION.LEFT)
		}
		else if(diffY > this.deadRangeY)
		{
			this.gameObject.emit('move', DIRECTION.FRONT)
		}
		else if(diffY < -this.deadRangeY)
		{
			this.gameObject.emit('move', DIRECTION.BACK)
		}
		else
		{
			this.gameObject.emit('attack')
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
