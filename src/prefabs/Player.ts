
// You can write more code here
/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
import KeyboardInput from "../components/KeyboardInput";
import JustMovement from "../components/JustMovement";
import DepthSortY from "../components/DepthSortY";
import AnimationV2 from "../components/AnimationV2";
import CameraFollow from "../components/CameraFollow";
import HoldComp from "../components/HoldComp";
import AimComp from "../components/AimComp";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { PLAYER_STATE } from "../types/playerState";
import { DIRECTION, getDirectionName } from "../types/direction";
/* END-USER-IMPORTS */

export default class Player extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "playerOnly-4", frame);

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.width = 32;
		thisPhysics.height = 40;
		thisPhysics.offsetX = 16;
		thisPhysics.offsetY = 26;
		new KeyboardInput(this);
		const thisJustMovement = new JustMovement(this);
		thisJustMovement.speed = 150;
		new DepthSortY(this);
		new AnimationV2(this);
		new CameraFollow(this);
		new HoldComp(this);
		new AimComp(this);

		/* START-USER-CTR-CODE */
		// Write your code here.

		this.stateMachine = new StateMachine(this, 'player')
		this.stateMachine.addState(PLAYER_STATE.IDLE, {
			onEnter: this.onIdleEnter
		})
		.addState(PLAYER_STATE.WALK, {
			onUpdate: this.onWalkUpdate
		})
		.addState(PLAYER_STATE.HOLD)
		.addState(PLAYER_STATE.AIM)

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);

		this.direction = DIRECTION.FRONT
		this.playerMovement = JustMovement.getComponent(this)
		this.playerAnims = AnimationV2.getComponent(this)
		this.playerHold = HoldComp.getComponent(this)
		this.playerAim = AimComp.getComponent(this)

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
	private stateMachine: StateMachine
	private playerMovement: JustMovement
	private playerAnims: AnimationV2
	private playerHold: HoldComp
	private playerAim: AimComp
	//@ts-ignore
	private direction: number

	start()
	{
		this.stateMachine.setState(PLAYER_STATE.IDLE)
		this.playerHold.stateMachine.setState('empty')
	}

	update(dt: number)
	{
		this.stateMachine.update(dt)
		this.playerHold.stateMachine.update(dt)
	}

	private onIdleEnter()
	{
		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		this.playerMovement.stayStill()
		this.playerAnims.playAnims({
			character: 'player',
			direction: dirName,
			state: 'idle'
		})

	}

	private onWalkUpdate()
	{
		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		switch (this.direction) {
			case DIRECTION.BACK: {
				this.playerMovement.moveUp()
				break
			}

			case DIRECTION.FRONT: {
				this.playerMovement.moveDown()
				break
			}

			case DIRECTION.LEFT: {
				this.playerMovement.moveLeft()
				break
			}

			case DIRECTION.RIGHT: {
				this.playerMovement.moveRight()
				break
			}
		}

		this.playerAnims.playAnims({
			character: 'player',
			direction: dirName,
			state: 'walk'
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
