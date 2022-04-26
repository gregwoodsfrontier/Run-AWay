
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
import DepthSortY from "../components/DepthSortY";
import AnimationV2 from "../components/AnimationV2";
import JustMovement from "../components/JustMovement";
import FollowTarget from "../components/FollowTarget";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { ENEMY_STATE_KEYS } from "../types/enemyStateKeys";
import { DIRECTION, getDirectionName } from "../types/direction";
import eventsCenter from "../EventsCenter";
import { AUDIO_PLAY_EVENTS } from "../types/scenes";
/* END-USER-IMPORTS */

export default class Enemy extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "swarm-back-walk-1", frame);

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.width = 20;
		thisPhysics.height = 28;
		thisPhysics.offsetX = 22;
		thisPhysics.offsetY = 26;
		new DepthSortY(this);
		new AnimationV2(this);
		const thisJustMovement = new JustMovement(this);
		thisJustMovement.speed = 90;
		const thisFollowTarget = new FollowTarget(this);
		thisFollowTarget.range = 300;
		thisFollowTarget.deadRangeX = 20;

		/* START-USER-CTR-CODE */
		// Write your code here.
		// this.setPushable(false)

		scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

		this.enemyAnimation = AnimationV2.getComponent(this)
		this.enemyMovement = JustMovement.getComponent(this)
		this.enemyAnimation.playAnims({
			character: 'swarm',
			direction: 'front',
			state: 'idle'
		})

		this.stateMachine = new StateMachine(this, 'enemy')
		this.stateMachine.addState(ENEMY_STATE_KEYS.IDLE, {
			onEnter: this.onIdleEnter
		})
		.addState(ENEMY_STATE_KEYS.WALK, {
			onEnter: this.onWalkEnter,
			onUpdate: this.onWalkUpdate,
			onExit: this.onWalkExit
		})
		.addState(ENEMY_STATE_KEYS.ATTACK, {
			onEnter: this.onAttackEnter
		})
		// .setState(ENEMY_STATE.IDLE)
		.setState(ENEMY_STATE_KEYS.IDLE)
		this.direction = DIRECTION.BACK

		// create events only for this enemy instance
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this)
		this.on('move', this.moveTheUnit)
		this.on('stay-still', this.stayStill)
		// this.on('attack', this.enrage)

		/* END-USER-CTR-CODE */
	}

	public HP: number = 100;
	public attack: number = 2;

	/* START-USER-CODE */

	// Write your code here.
	private stateMachine: StateMachine
	private enemyAnimation: AnimationV2
	private enemyMovement: JustMovement
	public direction = DIRECTION.BACK

	start()
	{
		// this.moveTheUnit(DIRECTION.BACK)
		// this.stayStill()
		this.setEnemyPush(false)
	}

	startMovement()
	{
		this.direction = DIRECTION.BACK
		this.stateMachine.setState(ENEMY_STATE_KEYS.WALK)
	}

	private setEnemyPush(boo: boolean)
	{
		const body = this.body as Phaser.Physics.Arcade.Body
		if(!body)
		{
			return
		}
		body.pushable = boo
	}

	update(dt: number)
	{
		this.stateMachine.update(dt)

		if(this.y < -1000)
		{
			// this.despawn()
			this.destoryAndDetach()
		}
	}

	enrage()
	{
		this.stateMachine.setState(ENEMY_STATE_KEYS.ATTACK)
	}

	checkState(state: string)
	{
		return this.stateMachine.isCurrentState(state)
	}

	private stayStill()
	{
		this.stateMachine.setState(ENEMY_STATE_KEYS.IDLE)
	}

	private moveTheUnit(dir: number)
	{
		this.direction = dir
		this.stateMachine.setState(ENEMY_STATE_KEYS.WALK)
	}

	private onIdleEnter()
	{
		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		this.enemyMovement.stayStill()
		this.enemyAnimation.playAnims({
			character: 'swarm',
			direction: dirName,
			state: 'idle'
		})

	}

	private onWalkEnter()
	{
		eventsCenter.emit(AUDIO_PLAY_EVENTS.ENEMY_FOOT)

		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		if(!this.enemyAnimation)
		{
			console.error("animation comp is undefined")
			return
		}

		this.enemyAnimation.playAnims({
			character: 'swarm',
			direction: dirName,
			state: 'walk'
		})
	}

	private onWalkExit()
	{
		eventsCenter.emit(AUDIO_PLAY_EVENTS.ENEMY_FOOT_STOP)
	}

	private onWalkUpdate()
	{
		if(!this.enemyMovement)
		{
			console.error("movement comp is undefined")
			return
		}

		switch (this.direction) {
			case DIRECTION.BACK: {
				this.enemyMovement.moveUp()
				break
			}

			case DIRECTION.FRONT: {
				this.enemyMovement.moveDown()
				break
			}

			case DIRECTION.LEFT: {
				this.enemyMovement.moveLeft()
				break
			}

			case DIRECTION.RIGHT: {
				this.enemyMovement.moveRight()
				break
			}
		}

		/* this.enemyAnimation.playAnims({
			character: 'swarm',
			direction: dirName,
			state: 'walk'
		}) */

		/* if(!this)
		{
			return
		} */

		// console.log(`swarm-${dirName}-walk`)
		/* try {
			this.play(`swarm-${dirName}-walk`, true)
		} catch (err) {
			console.error(err)
		} */
		// this.play(`swarm-${dirName}-walk`, true)
	}

	private onAttackEnter()
	{
		const dirName = getDirectionName(this.direction)

		if(!dirName)
		{
			console.warn('direction should be defined')
			return
		}

		this.enemyMovement.stayStill()

		this.enemyAnimation.playAnims({
			character: 'swarm',
			direction: dirName,
			state: 'attack'
		})

		const startHit = () => {

			this.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit)

			// this.debugSlapHitBox()
		}

		this.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit)

		/* this.scene.time.delayedCall(500, () => {
			this.stateMachine.setState(ENEMY_STATE.WALK)
		}) */
	}

	setSMState(state: string)
	{
		this.stateMachine.setState(state)
	}

	spawn(x: number, y: number)
	{
		this.setActive(true)
		this.setVisible(true)
		this.setPosition(x, y, 2000)
		this.scene.physics.add.existing(this)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.enable = true
		this.scene.physics.world.add(body)

		return this
	}

	despawn()
	{
		this.stayStill()
		this.setActive(false)
		this.setVisible(false)
		this.setPosition(-1000, -500, -2000)
		const body = this.body as Phaser.Physics.Arcade.Body
		if(!body)
		{
			return
		}

		body.enable = false
		this.scene.physics.world.remove(body)

		// const detect = DetectionBoxes.getComponent(this)
		// detect.removeZones()
	}

	destoryAndDetach()
	{
		// const detect = DetectionBoxes.getComponent(this)
		// detect.removeZones()
		this.destroy()
	}

	damage(points: number)
	{
		this.HP = Phaser.Math.Clamp(this.HP - points, 0, 200)
	}

	heal(points: number)
	{
		this.HP = Phaser.Math.Clamp(this.HP + points, 0, 200)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
