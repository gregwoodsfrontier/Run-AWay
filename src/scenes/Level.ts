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

		// cave_test_map_1
		const cave_test_map_1 = this.add.tilemap("cave-test-map-1");
		cave_test_map_1.addTilesetImage("Gamdev jam cate tiles test 1", "cave-test-tileset-1");

		// cave
		const cave = cave_test_map_1.createLayer("Tile Layer 1", ["Gamdev jam cate tiles test 1"], 0, 0);

		// player
		const player = this.add.sprite(180, 283, "your-dude", 2);

		// player (components)
		new Movement(player);
		new Physics(player);

		this.cave = cave;
		this.player = player;
		this.cave_test_map_1 = cave_test_map_1;

		this.events.emit("scene-awake");
	}

	public cave!: Phaser.Tilemaps.TilemapLayer;
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