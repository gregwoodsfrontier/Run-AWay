
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import { DIRECTION } from "../types/direction";
import Level from "../scenes/Level";
import Enemy from "../prefabs/Enemy"
import Rock from "../prefabs/Rock"

interface IBlocks {
	wall: Phaser.Tilemaps.TilemapLayer,
	rocks: Rock[],
	group: Phaser.GameObjects.Group
}
/* END-USER-IMPORTS */

export default class DetectionBoxes extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__DetectionBoxes"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.contain = this.createZoneContainer()

		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): DetectionBoxes {
		return (gameObject as any)["__DetectionBoxes"];
	}

	private gameObject: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */
	// Write your code here.
	private detectZones!: Phaser.GameObjects.Zone[]
	private collideBlocks!: IBlocks
	private contain: Phaser.GameObjects.Container

	getDetectionZones()
	{
		return this.detectZones
	}

	start()
	{
		this.collideBlocks = (this.scene.scene.get("Level") as Level).getCollidingBlocks()

		this.updateOverlap()
	}

	updateOverlap()
	{
		this.collideBlocks.group.getChildren().forEach(e => {
			const enemy = e as Enemy
			this.setDetectOverlap(enemy)
		})
	}

	update()
	{
		this.contain.setPosition(this.gameObject.x, this.gameObject.y)
	}

	private setDetectOverlap(enemy: Enemy)
	{
		const upzone = this.contain.getAll()[DIRECTION.BACK] as Phaser.GameObjects.Zone
		const downzone = this.contain.getAll()[DIRECTION.FRONT] as Phaser.GameObjects.Zone
		const leftzone = this.contain.getAll()[DIRECTION.LEFT] as Phaser.GameObjects.Zone
		const rightzone = this.contain.getAll()[DIRECTION.RIGHT] as Phaser.GameObjects.Zone

		const obs = this.collideBlocks.rocks
		const wall = this.collideBlocks.wall
		// const enGroup = this.collideBlocks.group
		const checkLeft = wall.hasTileAtWorldXY(leftzone.getBounds().left, leftzone.getBounds().centerY)
		const checkRight =  wall.hasTileAtWorldXY(rightzone.getBounds().right, rightzone.getBounds().centerY)

		// set up zone overlap
		this.scene.physics.add.overlap(upzone, obs, () => {

			if(checkLeft || this.checkLeftRock())
			{
				enemy.emit('move', DIRECTION.RIGHT)
			}
			else if(checkRight || this.checkRightRock())
			{
				enemy.emit('move', DIRECTION.LEFT)
			}
			else
			{
				Phaser.Math.Between(0, 1) === 0 ? enemy.emit('move', DIRECTION.LEFT) : enemy.emit('move', DIRECTION.RIGHT)
			}

			this.scene.time.delayedCall(600, () => {
				enemy.emit('move', DIRECTION.BACK)
			})
		},
		() => {
			return enemy.direction === DIRECTION.BACK
		},
		this)

		// set down zone overlap
		this.scene.physics.add.overlap(downzone, obs, () => {

			if(checkLeft || this.checkLeftRock())
			{
				enemy.emit('move', DIRECTION.RIGHT)
			}
			else if(checkRight || this.checkRightRock())
			{
				enemy.emit('move', DIRECTION.LEFT)
			}
			else
			{
				Phaser.Math.Between(0, 1) === 0 ? enemy.emit('move', DIRECTION.LEFT) : enemy.emit('move', DIRECTION.RIGHT)
			}

			this.scene.time.delayedCall(600, () => {
				enemy.emit('move', DIRECTION.FRONT)
			})
		},
		() => {
			return enemy.direction === DIRECTION.FRONT
		},
		this)
	}

	private checkLeftRock()
	{
		const leftzone = this.contain.getAll()[DIRECTION.LEFT] as Phaser.GameObjects.Zone
		const closeRock =  this.grabClosetRock()
		let checkLeftRock = false
		if(!leftzone.body){return false}
		for(let i = 0; i < closeRock.length; i++)
		{
			if(!closeRock[i] || !closeRock[i].body)
			{
				continue
			}
			checkLeftRock = this.scene.physics.world.intersects(
				(leftzone.body as Phaser.Physics.Arcade.Body),
				(closeRock[i].body as Phaser.Physics.Arcade.Body)
			)
			if(checkLeftRock === true){ break }
		}

		return checkLeftRock
	}

	private checkRightRock()
	{
		const rightzone = this.contain.getAll()[DIRECTION.RIGHT] as Phaser.GameObjects.Zone
		const closeRock =  this.grabClosetRock()
		let checkRock = false
		if(!rightzone.body){return false}
		for(let i = 0; i < closeRock.length; i++)
		{
			checkRock = this.scene.physics.world.intersects(
				(rightzone.body as Phaser.Physics.Arcade.Body),
				(closeRock[i].body as Phaser.Physics.Arcade.Body)
			)
			if(checkRock === true){ break }
		}

		return checkRock
	}

	private grabClosetRock()
	{
		const upzone = this.contain.getAll()[DIRECTION.BACK] as Phaser.GameObjects.Zone
		const downzone = this.contain.getAll()[DIRECTION.FRONT] as Phaser.GameObjects.Zone
		const leftzone = this.contain.getAll()[DIRECTION.LEFT] as Phaser.GameObjects.Zone
		const rightzone = this.contain.getAll()[DIRECTION.RIGHT] as Phaser.GameObjects.Zone

		const upBound = upzone.getBounds().top - 32
		const downBound = downzone.getBounds().bottom + 32
		const leftBound = leftzone.getBounds().left - 32
		const rightBound = rightzone.getBounds().right + 32

		return this.collideBlocks.rocks.filter(v => {
			return v.x > leftBound &&
			v.x < rightBound &&
			v.y > upBound &&
			v.y < downBound
		})
	}

	removeZones()
	{
		this.contain.getAll().forEach(zone => zone.destroy())
	}

	private createZoneContainer()
	{
		const { scene } = this.gameObject
		const wid = 32
		const hei = 8
		const dx = 5
		const dy = 5
		const x = 0
		const y = 0

		const c = this.scene.add.container(this.gameObject.x, this.gameObject.y)

		// make up detect box
		const up = scene.add.zone(x, y - 16 - hei/2 - dy, wid, hei)
		// make down detect box
		const down = scene.add.zone(x, y + 32 + hei/2 + dy, wid, hei)
		// make left detect box
		const left = scene.add.zone(x - 16 - hei/2 - dx, y , hei, wid)
		// make right detect box
		const right = scene.add.zone(x + 16 + hei/2 + dx, y, hei, wid)

		const arr = [ up, left, down, right ]
		arr.forEach((e) => {
			this.scene.physics.add.existing(e)
			c.add(e)
		})

		return c
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
