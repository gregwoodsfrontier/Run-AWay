
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
import PSDComp from "../components/PSDComp";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { PLAYER_STATE } from "../types/playerState";
import { DIRECTION, getDirectionName } from "../types/direction";
import { HOLD_COMP_STATE } from "../types/holdCompState";
import { AIM_STATE } from "../types/aimCompState";
import { PSD_STATE } from "../types/PSD";
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
		new PSDComp(this);

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
		.addState(PLAYER_STATE.AIM, {
			onEnter: this.onAimEnter
		})

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.Update, this);

		this.direction = DIRECTION.FRONT
		this.playerMovement = JustMovement.getComponent(this)
		this.playerAnims = AnimationV2.getComponent(this)
		this.playerHold = HoldComp.getComponent(this)
		this.playerAimComp = AimComp.getComponent(this)
		this.playerKeyboard = KeyboardInput.getComponent(this)
		this.playerPSD = PSDComp.getComponent(this)

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
	private playerPSD: PSDComp
	private flipSwitch = false
	//@ts-ignore
	private direction: number

	start()
	{
		this.stateMachine.setState(PLAYER_STATE.IDLE)
		this.playerHold.stateMachine.setState(HOLD_COMP_STATE.EMPTY)
		this.playerAimComp.stateMachine.setState(AIM_STATE.EMPTY)

		this.handleStateSwitching()

	}

	Update(dt: number)
	{
		this.stateMachine.update(dt)
		this.playerHold.stateMachine.update(dt)
		this.playerAimComp.stateMachine.update(dt)
		this.playerPSD.stateMachine.update(dt)
	}

	private onAimEnter()
	{
		this.playerAimComp.setFacingDir(this.direction)
	}

	private handleStateSwitching()
	{
		this.playerKeyboard.executeShiftArrowKeyUp = () => {
			this.enterAimState()
		}

		this.playerKeyboard.executeShiftLeft = () => {
			this.handleAimStateMovement(DIRECTION.LEFT)
		}

		this.playerKeyboard.executeShiftRight = () => {
			this.handleAimStateMovement(DIRECTION.RIGHT)
		}

		this.playerKeyboard.executeShiftUp = () => {
			this.handleAimStateMovement(DIRECTION.BACK)
		}

		this.playerKeyboard.executeShiftDown = () => {
			this.handleAimStateMovement(DIRECTION.FRONT)
		}

		this.playerKeyboard.executeShiftJustUp = () => {
			if(this.playerHold.stateMachine.isCurrentState(HOLD_COMP_STATE.EMPTY))
			{
				return
			}

			this.playerAimComp.stateMachine.setState(AIM_STATE.EMPTY)
			this.playerHold.stateMachine.setState(HOLD_COMP_STATE.IDLE)
			this.stateMachine.setState(PLAYER_STATE.HOLD_IDLE)

			this.playerPSD.setAimState(false)
			this.playerPSD.stateMachine.setState(PSD_STATE.EQIUP_IDLE)
		}

		this.playerKeyboard.executeLeft = () => {
			this.handleNonEmptyHoldState(DIRECTION.LEFT)
		}
		this.playerKeyboard.executeRight = () => {
			this.handleNonEmptyHoldState(DIRECTION.RIGHT)
		}
		this.playerKeyboard.executeUp = () => {
			this.handleNonEmptyHoldState(DIRECTION.BACK)
		}
		this.playerKeyboard.executeDown = () => {
			this.handleNonEmptyHoldState(DIRECTION.FRONT)
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

			this.playerPSD.setFacingDir(this.direction)
			this.playerPSD.stateMachine.setState(PSD_STATE.EQIUP_IDLE)
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
				this.playerPSD.setHoldState(true)
				this.flipSwitch = !this.flipSwitch
				return
			}

			this.playerHold.stateMachine.setState(HOLD_COMP_STATE.EMPTY)
			this.stateMachine.setState(PLAYER_STATE.IDLE)
			this.playerPSD.setHoldState(false)
			this.flipSwitch = !this.flipSwitch

		}
	}

	private handleNonEmptyHoldState(dir: number)
	{
		this.direction = dir

		if(this.playerHold.stateMachine.isCurrentState(HOLD_COMP_STATE.EMPTY))
		{
			this.stateMachine.setState(PLAYER_STATE.WALK)

			this.playerPSD.setFacingDir(dir)
			this.playerPSD.stateMachine.setState(PSD_STATE.EQUIP_WALK)
			return
		}

		this.stateMachine.setState(PLAYER_STATE.HOLD_WALK)
		this.playerHold.stateMachine.setState(HOLD_COMP_STATE.WALK)

		this.playerPSD.setFacingDir(dir)
		this.playerPSD.stateMachine.setState(PSD_STATE.EQUIP_WALK)
	}

	private handleAimStateMovement(dir: number)
	{
		if(
			this.playerHold.stateMachine.isCurrentState(HOLD_COMP_STATE.EMPTY) || 
			this.playerAimComp.stateMachine.isCurrentState(AIM_STATE.EMPTY)
		)
		{
			return
		}

		this.playerAimComp.setFacingDir(this.direction)
		this.playerAimComp.setMovingDir(dir)
		this.playerAimComp.stateMachine.setState(AIM_STATE.WALK)

		this.playerHold.direction = this.direction
		this.playerHold.stateMachine.setState(HOLD_COMP_STATE.WALK)

		this.playerPSD.setFacingDir(this.direction)
		this.playerPSD.setAimState(true)
		this.playerPSD.stateMachine.setState(PSD_STATE.EQUIP_WALK)

		if(this.direction % 2 === dir % 2)
		{
			return
		}

		this.handleAimModeAnims(true)
	}

	private handleAimModeAnims(isWalk: boolean)
	{
		const dirname = getDirectionName(this.direction)

		if(!dirname)
		{
			return
		}

		if(isWalk)
		{
			this.playerAnims.playAnims({
				character: 'player',
				direction: dirname,
				state: 'walk',
				holdState: 'hold'
			})
		}
		else
		{
			this.playerAnims.playAnims({
				character: 'player',
				direction: dirname,
				state: 'idle',
				holdState: 'hold'
			})
		}

		
	}

	private enterAimState()
	{
		if(
			this.playerHold.stateMachine.isCurrentState(HOLD_COMP_STATE.EMPTY) ||
			this.stateMachine.isCurrentState(PLAYER_STATE.HOLD_WALK)
		)
		{
			return
		}

		this.playerPSD.setAimState(true)
		this.playerAimComp.stateMachine.setState(AIM_STATE.STAY)
		this.playerHold.stateMachine.setState(HOLD_COMP_STATE.IDLE)

		this.handleAimModeAnims(false)
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
