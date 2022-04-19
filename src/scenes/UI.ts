
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
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
		this.add.image(288, 32, "Menu Button");

		// bottom_Pannel
		this.add.image(160, 584.5, "Bottom Pannel");

		// health_Point
		this.add.image(276, 557, "Health Point");

		// health_Point_1
		this.add.image(270, 557, "Health Point");

		// health_Point_2
		this.add.image(264, 557, "Health Point");

		// health_Point_3
		this.add.image(258, 557, "Health Point");

		// health_Point_4
		this.add.image(252, 557, "Health Point");

		// health_Point_5
		this.add.image(246, 557, "Health Point");

		// health_Point_6
		this.add.image(240, 557, "Health Point");

		// health_Point_7
		this.add.image(234, 557, "Health Point");

		// health_Point_8
		this.add.image(228, 557, "Health Point");

		// health_Point_9
		this.add.image(222, 557, "Health Point");

		// energy_Point
		this.add.image(276, 585, "Energy Point");

		// energy_Point_1
		this.add.image(270, 585, "Energy Point");

		// energy_Point_2
		this.add.image(264, 585, "Energy Point");

		// energy_Point_3
		this.add.image(258, 585, "Energy Point");

		// energy_Point_4
		this.add.image(252, 585, "Energy Point");

		// energy_Point_5
		this.add.image(246, 585, "Energy Point");

		// energy_Point_6
		this.add.image(240, 585, "Energy Point");

		// energy_Point_7
		this.add.image(234, 585, "Energy Point");

		// energy_Point_8
		this.add.image(228, 585, "Energy Point");

		// energy_Point_9
		this.add.image(222, 585, "Energy Point");

		// sanity_Point
		this.add.image(276, 613, "Sanity Point");

		// sanity_Point_1
		this.add.image(270, 613, "Sanity Point");

		// sanity_Point_2
		this.add.image(264, 613, "Sanity Point");

		// sanity_Point_3
		this.add.image(258, 613, "Sanity Point");

		// sanity_Point_4
		this.add.image(252, 613, "Sanity Point");

		// sanity_Point_5
		this.add.image(246, 613, "Sanity Point");

		// sanity_Point_6
		this.add.image(240, 613, "Sanity Point");

		// sanity_Point_7
		this.add.image(234, 613, "Sanity Point");

		// sanity_Point_8
		this.add.image(228, 613, "Sanity Point");

		// sanity_Point_9
		this.add.image(222, 613, "Sanity Point");

		// status_Red_Overlay
		this.add.image(294, 557, "Status Red Overlay");

		// status_Red_Overlay_1
		this.add.image(294, 585, "Status Red Overlay");

		// status_Red_Overlay_2
		this.add.image(294, 613, "Status Red Overlay");

		// gunButton
		this.add.image(156, 601, "GunButton");

		// pSDButton
		this.add.image(156, 556, "PSDButton");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate()
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
