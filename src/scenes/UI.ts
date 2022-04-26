
// You can write more code here

/* START OF COMPILED CODE */

import Phaser, { Game } from "phaser";
import Button from "../components/Button";
import KeyboardInput from "../components/KeyboardInput";
/* START-USER-IMPORTS */
import { autorun } from "mobx";
import { GameState } from "../manager/gameState";
import eventsCenter from "../EventsCenter";
import { SCENE_SWITCH_EVENTS, AUDIO_PLAY_EVENTS } from "../types/scenes";

enum POINTS_TYPE {
	HEALTH,
	ENERGY,
	SANITY
}

enum ITEM_TYPE {
	COPPER,
	SILVER,
	GOLD
}

interface IPOSITION {
	X: number,
	Y: number
}

const INVENTORY_POS: IPOSITION[] = [
	{X: 22, Y: 554.5}, {X: 58, Y: 554.5}, {X: 94, Y: 554.5},
	{X: 22, Y: 585.5}, {X: 58, Y: 585.5}, {X: 94, Y: 585.5},
	{X: 22, Y: 616.5}, {X: 58, Y: 616.5}, {X: 94, Y: 616.5}
]

/* END-USER-IMPORTS */

export default class UI extends Phaser.Scene {

	constructor() {
		super("UI");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// menu_Button
		const menu_Button = this.add.image(288, 32, "Menu Button");

		// bottom_Panel
		const bottom_Panel = this.add.sprite(160, 584.5, "Bottom Pannel");

		// health_Point
		const health_Point = this.add.image(276, 557, "Health Point");

		// health_Point_1
		const health_Point_1 = this.add.image(270, 557, "Health Point");

		// health_Point_2
		const health_Point_2 = this.add.image(264, 557, "Health Point");

		// health_Point_3
		const health_Point_3 = this.add.image(258, 557, "Health Point");

		// health_Point_4
		const health_Point_4 = this.add.image(252, 557, "Health Point");

		// health_Point_5
		const health_Point_5 = this.add.image(246, 557, "Health Point");

		// health_Point_6
		const health_Point_6 = this.add.image(240, 557, "Health Point");

		// health_Point_7
		const health_Point_7 = this.add.image(234, 557, "Health Point");

		// health_Point_8
		const health_Point_8 = this.add.image(228, 557, "Health Point");

		// health_Point_9
		const health_Point_9 = this.add.image(222, 557, "Health Point");

		// energy_Point
		const energy_Point = this.add.image(276, 585, "Energy Point");

		// energy_Point_1
		const energy_Point_1 = this.add.image(270, 585, "Energy Point");

		// energy_Point_2
		const energy_Point_2 = this.add.image(264, 585, "Energy Point");

		// energy_Point_3
		const energy_Point_3 = this.add.image(258, 585, "Energy Point");

		// energy_Point_4
		const energy_Point_4 = this.add.image(252, 585, "Energy Point");

		// energy_Point_5
		const energy_Point_5 = this.add.image(246, 585, "Energy Point");

		// energy_Point_6
		const energy_Point_6 = this.add.image(240, 585, "Energy Point");

		// energy_Point_7
		const energy_Point_7 = this.add.image(234, 585, "Energy Point");

		// energy_Point_8
		const energy_Point_8 = this.add.image(228, 585, "Energy Point");

		// energy_Point_9
		const energy_Point_9 = this.add.image(222, 585, "Energy Point");

		// sanity_Point
		const sanity_Point = this.add.image(276, 613, "Sanity Point");

		// sanity_Point_1
		const sanity_Point_1 = this.add.image(270, 613, "Sanity Point");

		// sanity_Point_2
		const sanity_Point_2 = this.add.image(264, 613, "Sanity Point");

		// sanity_Point_3
		const sanity_Point_3 = this.add.image(258, 613, "Sanity Point");

		// sanity_Point_4
		const sanity_Point_4 = this.add.image(252, 613, "Sanity Point");

		// sanity_Point_5
		const sanity_Point_5 = this.add.image(246, 613, "Sanity Point");

		// sanity_Point_6
		const sanity_Point_6 = this.add.image(240, 613, "Sanity Point");

		// sanity_Point_7
		const sanity_Point_7 = this.add.image(234, 613, "Sanity Point");

		// sanity_Point_8
		const sanity_Point_8 = this.add.image(228, 613, "Sanity Point");

		// sanity_Point_9
		const sanity_Point_9 = this.add.image(222, 613, "Sanity Point");

		// status_Red_Overlay
		const status_Red_Overlay = this.add.image(294, 556.5, "Status Red Overlay");

		// status_Red_Overlay_1
		const status_Red_Overlay_1 = this.add.image(294, 584.5, "Status Red Overlay");

		// status_Red_Overlay_2
		const status_Red_Overlay_2 = this.add.image(294, 612.5, "Status Red Overlay");

		// gunButton
		const gunButton = this.add.image(156, 601, "GunButton");

		// pSDButton
		this.add.image(156, 556, "PSDButton");

		// pSD_Button_Red
		const pSD_Button_Red = this.add.image(155, 555, "PSD Button Red");

		// lists
		const sanityPoints = [sanity_Point_9, sanity_Point_8, sanity_Point_7, sanity_Point_6, sanity_Point_5, sanity_Point_4, sanity_Point_3, sanity_Point_2, sanity_Point_1, sanity_Point];
		const energyPoints = [energy_Point_9, energy_Point_8, energy_Point_7, energy_Point_6, energy_Point_5, energy_Point_4, energy_Point_3, energy_Point_2, energy_Point_1, energy_Point];
		const healthPoints = [health_Point, health_Point_9, health_Point_8, health_Point_7, health_Point_6, health_Point_5, health_Point_4, health_Point_3, health_Point_2, health_Point_1];
		const redStatus = [status_Red_Overlay_2, status_Red_Overlay_1, status_Red_Overlay];

		// menu_Button (components)
		new Button(menu_Button);

		// bottom_Panel (components)
		new KeyboardInput(bottom_Panel);

		this.menu_Button = menu_Button;
		this.bottom_Panel = bottom_Panel;
		this.gunButton = gunButton;
		this.pSD_Button_Red = pSD_Button_Red;
		this.sanityPoints = sanityPoints;
		this.energyPoints = energyPoints;
		this.healthPoints = healthPoints;
		this.redStatus = redStatus;

		this.events.emit("scene-awake");
	}

