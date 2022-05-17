
// You can write more code here
/* START OF COMPILED CODE */

import Phaser from "phaser";
import JustPlayer from "./JustPlayer";
import Gun from "./Gun";
import BackpackPSD from "./BackpackPSD";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { PLAYER_STATE } from "../types/playerState";
import { DIRECTION, getDirectionName } from "../types/direction";
import { HOLD_COMP_STATE } from "../types/holdCompState";
import { AIM_STATE } from "../types/aimCompState";
import { PSD_STATE } from "../types/PSD";
import { DARK_BROWN } from "../types/colors";
import eventsCenter from "../EventsCenter";
import { AUDIO_PLAY_EVENTS } from "../types/scenes";
/* END-USER-IMPORTS */

export default class PlayerContainer extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// player
		const player = new JustPlayer(scene, 0, 0);
		this.add(player);

		// gun
		const gun = new Gun(scene, 0, 0);
		this.add(gun);

		// backpackPSD
		const backpackPSD = new BackpackPSD(scene, 0, 0);
		this.add(backpackPSD);

		this.player = player;
		this.gun = gun;
		this.backpackPSD = backpackPSD;

		/* START-USER-CTR-CODE */
		// Write your code here.

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.Update, this);

		/* END-USER-CTR-CODE */
	}

	public player: JustPlayer;
	public gun: Gun;
	public backpackPSD: BackpackPSD;

	/* START-USER-CODE */

	// Write your code here.
	private stateMachine?: StateMachine
	private playerMovement: JustMovement
	private playerKeyboard: KeyboardInput
	private playerAnims: AnimationV2
	private playerHold: HoldComp
	private playerAimComp: AimComp
	private playerPSD: PSDComp
	private flipSwitch = false
	//@ts-ignore
	private direction: number
	private mudcolor = DARK_BROWN

	start()
	{
		this.direction = DIRECTION.LEFT
		this.stateMachine = new StateMachine(this, 'player')
		this.stateMachine.addState(PLAYER_STATE.IDLE, {
			onEnter: this.onIdleEnter
		})
		.addState(PLAYER_STATE.WALK, {
			onEnter: this.onWalkEnter,
			onUpdate: this.onWalkUpdate,
			onExit: this.onWalkExit
		})
		.addState(PLAYER_STATE.HOLD_IDLE, {
			onEnter: this.onHoldIdleEnter
		})
		.addState(PLAYER_STATE.HOLD_WALK, {
			onEnter: this.onHoldWalkEnter,
			onUpdate: this.onHoldWalkUpdate,
			onExit: this.onHoldWalkExit
		})

		this.stateMachine.setState(PLAYER_STATE.IDLE)
		// this.playerHold.stateMachine.setState(HOLD_COMP_STATE.EMPTY)
		// this.playerAimComp.stateMachine.setState(AIM_STATE.EMPTY)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.pushable = false
		this.handleStateSwitching()
		this.handleShooting()
		this.handlePSDDeploy()
	}

	Update(dt: number)
	{
		this.stateMachine.update(dt)
		this.playerHold.stateMachine.update(dt)
		this.playerAimComp.stateMachine.update(dt)
		this.playerPSD.stateMachine.update(dt)

		const selectSquareComp = SelectionSquare.getComponent(this.player)
		selectSquareComp.setDir(this.direction)

		// ensure the player tint and speed unless in mud
		// this.outMudCondition()
		// this.scene.events.emit('selection-sq', this.direction, 50)
	}

	private onWalkEnter()
	{
		eventsCenter.emit(AUDIO_PLAY_EVENTS.PLAYER_FOOT)
	}

	private onWalkExit()
	{
		eventsCenter.emit(AUDIO_PLAY_EVENTS.PLAYER_FOOT_STOP)
	}

	setPSDCompState(state: string)
	{
		/* if(state != PSD_STATE.EQIUP_IDLE ||
			state != PSD_STATE.EQUIP_WALK ||
			state != PSD_STATE.DEPLOY
		)
		{
			return
		} */
		this.playerPSD.stateMachine.setState(state)
	}

	public inMudCondition()
	{
		console.log('in mud con')
		// this.setTint(this.mudcolor)
		this.player.tint = 0x654321;
		const move = JustMovement.getComponent(this.player)
		move.speed = 155 * 0.5
	}

	outMudCondition()
	{
		this.player.clearTint()
		const move = JustMovement.getComponent(this.player)
		move.speed = 155
	}

	private handlePSDDeploy()
	{
		this.playerKeyboard.executeCKeyJustDown = () => {
			if(this.playerPSD.stateMachine.isCurrentState(PSD_STATE.DEPLOY))
			{
				//TODO: check if the PSD robot overlap with square
				// this.playerPSD.stateMachine.setState(PSD_STATE.EQIUP_IDLE)
				this.scene.events.emit('takeback-PSD')
				return
			}

			this.playerPSD.stateMachine.setState(PSD_STATE.DEPLOY)
			this.once('player-recover-psd', () => {
				this.playerPSD.stateMachine.setState(PSD_STATE.EQIUP_IDLE)
			}, this)
		}
	}

	private onHoldWalkEnter()
	{
		eventsCenter.emit(AUDIO_PLAY_EVENTS.PLAYER_FOOT)
	}

	private onHoldWalkExit()
	{
		eventsCenter.emit(AUDIO_PLAY_EVENTS.PLAYER_FOOT_STOP)
	}

	private handleShooting()
	{
		this.playerKeyboard.executeXKeyDown = () => {
			if(
				this.playerHold.stateMachine.isCurrentState(HOLD_COMP_STATE.EMPTY)
			)
			{
				return
			}
			this.scene.events.emit('create-bullet', this.direction)
		}
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

			// block input from deploy state
			if(!this.playerPSD.stateMachine.isCurrentState(PSD_STATE.DEPLOY))
			{
				this.playerPSD.setAimState(false)
				this.playerPSD.stateMachine.setState(PSD_STATE.EQIUP_IDLE)
			}

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

			if(!this.playerPSD.stateMachine.isCurrentState(PSD_STATE.DEPLOY))
			{
				this.playerPSD.setFacingDir(this.direction)
				this.playerPSD.stateMachine.setState(PSD_STATE.EQIUP_IDLE)
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
				eventsCenter.emit(AUDIO_PLAY_EVENTS.LASERGUN_EQUIP)
				this.updateHoldDir()
				this.playerHold.stateMachine.setState(HOLD_COMP_STATE.IDLE)
				this.stateMachine.setState(PLAYER_STATE.HOLD_IDLE)
				this.playerPSD.setHoldState(true)
				this.flipSwitch = !this.flipSwitch
				return
			}

			eventsCenter.emit(AUDIO_PLAY_EVENTS.LASERGUN_EQUIP)
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

			if(!this.playerPSD.stateMachine.isCurrentState(PSD_STATE.DEPLOY))
			{
				this.playerPSD.setFacingDir(dir)
				this.playerPSD.stateMachine.setState(PSD_STATE.EQUIP_WALK)
			}
			return
		}

		this.stateMachine.setState(PLAYER_STATE.HOLD_WALK)
		this.playerHold.stateMachine.setState(HOLD_COMP_STATE.WALK)

		if(!this.playerPSD.stateMachine.isCurrentState(PSD_STATE.DEPLOY))
		{
			this.playerPSD.setFacingDir(dir)
			this.playerPSD.stateMachine.setState(PSD_STATE.EQUIP_WALK)
		}

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
