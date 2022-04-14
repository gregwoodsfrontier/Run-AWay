// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Movement from "../components/Movement";
import Physics from "../components/Physics";
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

		// player
		const player = this.add.sprite(180, 283, "your-dude", 2);

		// player (components)
		new Movement(player);
		new Physics(player);

		this.player = player;

		this.events.emit("scene-awake");
	}

	public player!: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */
	public platformer_fun!: Phaser.Tilemaps.Tilemap
	// Write your code here

	preload()
	{
		//this.load.image("FufuSuperDino", '../../static/assets/FufuSuperDino.png')
	}

	create() {

		this.editorCreate();
		this.player.play('right-idle')
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here