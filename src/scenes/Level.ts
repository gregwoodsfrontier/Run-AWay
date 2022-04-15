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
		const player = this.add.sprite(160, 493, "your-dude", 2);

		// swarm
		const swarm = this.add.sprite(129, 89, "493-export", 1);
		swarm.scaleX = 0.15;
		swarm.scaleY = 0.15;

		// swarm_1
		const swarm_1 = this.add.sprite(197, 96, "493-export", 1);
		swarm_1.scaleX = 0.15;
		swarm_1.scaleY = 0.15;

		// swarm_1_1
		const swarm_1_1 = this.add.sprite(157, 177, "493-export", 1);
		swarm_1_1.scaleX = 0.15;
		swarm_1_1.scaleY = 0.15;

		// lists
		const swarms = [swarm, swarm_1, swarm_1_1];

		// wall_1 (components)
		new TileMapLayerPhysics(wall_1);

		// player (components)
		new Movement(player);
		const playerPhysics = new Physics(player);
		playerPhysics.width = 32;
		playerPhysics.height = 32;
		playerPhysics.offsetX = 16;
		playerPhysics.offsetY = 32;

		// swarm (components)
		new Physics(swarm);

		// swarm_1 (components)
		new Physics(swarm_1);

		// swarm_1_1 (components)
		new Physics(swarm_1_1);

		this.floor_1 = floor_1;
		this.wall_1 = wall_1;
		this.player = player;
		this.swarm = swarm;
		this.swarm_1 = swarm_1;
		this.swarm_1_1 = swarm_1_1;
		this.cave_test_map_1 = cave_test_map_1;
		this.swarms = swarms;

		this.events.emit("scene-awake");
	}

	private floor_1!: Phaser.Tilemaps.TilemapLayer;
	private wall_1!: Phaser.Tilemaps.TilemapLayer;
	public player!: Phaser.GameObjects.Sprite;
	private swarm!: Phaser.GameObjects.Sprite;
	private swarm_1!: Phaser.GameObjects.Sprite;
	private swarm_1_1!: Phaser.GameObjects.Sprite;
	private swarms!: Phaser.GameObjects.Sprite[];

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
		this.physics.add.collider(this.player,this.swarms);
		this.physics.add.collider(this.swarms,this.swarms);
		this.physics.add.collider(this.swarms,this.wall_1);
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

	update(time: number, delta: number): void {
		for(var i = 0; i < this.swarms.length; i++){
			var swarmspos = this.swarms[i];
			swarmspos.body.velocity.y = (this.player.y - swarmspos.y)/2;
			swarmspos.body.velocity.x = (this.player.x  - swarmspos.x)/2;
			}



	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here