	private menu_Button!: Phaser.GameObjects.Image;
	private bottom_Panel!: Phaser.GameObjects.Sprite;
	private gunButton!: Phaser.GameObjects.Image;
	private pSD_Button_Red!: Phaser.GameObjects.Image;
	private sanityPoints!: Phaser.GameObjects.Image[];
	private energyPoints!: Phaser.GameObjects.Image[];
	private healthPoints!: Phaser.GameObjects.Image[];
	private redStatus!: Phaser.GameObjects.Image[];

	/* START-USER-CODE */
	private itemList: Phaser.GameObjects.Image[] = []

	// Write your code here

	create() {

		this.editorCreate();
		this.sanityPoints.sort((a, b) => b.x - a.x)
		this.energyPoints.sort((a, b) => b.x - a.x)
		this.healthPoints.sort((a, b) => b.x - a.x)
		this.redStatus.sort((a, b) => a.y - b.y)

		//test inpiut
		// this.testInputActive()
		
		//menuButton events
		this.setMenuButtonResponse()
		
		// update points
		autorun(() => {
			this.showPoints(POINTS_TYPE.ENERGY)
			this.showPoints(POINTS_TYPE.HEALTH)
			this.showPoints(POINTS_TYPE.SANITY)
			this.showInventory()
			this.showRedStatus(POINTS_TYPE.ENERGY)
			this.showRedStatus(POINTS_TYPE.HEALTH)
			this.showRedStatus(POINTS_TYPE.SANITY)
			this.showPSDStatus()
			this.showGunStatus()
		})
	}

	private testInputActive()
	{
		const testInput = KeyboardInput.getComponent(this.bottom_Panel)
		testInput.setActive(true)
		testInput.executeWKeyJustDown = this.testInventory
		testInput.executeAKeyJustDown = this.testHealth
		testInput.executeSKeyJustDown = this.testEnergy
		testInput.executeDKeyJustDown = this.testSanity
	}

