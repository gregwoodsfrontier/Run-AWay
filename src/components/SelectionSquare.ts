
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import { DIRECTION } from "../types/direction";
/* END-USER-IMPORTS */

export default class SelectionSquare extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__SelectionSquare"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this)
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
		this.dir = 0

		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container): SelectionSquare {
		return (gameObject as any)["__SelectionSquare"];
	}

	private gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container;

	/* START-USER-CODE */
	private selectSquare!: Phaser.GameObjects.Zone
	private upSelect!: Phaser.GameObjects.Zone
	private downSelect!: Phaser.GameObjects.Zone
	private leftSelect!: Phaser.GameObjects.Zone
	private rightSelect!: Phaser.GameObjects.Zone
	private activeSelect!: Phaser.GameObjects.Zone
	private distance = 50

	private dir: number

	// Write your code here.
	start()
	{
		const {scene, x, y} = this.gameObject
		const {distance} = this

		const zoneWid = 32
		const zoneHei = 32
		// this.selectSquare = scene.add.rectangle(x, y, 32, 32, 0xff0000, 0).setDepth(1000)
		this.selectSquare = scene.add.zone(x, y, zoneWid, zoneHei)
		scene.physics.world.enable(this.selectSquare);
		(this.selectSquare.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
		(this.selectSquare.body as Phaser.Physics.Arcade.Body).moves = false;

		// this.selectSquare.setStrokeStyle(2, 0xff0000)
		this.upSelect = scene.add.zone(0, -0.8 * distance, zoneWid, zoneHei)
		this.downSelect = scene.add.zone(0, 1 * distance, zoneWid, zoneHei)
		this.leftSelect = scene.add.zone(-0.7 * distance, 16, zoneWid, zoneHei)
		this.rightSelect = scene.add.zone(0.7 * distance, 16, zoneWid, zoneHei)

		const zones = [
			this.upSelect,
			this.downSelect,
			this.leftSelect,
			this.rightSelect
		]

		zones.forEach(zone => {
			scene.physics.add.existing(zone, true);
		})

		// this.gameObject.scene.events.on('selection-sq', this.updateSelectionSquare, this)
	}

	giveDirectionSquare()
	{
		return [this.upSelect, this.downSelect, this.leftSelect, this.rightSelect]
	}

	getSelectionSquare()
	{
		return this.selectSquare
	}

	setDir(dir: number)
	{
		this.dir = dir
	}

	update()
	{
		// this.showSquare()
		// this.updateSelectionSquare(this.dir)
	}

	private showSquare()
	{
		const zones = [
			this.upSelect,
			this.downSelect,
			this.leftSelect,
			this.rightSelect,
			// this.selectSquare
		]

		zones.forEach(zone => {
			const body = zone.body as Phaser.Physics.Arcade.Body
			body.debugBodyColor = body.touching.none ? 0x00ffff : 0xffff00;
		})
	}


	private updateSelectionSquare(dir: number, distance: number = 50)
	{
		if(!this.selectSquare)
		{
			return
		}

		const {x, y} = this.gameObject

		switch(dir)
		{
			case DIRECTION.FRONT: {
				this.selectSquare.setPosition(x, y + distance)
				break
			}
			case DIRECTION.BACK: {
				this.selectSquare.setPosition(x, y - 0.8 * distance)
				break
			}
			case DIRECTION.LEFT: {
				this.selectSquare.setPosition(x - 0.7*distance, y + 16)
				break
			}
			case DIRECTION.RIGHT: {
				this.selectSquare.setPosition(x + 0.7*distance, y + 16)
				break
			}
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
