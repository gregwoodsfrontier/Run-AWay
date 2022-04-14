// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
import Movement from "../components/Movement";
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
		const player = this.add.sprite(180, 320, "493-export", 2);
		player.name = "player";
		player.scaleX = 0.28;
		player.scaleY = 0.28;

		// player (components)
		const playerPhysics = new Physics(player);
		playerPhysics.width = 320;
		playerPhysics.height = 320;
		new Movement(player);

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