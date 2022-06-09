
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import TileMapLayerPhysics from "../components/TileMapLayerPhysics";
import PlayerContainer from "../prefabs/PlayerContainer";
import Rock from "../prefabs/Rock";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Chunk extends Phaser.Scene {

	constructor() {
		super("Chunk");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// start_chunk
		const start_chunk = this.add.tilemap("start_chunk");
		start_chunk.addTilesetImage("gamedevjs-cave-tileset-1", "cave-test-tileset-1");

		// floor_1
		const floor_1 = start_chunk.createLayer("floor", ["gamedevjs-cave-tileset-1"], 0, 0);

		// wall_1
		const wall_1 = start_chunk.createLayer("wall", ["gamedevjs-cave-tileset-1"], 0, 0);

		// playerContainer
		const playerContainer = new PlayerContainer(this, 176, 280);
		this.add.existing(playerContainer);

		// rock
		const rock = new Rock(this, 85, 154);
		this.add.existing(rock);

		// wall_1 (components)
		new TileMapLayerPhysics(wall_1);

		this.floor_1 = floor_1;
		this.wall_1 = wall_1;
		this.playerContainer = playerContainer;
		this.start_chunk = start_chunk;

		this.events.emit("scene-awake");
	}

	private floor_1!: Phaser.Tilemaps.TilemapLayer;
	private wall_1!: Phaser.Tilemaps.TilemapLayer;
	private playerContainer!: PlayerContainer;

	/* START-USER-CODE */
	private start_chunk!: Phaser.Tilemaps.Tilemap
	// Write your code here

	create() {
		this.editorCreate();

		this.physics.add.collider(this.playerContainer, this.wall_1)

		const genWall = this.start_chunk.createBlankLayer('genwall', ["gamedevjs-cave-tileset-1"], 0, -32*3)
		genWall.setDepth(this.wall_1.depth - 10)
		
		genWall.putTilesAt([[
			41, 113, -1, -1, -1, -1, -1, -1, 118, 41
		],
		[
			41, 113, -1, -1, -1, -1, -1, -1, 118, 41
		], ], 0, 0)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
