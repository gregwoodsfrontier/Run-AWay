
// You can write more code here
import { RAW_TYPE } from "../types/raw";

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Rock extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "raw-break-interact", frame ?? 0);

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.static = true;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public isPickable: boolean = false;

	/* START-USER-CODE */
	// Write your code here.
	private maxHP = {
		empty: 4,
		copper: 4,
		silver: 8,
		gold: 10
	}
	public currHP = 0
	private rawType: number = 0;

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
		this.currHP = Phaser.Math.Clamp(this.currHP - dmg, 0, 9)
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

	updateRockState()
	{
		switch(this.rawType) {
			case RAW_TYPE.EMPTY: {
				if(this.currHP > 3)
				{
					this.setFrame(24)
				}
				else if(this.currHP > 2)
				{
					this.setFrame(25)
				}
				else if(this.currHP > 1)
				{
					this.setFrame(26)
				}
				else if(this.currHP > 0)
				{
					this.setFrame(27)
				}
				else
				{
					this.setFrame(28)
				}
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

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
