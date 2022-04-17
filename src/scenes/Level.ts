// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import TileMapLayerPhysics from "../components/TileMapLayerPhysics";
import Player from "../prefabs/Player";
import Enemy from "../prefabs/Enemy";
import FollowTarget from "../components/FollowTarget";
/* START-USER-IMPORTS */
import DepthSortY from "../components/DepthSortY";
import { ILevelData } from "../types/scenes";
import { DIRECTION } from "../types/direction";
import Physics from "../components/Physics";
import Bullet from "../prefabs/Bullet";
import JustMovement from "../components/JustMovement";
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

		// cave_test_map_2
		const cave_test_map_2 = this.add.tilemap("cave-test-map-2");
		cave_test_map_2.addTilesetImage("gamedevjs-cave-tileset-1", "cave-test-tileset-1");

		// floor_2
		const floor_2 = cave_test_map_2.createLayer("floor", ["gamedevjs-cave-tileset-1"], 0, -960);

		// wall_2
		const wall_2 = cave_test_map_2.createLayer("wall", ["gamedevjs-cave-tileset-1"], 0, -960);

		// player
		const player = new Player(this, 160, 160);
		this.add.existing(player);

		// enemy_3
		const enemy_3 = new Enemy(this, 112, 560);
		this.add.existing(enemy_3);

		// silver
		const silver = this.add.image(96, 304, "raw-break-interact", 0);

		// copper
		const copper = this.add.image(224, 304, "raw-break-interact", 8);

		// gold
		const gold = this.add.image(160, 240, "raw-break-interact", 16);

		// lists
		const enemyTeam = [enemy_3];
		const silverList: Array<any> = [];
		const bulletList: Array<any> = [];

		// wall_2 (components)
		new TileMapLayerPhysics(wall_2);

		// enemy_3 (components)
		const enemy_3FollowTarget = FollowTarget.getComponent(enemy_3);
		enemy_3FollowTarget.target = player;
		enemy_3FollowTarget.deadRangeX = 35;

		this.floor_2 = floor_2;
		this.wall_2 = wall_2;
		this.player = player;
		this.silver = silver;
		this.copper = copper;
		this.gold = gold;
		this.cave_test_map_1 = cave_test_map_1;
		this.cave_test_map_2 = cave_test_map_2;
		this.enemyTeam = enemyTeam;
		this.silverList = silverList;
		this.bulletList = bulletList;

		this.events.emit("scene-awake");
	}

	private floor_2!: Phaser.Tilemaps.TilemapLayer;
	private wall_2!: Phaser.Tilemaps.TilemapLayer;
	public player!: Player;
	private silver!: Phaser.GameObjects.Image;
	private copper!: Phaser.GameObjects.Image;
	private gold!: Phaser.GameObjects.Image;
	private enemyTeam!: Enemy[];
	private silverList!: Array<any>;
	private bulletList!: Array<any>;

	/* START-USER-CODE */
	public platformer_fun!: Phaser.Tilemaps.Tilemap
	cave_test_map_2!: Phaser.Tilemaps.Tilemap
	cave_test_map_1!: Phaser.Tilemaps.Tilemap
	// Write your code here
	bulletGroup!: Phaser.GameObjects.Group
	lastfired = 0

	create(data: ILevelData) {

		this.editorCreate();

		this.player.play('player-front-idle')
		this.floor_2.depth = this.wall_2.y * 2
		this.wall_2.depth = this.wall_2.y * 2

		this.initObjectPool()

		this.physics.add.collider(this.player, this.wall_2);
		this.physics.add.collider(this.player, this.enemyTeam)
		this.physics.add.collider(this.enemyTeam, this.enemyTeam)
		this.physics.add.collider(this.enemyTeam, this.wall_2)
		this.physics.add.collider(this.bulletGroup, this.wall_2, this.handleBulletWallCollision, undefined, this)

		this.events.on('create-bullet', this.handleBulletUpdate, this)
	}

	update(time: number, delta: number)
	{
		this.handleDepthSort()

		// this.handleBulletUpdate(time)
	}

	private handleBulletUpdate(dir: number)
	{
		const bullet = this.bulletGroup.get()

		const delay = 500

		if(bullet && this.time.now > this.lastfired)
		{
			bullet.fire(this.player.x, this.player.y)

			this.setBulletRotationAndVel(bullet, dir)
			// console.log('bullet', bullet.x, bullet.y)

			this.lastfired = this.time.now + delay
		}
	}

	private initObjectPool()
	{
		this.bulletGroup = this.add.group({
			classType: Bullet,
			maxSize: 50,
			runChildUpdate: true
		})
	}

	//@ts-ignore
	private handleBulletWallCollision(b , w)
	{
		const bullet = b as Bullet
		bullet.despawn()
	}

	private createBullet(dir: number)
	{
		if(!this.player)
		{
			return
		}

		const {x, y} = this.player
		let bullet = this.bulletList.find(b => b.active === false)

		// const bullet = new Bullet(this, x, y)

		if(!bullet)
		{
			bullet = new Bullet(this, x, y)
			this.physics.add.existing(bullet)
			this.bulletList.push(bullet)
			this.setBulletRotationAndVel(bullet, dir)

			return
		}

		bullet.spawn(x, y)
		this.setBulletRotationAndVel(bullet, dir)
	}

	private setBulletRotationAndVel(bul: Bullet, dir: number)
	{
		const bulMovement = JustMovement.getComponent(bul)
		if(!bulMovement){ return }

		switch(dir)
		{
			case DIRECTION.LEFT: {
				bul.angle = 0
				bulMovement.moveLeft()
				break
			}

			case DIRECTION.RIGHT: {
				bul.angle = 180
				bulMovement.moveRight()
				break
			}

			case DIRECTION.BACK: {
				bul.angle = 90
				bulMovement.moveUp()
				break
			}

			case DIRECTION.FRONT: {
				bul.angle = 270
				bulMovement.moveDown()
				break
			}
		}
	}

	private handlePause()
	{
		this.scene.pause('Level')
		this.scene.launch('Pause')
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

	private handleDepthSort()
	{
		this.children.each(c => {
			const child = c as Phaser.GameObjects.Sprite;

			if(!DepthSortY.getComponent(child))
			{
				return
			}

			child.setDepth(child.y)
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here