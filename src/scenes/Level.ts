// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import TileMapLayerPhysics from "../components/TileMapLayerPhysics";
import Physics from "../components/Physics";
import KeyboardInput from "../components/KeyboardInput";
import JustMovement from "../components/JustMovement";
import Animation from "../components/Animation";
import DepthSortY from "../components/DepthSortY";
import Enemy from "../prefabs/Enemy";
import FollowTarget from "../components/FollowTarget";
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
		const floor_1 = cave_test_map_1.createLayer("floor", ["Gamdev jam cate tiles test 1"], 0, -960);

		// wall_1
		const wall_1 = cave_test_map_1.createLayer("wall", ["Gamdev jam cate tiles test 1"], 0, -960);

		// player
		const player = this.add.sprite(147, 335, "playerOnly-4");

		// enemy
		const enemy = new Enemy(this, 131, 557);
		this.add.existing(enemy);

		// enemy_1
		const enemy_1 = new Enemy(this, 188, 557);
		this.add.existing(enemy_1);

		// lists
		const enemyTeam = [enemy];

		// wall_1 (components)
		new TileMapLayerPhysics(wall_1);

		// player (components)
		const playerPhysics = new Physics(player);
		playerPhysics.width = 32;
		playerPhysics.height = 40;
		playerPhysics.offsetX = 16;
		playerPhysics.offsetY = 26;
		new KeyboardInput(player);
		const playerJustMovement = new JustMovement(player);
		playerJustMovement.speed = 100;
		const playerAnimation = new Animation(player);
		playerAnimation.frontWalk = "player-front-idle";
		playerAnimation.backWalk = "player-back-idle";
		playerAnimation.leftWalk = "player-left-idle";
		playerAnimation.rightWalk = "player-right-idle";
		new DepthSortY(player);

		// enemy (components)
		const enemyJustMovement = new JustMovement(enemy);
		enemyJustMovement.speed = 80;
		const enemyFollowTarget = new FollowTarget(enemy);
		enemyFollowTarget.target = player;
		enemyFollowTarget.range = 140;

		// enemy_1 (components)
		const enemy_1JustMovement = new JustMovement(enemy_1);
		enemy_1JustMovement.speed = 80;
		const enemy_1FollowTarget = new FollowTarget(enemy_1);
		enemy_1FollowTarget.target = player;
		enemy_1FollowTarget.range = 140;

		this.floor_1 = floor_1;
		this.wall_1 = wall_1;
		this.player = player;
		this.cave_test_map_1 = cave_test_map_1;
		this.enemyTeam = enemyTeam;

		this.events.emit("scene-awake");
	}

	private floor_1!: Phaser.Tilemaps.TilemapLayer;
	private wall_1!: Phaser.Tilemaps.TilemapLayer;
	public player!: Phaser.GameObjects.Sprite;
	private enemyTeam!: Enemy[];

	/* START-USER-CODE */
	public platformer_fun!: Phaser.Tilemaps.Tilemap
	// Write your code here

	create() {

		this.editorCreate();
		this.player.play('dude-front-idle')
		this.floor_1.depth = 0
		this.wall_1.depth = 0

		const playerKeyboardInput = KeyboardInput.getComponent(this.player)
		const playerMove = JustMovement.getComponent(this.player)
		const playerAnims = Animation.getComponent(this.player)

		playerKeyboardInput.executeLeft = () => {
			playerMove.moveLeft()
			playerAnims.playLeft()
		}
		playerKeyboardInput.executeRight = () => {
			playerMove.moveRight()
			playerAnims.playRight()
		}
		playerKeyboardInput.executeUp = () => {
			playerMove.moveUp()
			playerAnims.playBack()
		}
		playerKeyboardInput.executeDown = () => {
			playerMove.moveDown()
			playerAnims.playFront()
		}
		playerKeyboardInput.executeKeyUp = () => {
			playerMove.stayStill()
			playerAnims.playIdleFromWalk()
		}

		this.physics.add.collider(this.player, this.wall_1);
		this.physics.add.collider(this.player, this.enemyTeam)
		this.physics.add.collider(this.enemyTeam, this.enemyTeam)
		this.physics.add.collider(this.enemyTeam, this.wall_1)
	}

	update()
	{
		this.handleDepthSort()
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