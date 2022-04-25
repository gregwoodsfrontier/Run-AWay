
// You can write more code here
import { RAW_TYPE } from "../types/raw";

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
import DepthSortY from "../components/DepthSortY";
/* START-USER-IMPORTS */
import { GameState } from "../manager/gameState";
/* END-USER-IMPORTS */

export default class Rock extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "raw-break-interact", frame ?? 0);

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.static = true;
		new DepthSortY(this);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this)
		// this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.sceneUpdate, this)
		/* END-USER-CTR-CODE */
	}

	public isPickable: boolean = false;
	public rawType: number = 0;

	/* START-USER-CODE */
	// Write your code here.
	private maxHP = {
		empty: 4,
		copper: 4,
		silver: 8,
		gold: 10
	}
	public limit = {
		copper: [3, 2, 1],
		silver: [6, 4, 2],
		gold: [7, 4, 1]
	}
	public healMet = {
		copper: {
			addHealth: 1,
			addEnergy: 1,
			addSanity: 1
		},
		silver: {
			addHealth: 3,
			addEnergy: 3,
			addSanity: 3
		},
		gold: {
			addHealth: 5,
			addEnergy: 5,
			addSanity: 5
		}
	}
	public currHP = 0
	// private rawType: number = 0;

	start()
	{
		this.initRock()
	}

	initRock()
	{
		this.setCurrHP(this.rawType)
		this.startRockAnims()
	}

	startRockAnims()
	{
		switch(this.rawType)
		{
			case RAW_TYPE.EMPTY: {
				this.play('empty-break', true)
				this.anims.stop()
				break
			}
			case RAW_TYPE.COPPER: {
				this.play('copper-break', true)
				this.anims.stop()
				break
			}
			case RAW_TYPE.SILVER: {
				this.play('silver-break', true)
				this.anims.stop()
				break
			}
			case RAW_TYPE.GOLD: {
				this.play('gold-break', true)
				this.anims.stop()
				break
			}

		}
	}

	beingPickedUp()
	{
		switch(this.rawType) {
			case RAW_TYPE.COPPER: {
				GameState.changeHealthBy(this.healMet.copper.addHealth)
				GameState.changeEnergyBy(this.healMet.copper.addEnergy)
				GameState.changeSanityBy(this.healMet.copper.addSanity)
				break
			}
			case RAW_TYPE.SILVER: {
				GameState.changeHealthBy(this.healMet.silver.addHealth)
				GameState.changeEnergyBy(this.healMet.silver.addEnergy)
				GameState.changeSanityBy(this.healMet.silver.addSanity)
				break
			}
			case RAW_TYPE.GOLD: {
				GameState.changeHealthBy(this.healMet.gold.addHealth)
				GameState.changeEnergyBy(this.healMet.gold.addEnergy)
				GameState.changeSanityBy(this.healMet.gold.addSanity)
				break
			}
		}
		// destroy the rock or despawn
		this.destroy()
	}

	setCurrHP(n: number)
	{
		switch(n) {
			case RAW_TYPE.EMPTY: {
				this.currHP = this.maxHP.empty
				break
			}
			case RAW_TYPE.COPPER: {
				this.currHP = this.maxHP.copper
				break
			}
			case RAW_TYPE.SILVER: {
				this.currHP = this.maxHP.silver
				break
			}
			case RAW_TYPE.GOLD: {
				this.currHP = this.maxHP.gold
				break
			}
			default: {
				console.error('no such type exist')
				break
			}
		}
	}

	damage(dmg: number)
	{
		this.currHP = Phaser.Math.Clamp(this.currHP - dmg, -1, 9)
		this.updateRockState()
	}

	setRawType(n: number)
	{
		if(n < 0 || n > 3)
		{
			return
		}
		this.rawType = n
	}

	private switchFrame(startHP: number, delta: number)
	{
		if(this.currHP === startHP - 1 * delta)
		{
			this.anims.nextFrame()
		}
		else if(this.currHP === startHP - 2 * delta)
		{
			this.anims.nextFrame()
		}
		else if(this.currHP === startHP - 3 * delta)
		{
			this.anims.nextFrame()
		}
		else if(this.currHP === 0)
		{
			this.anims.nextFrame()
			this.updatePickableState()
		}
		else
		{
			return
		}
	}

	updatePickableState()
	{
		switch(this.rawType)
		{
			case RAW_TYPE.COPPER: {
				this.checkPickIfZeroHP()
				break
			}
			case RAW_TYPE.SILVER: {
				this.checkPickIfZeroHP()
				break
			}
			case RAW_TYPE.GOLD: {
				this.checkPickIfZeroHP()
				break
			}

		}
	}

	private checkPickIfZeroHP()
	{
		if(this.currHP < 1)
		{
			this.isPickable = true
		}
	}

	updateRockState()
	{
		switch(this.rawType) {
			case RAW_TYPE.EMPTY: {
				this.switchFrame(this.maxHP.empty, 1)
				break
			}
			case RAW_TYPE.COPPER: {
				this.switchFrame(this.maxHP.copper, 1)
				break
			}
			case RAW_TYPE.SILVER: {
				this.switchFrame(this.maxHP.silver, 2)
				break
			}
			case RAW_TYPE.GOLD: {
				this.switchFrame(this.maxHP.gold, 3)
				break
			}
			default: {
				console.error('no such type exist')
				break
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