	private setMenuButtonResponse()
	{
		const menuButtonComp = Button.getComponent(this.menu_Button)
		menuButtonComp.handlePointerOut = () => {
			this.menu_Button.setTexture('Menu Button')
			this.menu_Button.clearTint()
		}
		menuButtonComp.handlePointerOver = () => {
			this.menu_Button.setTint(0x00ffff)
		}
		menuButtonComp.handlePointerDown = () => {
			eventsCenter.emit(AUDIO_PLAY_EVENTS.MENUSELECT)
			this.menu_Button.setTexture('Menu Button Pressed')
		}
		menuButtonComp.handlePointerUp = () => {
			this.menu_Button.setTexture('Menu Button')
			// set events to switch to Pause Menu
			eventsCenter.emit(SCENE_SWITCH_EVENTS.TO_PAUSE)
		}
	}

	private showPSDStatus()
	{
		if(!GameState.isPSDDeployed)
		{
			this.pSD_Button_Red.setVisible(true)
			return
		}

		this.pSD_Button_Red.setVisible(false)
	}

	private showGunStatus()
	{
		if(!GameState.isGunDeployed)
		{
			this.gunButton.setTexture('GunButton-off')
			return
		}

		this.gunButton.setTexture('GunButton')
	}

	private showRedStatus(n: number)
	{
		let numsToCheck = GameState.energy
		let numsLimit = 30

		switch (n) {
			case POINTS_TYPE.ENERGY: {
				numsToCheck = GameState.energy
				numsLimit = 30
				break
			}
			case POINTS_TYPE.HEALTH: {
				numsToCheck = GameState.hp
				numsLimit = 30
				break
			}
			case POINTS_TYPE.SANITY: {
				numsToCheck = GameState.sanity
				numsLimit = 30
				break
			}
			default: {
				console.error('no such type exists')
				return
			}
		}

		if(numsToCheck < numsLimit)
		{
			this.redStatus[n].setVisible(true)
		}
		else
		{
			this.redStatus[n].setVisible(false)
		}
	}

	private testHealth = () => {
		GameState.setHealth(GameState.hp - 10 > 0 ? GameState.hp - 10 : 100)
	}

	private testEnergy = () => {
		GameState.setEnergy(GameState.energy - 10 > 0 ? GameState.energy - 10 : 100)
	}

	private testSanity = () => {
		GameState.setSanity(GameState.sanity - 10 > 0 ? GameState.sanity - 10 : 100)
	}

	private testInventory = () => {
		if(GameState.inventory.length > 8){ 
			GameState.inventory.length = 0
			return 
		}
		const arr = GameState.inventory
		arr.push(Phaser.Math.Between(0, 2))
		GameState.setInventory(arr)
	}

	private showInventory()
	{
		// clear the item list sprite first
		this.itemList.forEach(e => {
			e.destroy()
		})

		GameState.inventory.forEach((val, idx) => {
			const itemSprite = this.getItemSpriteName(val)
			if(!itemSprite)
			{
				return
			}
			const itemToShow = this.add.image(
				INVENTORY_POS[idx].X,
				INVENTORY_POS[idx].Y,
				itemSprite
			)
			this.itemList.push(itemToShow)
		})
	}

	private getItemSpriteName(n: number)
	{
		switch (n) {
			case ITEM_TYPE.COPPER: {
				return 'copper item'
			}
			case ITEM_TYPE.SILVER: {
				return 'silver item'
			}
			case ITEM_TYPE.GOLD: {
				return 'gold item'
			}
		}
		return undefined
	}

	private showPoints(type: number)
	{
		let lastpt = 0
		let arr: Phaser.GameObjects.Image[] = []
		switch(type)
		{
			case POINTS_TYPE.ENERGY: {
				lastpt = Math.ceil(GameState.energy/10)
				arr = this.energyPoints
				break
			}
			case POINTS_TYPE.HEALTH: {
				lastpt = Math.ceil(GameState.hp/10)
				arr = this.healthPoints
				break
			}
			case POINTS_TYPE.SANITY: {
				lastpt = Math.ceil(GameState.sanity/10)
				arr = this.sanityPoints
				break
			}
			default: {
				console.error('such point type do not exist.')
			}
		}
		arr.forEach(e => e.setVisible(false))
		for(let i = 0; i < lastpt; i++)
		{
			if(!arr[i])
			{
				continue
			}
			arr[i].setVisible(true)
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
