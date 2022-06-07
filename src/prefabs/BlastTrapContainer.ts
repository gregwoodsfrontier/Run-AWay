
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
import CheckDistance from "../components/CheckDistance";
import BlastTrapV2 from "./BlastTrapV2";
import TrapProjectile from "./TrapProjectile";
/* START-USER-IMPORTS */
import JustMovement from "../components/JustMovement";
import { EVENTKEYS } from "../types/eventKeys";
/* END-USER-IMPORTS */

export default class BlastTrapContainer extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// blastTrapV2
		const blastTrapV2 = new BlastTrapV2(scene, 0, 0);
		this.add(blastTrapV2);

		// trapProjectile_right
		const trapProjectile_right = new TrapProjectile(scene, 32, 0);
		trapProjectile_right.visible = true;
		this.add(trapProjectile_right);

		// trapProjectile_up
		const trapProjectile_up = new TrapProjectile(scene, 0, -32);
		trapProjectile_up.angle = -90;
		trapProjectile_up.visible = true;
		this.add(trapProjectile_up);

		// trapProjectile_left
		const trapProjectile_left = new TrapProjectile(scene, -32, 0);
		trapProjectile_left.angle = -180;
		trapProjectile_left.visible = true;
		this.add(trapProjectile_left);

		// trapProjectile_down
		const trapProjectile_down = new TrapProjectile(scene, 0, 32);
		trapProjectile_down.angle = 90;
		trapProjectile_down.visible = true;
		this.add(trapProjectile_down);

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.static = true;
		thisPhysics.width = 32;
		thisPhysics.height = 16;
		thisPhysics.offsetX = 16;
		thisPhysics.offsetY = 32;
		const thisCheckDistance = new CheckDistance(this);
		thisCheckDistance.limit = 55;

		// trapProjectile_up (components)
		const trapProjectile_upPhysics = Physics.getComponent(trapProjectile_up);
		trapProjectile_upPhysics.width = 16;
		trapProjectile_upPhysics.height = 32;
		trapProjectile_upPhysics.offsetX = 8;
		trapProjectile_upPhysics.offsetY = 0;

		// trapProjectile_down (components)
		const trapProjectile_downPhysics = Physics.getComponent(trapProjectile_down);
		trapProjectile_downPhysics.width = 16;
		trapProjectile_downPhysics.height = 32;
		trapProjectile_downPhysics.offsetX = 8;
		trapProjectile_downPhysics.offsetY = 0;

		this.blastTrapV2 = blastTrapV2;
		this.trapProjectile_right = trapProjectile_right;
		this.trapProjectile_up = trapProjectile_up;
		this.trapProjectile_left = trapProjectile_left;
		this.trapProjectile_down = trapProjectile_down;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this)
      	this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
		/* END-USER-CTR-CODE */
	}

	public blastTrapV2: BlastTrapV2;
	public trapProjectile_right: TrapProjectile;
	public trapProjectile_up: TrapProjectile;
	public trapProjectile_left: TrapProjectile;
	public trapProjectile_down: TrapProjectile;

	/* START-USER-CODE */
	private trapProjArr!: TrapProjectile[]

	// Write your code here.
	start()
	{
		this.trapProjArr =[
			this.trapProjectile_down,
			this.trapProjectile_up,
			this.trapProjectile_left,
			this.trapProjectile_right
		]

		this.hideAllProjectiles()
		this.state = 1

		const thisCheckDistance = CheckDistance.getComponent(this)
		thisCheckDistance.execute = () => {
			this.executeTest()
		}

		// this.blastTrapV2.setInteractive()
		// this.blastTrapV2.on('pointerup', this.executeTest, this)
	}

	executeTest()
	{
		this.shootProjectiles()
		this.emitShootEvents()
	}

	private hideAllProjectiles()
	{
		this.trapProjArr.forEach(item => {
			const proj = item as TrapProjectile
			proj.visible = false
		})
	}

	private showAllProjectiles()
	{
		this.trapProjArr.forEach(item => {
			const proj = item as TrapProjectile
			proj.visible = true
		})
	}

	private emitShootEvents()
	{
		this.trapProjArr.forEach(item => {
			this.scene.events.emit(EVENTKEYS.GEN_TRAP_PROJECTILE, item)
		})

	}

	private shootProjectiles()
	{
		this.blastTrapV2.play('trap-explode')

		this.showAllProjectiles()

		const down = JustMovement.getComponent(this.trapProjectile_down)
		down.moveDown()

		const up = JustMovement.getComponent(this.trapProjectile_up)
		up.moveUp()

		const left = JustMovement.getComponent(this.trapProjectile_left)
		left.moveLeft()

		const right = JustMovement.getComponent(this.trapProjectile_right)
		right.moveRight()

	}

	private tweenRed()
	{
		const tween = this.scene.tweens.addCounter({
		from: 255,
		to: 0,
		duration: 100,
		repeat: 5,
		onUpdate: tween => {
			const val = Math.floor(tween.getValue())
			this.blastTrapV2.setTint(Phaser.Display.Color.GetColor(255, val, val))
		}
		})

		tween.once(Phaser.Tweens.Events.TWEEN_COMPLETE, this.shootProjectiles, this)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
