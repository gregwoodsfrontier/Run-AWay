// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import TileMapLayerPhysics from "../components/TileMapLayerPhysics";
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

		// floor_1
		const floor_1 = cave_test_map_1.createLayer("floor", ["Gamdev jam cate tiles test 1"], 0, 0);

		// wall_1
		const wall_1 = cave_test_map_1.createLayer("wall", ["Gamdev jam cate tiles test 1"], 0, 0);

		// player
		const player = this.add.sprite(158, 144, "your-dude", 2);

		// wall_1 (components)
		new TileMapLayerPhysics(wall_1);

		// player (components)
		new Movement(player);
		const playerPhysics = new Physics(player);
		playerPhysics.width = 32;
		playerPhysics.height = 32;
		playerPhysics.offsetX = 16;
		playerPhysics.offsetY = 32;

		this.floor_1 = floor_1;
		this.wall_1 = wall_1;
		this.player = player;
		this.cave_test_map_1 = cave_test_map_1;

		this.events.emit("scene-awake");
	}

	private floor_1!: Phaser.Tilemaps.TilemapLayer;
	private wall_1!: Phaser.Tilemaps.TilemapLayer;
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

		this.physics.add.collider(this.player, this.wall_1);
	}

	private layerDebug(layer: Phaser.Tilemaps.TilemapLayer)
	{
		const debugGraphics = this.add.graphics().setAlpha(0.75);
		layer.renderDebug(debugGraphics, {
			tileColor: null, // Color of non-colliding tiles
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
			faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here