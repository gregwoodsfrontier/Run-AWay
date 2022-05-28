
// You can write more code here
/* START OF COMPILED CODE */

import Phaser from "phaser";
import KeyboardInput from "../components/KeyboardInput";
import Physics from "../components/Physics";
import JustMovement from "../components/JustMovement";
import DepthSortY from "../components/DepthSortY";
import CameraFollow from "../components/CameraFollow";
import JustPlayer from "./JustPlayer";
import Gun from "./Gun";
import BackpackPSD from "./BackpackPSD";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { PSD_STATES } from "../types/PSD";
import { PLAYER_STATE } from "../types/playerState";
import { DIRECTION, getDirectionName } from "../types/direction";
import { DARK_BROWN } from "../types/colors";
import eventsCenter from "../EventsCenter";
import { AUDIO_PLAY_EVENTS } from "../types/scenes";
import { EVENTKEYS } from "../types/eventKeys";
import { GUN_STATES } from "../types/gunStates"

const mudcolor = DARK_BROWN
/* END-USER-IMPORTS */

export default class PlayerContainer extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// player
		const player = new JustPlayer(scene, 0, 0);
		player.name = "player";
		this.add(player);

		// gun
		const gun = new Gun(scene, 0, 0);
		gun.name = "gun";
		this.add(gun);

		// backpackPSD
		const backpackPSD = new BackpackPSD(scene, 0, 0);
		backpackPSD.name = "backpackPSD";
		this.add(backpackPSD);

		// activeSelect
		const activeSelect = scene.add.rectangle(-48, 16, 32, 32);
		activeSelect.name = "activeSelect";
		activeSelect.visible = false;
		activeSelect.fillAlpha = 0;
		activeSelect.isStroked = true;
		activeSelect.strokeColor = 65535;
		activeSelect.lineWidth = 2;
		this.add(activeSelect);

		// this (components)
		new KeyboardInput(this);
		const thisPhysics = new Physics(this);
		thisPhysics.width = 18;
		thisPhysics.height = 28;
		thisPhysics.offsetX = -9;
		thisPhysics.offsetY = -7;
		const thisJustMovement = new JustMovement(this);
		thisJustMovement.speed = 155;
		new DepthSortY(this);
		new CameraFollow(this);

		this.player = player;
		this.gun = gun;
		this.backpackPSD = backpackPSD;
		this.activeSelect = activeSelect;

		/* START-USER-CTR-CODE */
		// Write your code here.
		// this.physicComp = thisPhysics;
		this.movement = thisJustMovement;

		/* squares.forEach(sq => {
			this.add(sq)
			sq.addToUpdateList()
		}) */

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.Update, this);

		/* END-USER-CTR-CODE */
	}

	public player: JustPlayer;
	public gun: Gun;
	public backpackPSD: BackpackPSD;
	private activeSelect: Phaser.GameObjects.Rectangle;

	/* START-USER-CODE */

	// Write your code here.
	private stateMachine?: StateMachine
	// private physicComp: Physics
	private movement: JustMovement
	private keyboard?: KeyboardInput
	private flipSwitch = false
	private isHold = false
	private direction = DIRECTION.LEFT
	private selectCord = [
		{x: 0, y: -40},  // up
		{x: -48, y: 16},  // left
		{x: 0, y: 48},  // down
		{x: 48, y: 16},  // right
	]

	start()
	{
		this.direction = DIRECTION.LEFT
		this.isHold = false

		this.createStateMachine()

		const body = this.body as Phaser.Physics.Arcade.Body
		body.pushable = false

		this.keyboard = KeyboardInput.getComponent(this)

		this.assignKeyCommands()

		this.gun.setStateWithDir(this.direction, GUN_STATES.PUTBACK)

		this.addChildrenToUpdateList()

		if(process.env.NODE_ENV === 'development')
		{
			this.activeSelect.setVisible(true)
		}

	}

	Update(dt: number)
	{
		if(this.stateMachine)
		{
			this.stateMachine.update(dt)
		}

		this.updateSelectionSquare(this.direction, this.activeSelect)
	}

	private updateSelectionSquare(dir: number, zone: Phaser.GameObjects.Rectangle)
	{
		if(dir < 0 || dir > 3)
		{
			console.error('such direction does not exist')
			return
		}

		zone.setPosition(this.selectCord[dir].x, this.selectCord[dir].y)
	}

	private addChildrenToUpdateList()
	{
		const cont = this.getAll()
		cont.forEach(child => {
			child.addToUpdateList()
		})
	}

	private createStateMachine()
	{
		this.stateMachine = new StateMachine(this, 'player')
		this.stateMachine.addState(PLAYER_STATE.IDLE, {
			onUpdate: this.onIdleUpdate
		})
		.addState(PLAYER_STATE.WALK, {
			onEnter: this.onWalkEnter,
			onUpdate: this.onWalkUpdate,
			onExit: this.onWalkExit
		})

		this.stateMachine.setState(PLAYER_STATE.IDLE)
	}

	private onIdleUpdate()
	{
		this.makePlayerWalk(false)
	}

	private assignKeyCommands()
	{
		const {keyboard} = this

		if(!keyboard)
		{
			return
		}

		keyboard.executeKeyUp = () => {
			this.stateMachine?.setState(PLAYER_STATE.IDLE)
		}

		keyboard.executeLeft = () => {
			this.setWalkWithDirection(DIRECTION.LEFT)
		}

		keyboard.executeRight = () => {
			this.setWalkWithDirection(DIRECTION.RIGHT)
		}

		keyboard.executeUp = () => {
			this.setWalkWithDirection(DIRECTION.BACK)
		}

		keyboard.executeDown = () => {
			this.setWalkWithDirection(DIRECTION.FRONT)
		}

		keyboard.executeCKeyJustDown = () => {
			if(this.backpackPSD.isSMCurrentState(PSD_STATES.DEPLOY))
			{
				// the func just skips if it does not have overlap with PSD
				this.scene.events.emit(EVENTKEYS.TAKEBACK_PSD, this.activeSelect)
				this.once(EVENTKEYS.PLAYER_RECOVER, this.handlePSDReturn, this)
				return			
			}

			this.scene.events.emit(EVENTKEYS.DEPLOY_PSD, this.activeSelect)
			this.backpackPSD.setToDeployWithDir(this.direction)
			return

		}

		keyboard.executeSpace = () => {
			this.isHold = !this.isHold
		}

		keyboard.executeXKeyDown = () => {
			if(this.gun.isCurrentState(GUN_STATES.PUTBACK))
			{
				return
			}

			this.scene.events.emit(EVENTKEYS.CREATE_BULLETS, this.direction)
		}
	}

	private handlePSDReturn()
	{
		if(this.stateMachine?.isCurrentState(PLAYER_STATE.IDLE))
		{
			this.backpackPSD.setToIdleWithDir(this.direction)
			return
		}
		else if(this.stateMachine?.isCurrentState(PLAYER_STATE.WALK))
		{
			this.backpackPSD.setToWalkWithDir(this.direction)
			return
		}

		console.error('such state machine state does not exist.')
	}

	private setWalkWithDirection(dir: number)
	{
		this.direction = dir
		this.stateMachine?.setState(PLAYER_STATE.WALK)
	}

	setHoldState(boo: boolean)
	{
		this.isHold = boo
	}

	private onWalkEnter()
	{
		eventsCenter.emit(AUDIO_PLAY_EVENTS.PLAYER_FOOT)
	}

	private onWalkExit()
	{
		eventsCenter.emit(AUDIO_PLAY_EVENTS.PLAYER_FOOT_STOP)
	}

	inMudCondition()
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

	private getHoldStateString()
	{
		if(!this.gun)
		{ 
			console.error('this gun is undefined')
			return 
		}

		if(this.isHold)
		{
			this.gun.setStateWithDir(this.direction, GUN_STATES.IDLE)
			return 'hold'
		}

		this.gun.setStateWithDir(this.direction, GUN_STATES.PUTBACK)
		return 'none'
	}

	private getWalkStateString(boo: boolean)
	{
		return boo ? 'walk' : 'idle'
	}

	private makePlayerWalk(isWalk: boolean)
	{
		const walkState = this.getWalkStateString(isWalk)

		const dirName = getDirectionName(this.direction)

		const holdName = this.getHoldStateString()

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		// player physically move
		this.handlePlayerMovement()

		if(isWalk)
		{
			if(!this.gun.checkCurrentState(GUN_STATES.PUTBACK))
			{
				this.gun.setStateWithDir(this.direction, GUN_STATES.WALK)
			}

			if(!this.backpackPSD.isSMCurrentState(PSD_STATES.DEPLOY))
			{
				this.backpackPSD.setToWalkWithDir(this.direction)
			}
		}
		else
		{
			if(!this.gun.checkCurrentState(GUN_STATES.PUTBACK))
			{
				this.gun.setStateWithDir(this.direction, GUN_STATES.IDLE)
			}

			if(!this.backpackPSD.isSMCurrentState(PSD_STATES.DEPLOY))
			{
				this.backpackPSD.setToIdleWithDir(this.direction)
			}
		}

		const animString = `player-${dirName}-${walkState}-${holdName}`
		const player = this.getByName("player") as Phaser.GameObjects.Sprite
		// const animString = `player-${dirName}-walk-none`

		// this.player.play(`player-${dirName}-walk-none`, true)
		// this.player.play(animString)
		player.play(animString, true)

	}

	private onIdleEnter()
	{
		this.makePlayerWalk(false)
	}

	private handlePlayerMovement()
	{
		if(this.stateMachine?.isCurrentState(PLAYER_STATE.IDLE))
		{
			this.movement.stayStill()
			return
		}

		if(this.stateMachine?.isCurrentState(PLAYER_STATE.WALK))
		{
			switch (this.direction) {
				case DIRECTION.BACK: {
					this.movement.moveUp()
					break
				}

				case DIRECTION.FRONT: {
					this.movement.moveDown()
					break
				}

				case DIRECTION.LEFT: {
					this.movement.moveLeft()
					break
				}

				case DIRECTION.RIGHT: {
					this.movement.moveRight()
					break
				}
			}
			return
		}
	}

	private onWalkUpdate()
	{
		this.makePlayerWalk(true)

		// console.log('player anims ' ,this.player.anims.currentAnim.key)
		// console.log(this.player.anims.getProgress())
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
