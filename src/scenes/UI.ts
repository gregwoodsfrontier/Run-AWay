
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { autorun } from "mobx";
import { GameState } from "../manager/gameState";
/* END-USER-IMPORTS */

enum POINTS_TYPE {
	HEALTH,
	ENERGY,
	SANITY
}

export default class UI extends Phaser.Scene {

	constructor() {
		super("UI");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// menu_Button
		this.add.image(288, 32, "Menu Button");

		// bottom_Pannel
		this.add.image(160, 584.5, "Bottom Pannel");

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
		this.add.image(294, 556.5, "Status Red Overlay");

		// status_Red_Overlay_1
		this.add.image(294, 584.5, "Status Red Overlay");

		// status_Red_Overlay_2
		this.add.image(294, 612.5, "Status Red Overlay");

		// gunButton
		this.add.image(156, 601, "GunButton");

		// pSDButton
		this.add.image(156, 556, "PSDButton");

		// pSD_Button_Red
		this.add.image(155, 555, "PSD Button Red");

		// item_1
		const item_1 = this.add.image(22, 554.5, "Energy Item Ore");

		// item_2
		const item_2 = this.add.image(58, 554.5, "Energy Item Ore");

		// hideGun_overlay
		const hideGun_overlay = this.add.rectangle(122, 583, 128, 128);
		hideGun_overlay.scaleX = 0.5079123410920019;
		hideGun_overlay.scaleY = 0.2850074030646159;
		hideGun_overlay.setOrigin(0, 0);
		hideGun_overlay.alpha = 0.5;
		hideGun_overlay.isFilled = true;

		// lists
		const sanityPoints = [sanity_Point_9, sanity_Point_8, sanity_Point_7, sanity_Point_6, sanity_Point_5, sanity_Point_4, sanity_Point_3, sanity_Point_2, sanity_Point_1, sanity_Point];
		const energyPoints = [energy_Point_9, energy_Point_8, energy_Point_7, energy_Point_6, energy_Point_5, energy_Point_4, energy_Point_3, energy_Point_2, energy_Point_1, energy_Point];
		const healthPoints = [health_Point, health_Point_9, health_Point_8, health_Point_7, health_Point_6, health_Point_5, health_Point_4, health_Point_3, health_Point_2, health_Point_1];

		this.item_1 = item_1;
		this.item_2 = item_2;
		this.hideGun_overlay = hideGun_overlay;
		this.sanityPoints = sanityPoints;
		this.energyPoints = energyPoints;
		this.healthPoints = healthPoints;

		this.events.emit("scene-awake");
	}

	private item_1!: Phaser.GameObjects.Image;
	private item_2!: Phaser.GameObjects.Image;
	private hideGun_overlay!: Phaser.GameObjects.Rectangle;
	private sanityPoints!: Phaser.GameObjects.Image[];
	private energyPoints!: Phaser.GameObjects.Image[];
	private healthPoints!: Phaser.GameObjects.Image[];

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.sanityPoints.sort((a, b) => b.x - a.x)
		this.energyPoints.sort((a, b) => b.x - a.x)
		this.healthPoints.sort((a, b) => b.x - a.x)

		// update points
		autorun(() => {
			this.showPoints(POINTS_TYPE.ENERGY)
			this.showPoints(POINTS_TYPE.HEALTH)
			this.showPoints(POINTS_TYPE.SANITY)
		})
	}

	private showPoints(type: number)
	{
		let lastpt = 0
		let arr: Phaser.GameObjects.Image[] = []
		switch(type)
		{
			case POINTS_TYPE.ENERGY: {
				lastpt = Math.ceil(GameState.power)
				arr = this.energyPoints
				break
			}
			case POINTS_TYPE.HEALTH: {
				lastpt = Math.ceil(GameState.hp)
				arr = this.healthPoints
				break
			}
			case POINTS_TYPE.SANITY: {
				lastpt = Math.ceil(GameState.sanity)
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
			arr[i].setVisible(true)
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
