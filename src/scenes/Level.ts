// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import TileMapLayerPhysics from "../components/TileMapLayerPhysics";
import Player from "../prefabs/Player";
import Enemy from "../prefabs/Enemy";
import FollowTarget from "../components/FollowTarget";
import PSD from "../prefabs/PSD";
/* START-USER-IMPORTS */
import DepthSortY from "../components/DepthSortY";
import { ILevelData } from "../types/scenes";
import { DIRECTION } from "../types/direction";
import Bullet from "../prefabs/Bullet";
import JustMovement from "../components/JustMovement";
import SelectionSquare from "../components/SelectionSquare";
import KeyboardInput from "../components/KeyboardInput";
import psdField from "../prefabs/psdField";
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
		const enemy_3 = new Enemy(this, 112, -96);
		this.add.existing(enemy_3);

		// PSDRobot
		const pSDRobot = new PSD(this, -64, 256);
		this.add.existing(pSDRobot);
		pSDRobot.name = "PSDRobot";

		// start_level
		const start_level = this.add.sprite(144, 160, "Start-Level-Anim-Short-20");

		// lists
		const enemyTeam = [enemy_3];

		// wall_2 (components)
		new TileMapLayerPhysics(wall_2);

		// enemy_3 (components)
		const enemy_3FollowTarget = FollowTarget.getComponent(enemy_3);
		enemy_3FollowTarget.target = player;
		enemy_3FollowTarget.deadRangeX = 35;

		this.floor_2 = floor_2;
		this.wall_2 = wall_2;
		this.player = player;
		this.pSDRobot = pSDRobot;
		this.start_level = start_level;
		this.cave_test_map_1 = cave_test_map_1;
		this.cave_test_map_2 = cave_test_map_2;
		this.enemyTeam = enemyTeam;

		this.events.emit("scene-awake");
	}

	private floor_2!: Phaser.Tilemaps.TilemapLayer;
	private wall_2!: Phaser.Tilemaps.TilemapLayer;
	public player!: Player;
	private pSDRobot!: PSD;
	private start_level!: Phaser.GameObjects.Sprite;
	private enemyTeam!: Enemy[];

	/* START-USER-CODE */
	public platformer_fun!: Phaser.Tilemaps.Tilemap
	cave_test_map_2!: Phaser.Tilemaps.Tilemap
	cave_test_map_1!: Phaser.Tilemaps.Tilemap
	// Write your code here
	bulletGroup!: Phaser.GameObjects.Group
	lastfired = 0
	#destination!: SelectionSquare

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
		this.physics.add.overlap(this.bulletGroup, this.enemyTeam, this.handleBulletSwarm, undefined, this)

		this.#destination = SelectionSquare.getComponent(this.player)

		// this.playStartLevelAnims()

		this.events.on('create-bullet', this.handleBulletUpdate, this)
		this.events.on('deploy-PSD', this.deployPSD, this)
		this.events.on('takeback-PSD', this.takeBackPSD, this)
		this.start_level.on('animationcomplete', this.onStartLevelAnimsComplete, this)

		this.playStartLevelAnims()
	}

	update(time: number, delta: number)
	{
		this.handleDepthSort()
		this.showSelectionSquare()
	}

	private onStartLevelAnimsComplete()
	{
		this.player.setVisible(true)
		const input = KeyboardInput.getComponent(this.player)
		if(!input)
		{
			return
		}
		input.setActive(true)
	}

	private handleBulletSwarm(a: Phaser.Types.Physics.Arcade.GameObjectWithBody, b: Phaser.Types.Physics.Arcade.GameObjectWithBody)
	{
		const bullet = a as Bullet
		bullet.despawn()
	}

	private playStartLevelAnims()
	{
		this.player.setVisible(false)
		this.start_level.play('start-level-short')
	}

	private showSelectionSquare()
	{
		if(!this.#destination)
		{
			console.error(`selection square is undefined`)
			return
		}
		const square = this.#destination.getSelectionSquare()
		const body = square.body as Phaser.Physics.Arcade.Body
		body.debugBodyColor = body.touching.none ? 0x00ffff : 0xffff00;
	}

	private deployPSD()
	{
		const destination = SelectionSquare.getComponent(this.player)
		if(!destination)
		{
			console.error(`selection square is undefined`)
			return
		}

		const {x, y} = destination.getSelectionSquare()
		this.pSDRobot.spawn(x, y).play('psd-deploy', true)
		this.makeField(this.pSDRobot.x, this.pSDRobot.y, 3)
	}

	private makeField(x: number, y: number, lv = 2)
	{
		// const field = this.add.image(x -16, y -16, "PSDField", 5)
		/* const field = this.add.container(x, y, [
			this.add.image(-32, -32, "PSDField", 5),

		]) */
		const field = new psdField(this, x - 16, y - 16)
		field.makeNextLevel(lv)
		
		/* const count = this.tweens.addCounter({
			from: 0,
			to: 1,
			duration: 800,
			onUpdate: () => {
				field.setAlpha(count.getValue())
			}
		}) */
	}

	private takeBackPSD()
	{
		if(!this.checkSelectionPSDOverlap())
		{
			return
		}

		this.pSDRobot.playReverse('psd-deploy', true)
		this.pSDRobot.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
			this.time.delayedCall(300, () => {
				this.pSDRobot.despawn()
				this.player.emit('player-recover-psd')
			})
		})
		return
	}

	private checkSelectionPSDOverlap()
	{
		if(!this.#destination)
		{
			console.error(`selection square is undefined`)
			return
		}

		const checkRect = this.#destination.getSelectionSquare().getBounds()
		const PSDRect = this.pSDRobot.getBounds()

		return Phaser.Geom.Intersects.RectangleToRectangle(checkRect, PSDRect)
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