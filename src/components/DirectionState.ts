
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { DIRECTION } from "../types/direction";
/* END-USER-IMPORTS */

export default class DirectionState extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__DirectionState"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.stateMachine = new StateMachine(this, 'direction')
		this.stateMachine.addState('unactive')
		.addState('left', {
			onEnter: this.onLeftEnter
		})
		.addState('right', {
			onEnter: this.onRightEnter
		})
		.addState('back', {
			onEnter: this.onBackEnter
		})
		.addState('front', {
			onEnter: this.onFrontEnter
		})
		.setState('unactive')
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): DirectionState {
		return (gameObject as any)["__DirectionState"];
	}

	private gameObject: Phaser.GameObjects.Sprite;
	public leftAnims: string = "";
	public rightAnims: string = "";
	public frontAnims: string = "";
	public backAnims: string = "";

	/* START-USER-CODE */
	private stateMachine: StateMachine
	// Write your code here.
	update(dt: number)
	{
		this.stateMachine.update(dt)
	}

	setID(id: string)
	{
		this.stateMachine.setID(id)
	}

	setMachState(num: number)
	{
		switch (num) {
			case DIRECTION.BACK: {
				this.stateMachine.setState('back')
				break
			}
			case DIRECTION.FRONT: {
				this.stateMachine.setState('front')
				break
			}
			case DIRECTION.LEFT: {
				this.stateMachine.setState('left')
				break
			}
			case DIRECTION.RIGHT: {
				this.stateMachine.setState('right')
				break
			}

			default: {
				console.error('direction has no such state')
			}
		}
	}

	private onLeftEnter()
	{
		this.gameObject.play(this.leftAnims, true)
	}

	private onRightEnter()
	{
		this.gameObject.play(this.rightAnims, true)
	}

	private onFrontEnter()
	{
		this.gameObject.play(this.frontAnims, true)
	}

	private onBackEnter()
	{
		this.gameObject.play(this.backAnims, true)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
