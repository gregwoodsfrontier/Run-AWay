// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// platformer_fun
		const platformer_fun = this.add.tilemap("platformer_fun");
		platformer_fun.addTilesetImage("pixelPlatformer", "tiles_packed");

		// text
		const text = this.add.text(456, 58, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Gamedev JS Game Jam\n2022";
		text.setStyle({ "align": "center", "fontFamily": "Arial", "fontSize": "3em" });

		// image
		this.add.image(132, 86, "gamedevjs");

		// ground_1
		platformer_fun.createLayer("ground", ["pixelPlatformer"], 0, 0);

		// block_1
		platformer_fun.createLayer("block", ["pixelPlatformer"], 0, 0);

		// water_1
		platformer_fun.createLayer("water", ["pixelPlatformer"], 0, 0);

		this.platformer_fun = platformer_fun;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload()
	{
		//this.load.image("FufuSuperDino", '../../static/assets/FufuSuperDino.png')
	}

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here