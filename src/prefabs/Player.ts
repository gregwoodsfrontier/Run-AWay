
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
import { HOLD_COMP_STATE } from "../types/holdCompState";
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
			// onEnter: this.onWalkEnter,
			onUpdate: this.onWalkUpdate
		})
		.addState(PLAYER_STATE.HOLD_IDLE, {
			onEnter: this.onHoldIdleEnter
		})
		.addState(PLAYER_STATE.HOLD_WALK, {
			// onEnter: this.onHoldWalkEnter
			onUpdate: this.onHoldWalkUpdate
		})
		.addState(PLAYER_STATE.AIM)

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.Update, this);

		this.direction = DIRECTION.FRONT
		this.playerMovement = JustMovement.getComponent(this)
		this.playerAnims = AnimationV2.getComponent(this)
		this.playerHold = HoldComp.getComponent(this)
		this.playerAimComp = AimComp.getComponent(this)
		this.playerKeyboard = KeyboardInput.getComponent(this)

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
	private stateMachine: StateMachine
	private playerMovement: JustMovement
	private playerKeyboard: KeyboardInput
	private playerAnims: AnimationV2
	private playerHold: HoldComp
	private playerAimComp: AimComp
	private flipSwitch = false
	//@ts-ignore
	private direction: number

	start()
	{
		this.stateMachine.setState(PLAYER_STATE.IDLE)
		this.playerHold.stateMachine.setState(HOLD_COMP_STATE.EMPTY)

		this.handleStateSwitching()

	}

	Update(dt: number)
	{
		this.stateMachine.update(dt)
		this.playerHold.stateMachine.update(dt)
	}

	private onIdleUpdate()
	{
		// console.log('idle update')
	}

	private handleStateSwitching()
	{
		this.playerKeyboard.executeLeft = () => {
			this.direction = DIRECTION.LEFT

			this.handleNonEmptyHoldState()
		}
		this.playerKeyboard.executeRight = () => {
			this.direction = DIRECTION.RIGHT

			this.handleNonEmptyHoldState()
		}
		this.playerKeyboard.executeUp = () => {
			this.direction = DIRECTION.BACK

			this.handleNonEmptyHoldState()
		}
		this.playerKeyboard.executeDown = () => {
			this.direction = DIRECTION.FRONT

			this.handleNonEmptyHoldState()
			
		}
		this.playerKeyboard.executeKeyUp = () => {
			if(this.stateMachine.isCurrentState(PLAYER_STATE.WALK))
			{
				this.stateMachine.setState(PLAYER_STATE.IDLE)
				this.playerHold.stateMachine.setState(HOLD_COMP_STATE.EMPTY)
			}
			else if(this.stateMachine.isCurrentState(PLAYER_STATE.HOLD_WALK))
			{
				this.stateMachine.setState(PLAYER_STATE.HOLD_IDLE)
				this.playerHold.stateMachine.setState(HOLD_COMP_STATE.IDLE)
			}
		}

		// space should be toggling the raise gun logic
		this.playerKeyboard.executeSpace = () => {
			if(this.stateMachine.isCurrentState(PLAYER_STATE.WALK) || this.stateMachine.isCurrentState(PLAYER_STATE.HOLD_WALK))
			{
				console.error('space toggling for gun mode is disabled during walk state')
				return
			}

			if(!this.flipSwitch)
			{
				this.updateHoldDir()
				this.playerHold.stateMachine.setState(HOLD_COMP_STATE.IDLE)
				this.stateMachine.setState(PLAYER_STATE.HOLD_IDLE)
				this.flipSwitch = !this.flipSwitch
				return
			}

			this.playerHold.stateMachine.setState(HOLD_COMP_STATE.EMPTY)
			this.stateMachine.setState(PLAYER_STATE.IDLE)
			this.flipSwitch = !this.flipSwitch

		}
	}

	private handleNonEmptyHoldState()
	{
		if(this.playerHold.stateMachine.isCurrentState(HOLD_COMP_STATE.EMPTY))
		{
			this.stateMachine.setState(PLAYER_STATE.WALK)
			return
		}

		this.stateMachine.setState(PLAYER_STATE.HOLD_WALK)
		this.playerHold.stateMachine.setState(HOLD_COMP_STATE.WALK)
	}

	private updateHoldDir()
	{
		this.playerHold.direction = this.direction
	}

	// private onHoldWalkEnter()
	private onHoldWalkUpdate()
	{
		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		this.handlePlayerMovement()
		this.updateHoldDir()

		this.playerAnims.playAnims({
			character: 'player',
			direction: dirName,
			state: 'walk',
			holdState: 'hold'
		})
	}

	private onHoldIdleEnter()
	{
		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		this.updateHoldDir()

		this.playerMovement.stayStill()

		this.playerAnims.playAnims({
			character: 'player',
			direction: dirName,
			state: 'idle',
			holdState: 'hold'
		})
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

	private handlePlayerMovement()
	{
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
	}

	private onWalkUpdate()
	{
		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		this.handlePlayerMovement()

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
