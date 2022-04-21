
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
import DepthSortY from "../components/DepthSortY";
import FollowTarget from "../components/FollowTarget";
import AnimationV2 from "../components/AnimationV2";
import JustMovement from "../components/JustMovement";
/* START-USER-IMPORTS */
import StateMachine from "../stateMachine";
import { ENEMY_STATE_KEYS as ENEMY_STATE } from "../types/enemyStateKeys";
import { DIRECTION, getDirectionName } from "../types/direction";
/* END-USER-IMPORTS */

export default class Enemy extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "swarm-back-walk-1", frame);

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.width = 32;
		thisPhysics.height = 40;
		thisPhysics.offsetX = 16;
		thisPhysics.offsetY = 26;
		new DepthSortY(this);
		const thisFollowTarget = new FollowTarget(this);
		thisFollowTarget.range = 130;
		new AnimationV2(this);
		const thisJustMovement = new JustMovement(this);
		thisJustMovement.speed = 90;

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

		this.slapHitBox = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0)  as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
		this.scene.physics.add.existing(this.slapHitBox)
		this.disableSlapBox()

		this.stateMachine = new StateMachine(this, 'enemy')
		this.stateMachine.addState(ENEMY_STATE.IDLE, {
			onEnter: this.onIdleEnter
		})
		.addState(ENEMY_STATE.WALK, {
			onEnter: this.onWalkEnter,
			onUpdate: this.onWalkUpdate
		})
		.addState(ENEMY_STATE.ATTACK, {
			onEnter: this.onAttackEnter
		})
		.setState(ENEMY_STATE.IDLE)

		// create events only for this enemy instance
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this)
		this.on('move', this.moveTheUnit)
		this.on('stay-still', this.stayStill)
		// this.on('attack', this.enrage)

		/* END-USER-CTR-CODE */
	}

	public HP: number = 100;

	/* START-USER-CODE */

	// Write your code here.
	private stateMachine: StateMachine
	private enemyAnimation: AnimationV2
	private enemyMovement: JustMovement
	private direction = DIRECTION.FRONT
	private slapHitBox: Phaser.Types.Physics.Arcade.ImageWithDynamicBody

	start()
	{
		this.setEnemyPush(false)
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
	}

	getSlapHitBox()
	{
		return this.slapHitBox
	}

	enrage()
	{
		this.stateMachine.setState(ENEMY_STATE.ATTACK)
	}

	private disableSlapBox()
	{
		this.slapHitBox.setPosition(0, 0)

		this.slapHitBox.body.enable = false
		this.scene.physics.world.remove(this.slapHitBox.body)
	}

	private enableSlapBox()
	{
		this.slapHitBox.body.enable = true
		this.scene.physics.world.add(this.slapHitBox.body)
	}

	private debugSlapHitBox()
	{
		const graphics = this.scene.add.graphics()
		graphics.lineStyle(5, 0x00ffff)
		graphics.strokeRect(
			this.slapHitBox.body.x, 
			this.slapHitBox.body.y, 
			this.slapHitBox.body.width, 
			this.slapHitBox.body.height
		)

	}

	private stayStill()
	{
		this.stateMachine.setState(ENEMY_STATE.IDLE)
	}

	private moveTheUnit(dir: number)
	{
		this.direction = dir
		this.stateMachine.setState(ENEMY_STATE.WALK)
	}

	private setSlapHitBox(dir: number)
	{
		const boxMargin = 10
		const boxWidth = 32
		const boxHeight = 15
		const physics = Physics.getComponent(this)

		switch (dir) {
			case DIRECTION.BACK: {
				this.slapHitBox.setPosition(
					this.x, 
					this.y - boxMargin - boxHeight)
				this.slapHitBox.body.setSize(
					boxWidth,
					boxHeight
				)
				break
			}

			case DIRECTION.FRONT: {
				const body = this.body as Phaser.Physics.Arcade.Body

				this.slapHitBox.setPosition(
					this.x, 
					this.y + body.height + boxMargin
				)
				this.slapHitBox.body.setSize(
					boxWidth,
					boxHeight
				)
				break
			}

			case DIRECTION.RIGHT: {
				const body = this.body as Phaser.Physics.Arcade.Body

				this.slapHitBox.setPosition(
					this.x + physics.offsetX/2 + body.width/2 + boxMargin,
					this.y + physics.offsetY/2
				)
				this.slapHitBox.body.setSize(
					boxHeight,
					boxWidth
				)
				break
			}

			case DIRECTION.LEFT: {
				this.slapHitBox.setPosition(
					this.x - physics.offsetX/2 - boxMargin - boxHeight,
					this.y + physics.offsetY/2
				)
				this.slapHitBox.body.setSize(
					boxHeight,
					boxWidth
				)
				break
			}
		}
	}

	private onIdleEnter()
	{
		this.disableSlapBox()

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
		this.disableSlapBox()
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

		this.enemyAnimation.playAnims({
			character: 'swarm',
			direction: dirName,
			state: 'walk'
		})
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

			this.setSlapHitBox(this.direction)

			this.enableSlapBox()

			// this.debugSlapHitBox()
		}

		this.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit)

		/* this.scene.time.delayedCall(1000, () => {
			this.stateMachine.setState(ENEMY_STATE.IDLE)
		}) */
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
