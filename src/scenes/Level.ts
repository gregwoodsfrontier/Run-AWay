// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import TileMapLayerPhysics from "../components/TileMapLayerPhysics";
import DepthSortY from "../components/DepthSortY";
import Rock from "../prefabs/Rock";
import BlastTrapContainer from "../prefabs/BlastTrapContainer";
import CheckDistance from "../components/CheckDistance";
import PlayerContainer from "../prefabs/PlayerContainer";
import PSD from "../prefabs/PSD";
/* START-USER-IMPORTS */
import Enemy from "../prefabs/Enemy";
import { DIRECTION } from "../types/direction";
import Bullet from "../prefabs/Bullet";
import JustMovement from "../components/JustMovement";
import SelectionSquare from "../components/SelectionSquare";
import KeyboardInput from "../components/KeyboardInput";
import eventsCenter from "../EventsCenter";
import { AUDIO_PLAY_EVENTS, SCENE_SWITCH_EVENTS } from "../types/scenes";
import { GameState } from "../manager/gameState";
import FollowTarget from "../components/FollowTarget";
import { EVENTKEYS } from "../types/eventKeys";
import PhysicsChecker from "../manager/PhysicsChecker";
import TrapProjectile from "../prefabs/TrapProjectile";
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.

		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// cave_test_map_2
		const cave_test_map_2 = this.add.tilemap("cave-test-map-2");
		cave_test_map_2.addTilesetImage("gamedevjs-cave-tileset-1", "cave-test-tileset-1");

		// floor_1
		const floor_1 = cave_test_map_2.createLayer("floor", ["gamedevjs-cave-tileset-1"], 0, -960);

		// wall_1
		const wall_1 = cave_test_map_2.createLayer("wall", ["gamedevjs-cave-tileset-1"], 0, -960);

		// starting
		const starting = this.add.layer();

		// endTunnel_Wide
		const endTunnel_Wide = this.add.sprite(160, -976, "EndTunnel - Wide");
		starting.add(endTunnel_Wide);

		// rock_1
		const rock_1 = new Rock(this, 80, 32);
		starting.add(rock_1);

		// rock
		const rock = new Rock(this, 176, 32);
		starting.add(rock);

		// rock_2
		const rock_2 = new Rock(this, 144, 0);
		starting.add(rock_2);

		// rock_3
		const rock_3 = new Rock(this, 112, 32);
		starting.add(rock_3);

		// rock_4
		const rock_4 = new Rock(this, 208, 0);
		starting.add(rock_4);

		// rock_5
		const rock_5 = new Rock(this, 80, -32);
		starting.add(rock_5);

		// rock_6
		const rock_6 = new Rock(this, 208, -80);
		starting.add(rock_6);

		// rock_7
		const rock_7 = new Rock(this, 112, -80);
		starting.add(rock_7);

		// rock_8
		const rock_8 = new Rock(this, 144, -32);
		starting.add(rock_8);

		// rock_9
		const rock_9 = new Rock(this, 176, -112);
		starting.add(rock_9);

		// rock_10
		const rock_10 = new Rock(this, 80, -192);
		starting.add(rock_10);

		// rock_11
		const rock_11 = new Rock(this, 208, -160);
		starting.add(rock_11);

		// rock_12
		const rock_12 = new Rock(this, 112, -144);
		starting.add(rock_12);

		// rock_13
		const rock_13 = new Rock(this, 144, -176);
		starting.add(rock_13);

		// rock_14
		const rock_14 = new Rock(this, 176, -224);
		starting.add(rock_14);

		// rock_15
		const rock_15 = new Rock(this, 80, -272);
		starting.add(rock_15);

		// rock_16
		const rock_16 = new Rock(this, 208, -368);
		starting.add(rock_16);

		// rock_17
		const rock_17 = new Rock(this, 112, -320);
		starting.add(rock_17);

		// rock_18
		const rock_18 = new Rock(this, 144, -368);
		starting.add(rock_18);

		// rock_19
		const rock_19 = new Rock(this, 176, -304);
		starting.add(rock_19);

		// rock_20
		const rock_20 = new Rock(this, 176, -400);
		starting.add(rock_20);

		// rock_21
		const rock_21 = new Rock(this, 80, -592);
		starting.add(rock_21);

		// rock_22
		const rock_22 = new Rock(this, 80, -384);
		starting.add(rock_22);

		// rock_23
		const rock_23 = new Rock(this, 112, -432);
		starting.add(rock_23);

		// rock_24
		const rock_24 = new Rock(this, 80, -464);
		starting.add(rock_24);

		// rock_25
		const rock_25 = new Rock(this, 144, -480);
		starting.add(rock_25);

		// rock_27
		const rock_27 = new Rock(this, 176, -448);
		starting.add(rock_27);

		// rock_28
		const rock_28 = new Rock(this, 144, -544);
		starting.add(rock_28);

		// rock_26
		const rock_26 = new Rock(this, 208, -480);
		starting.add(rock_26);

		// rock_29
		const rock_29 = new Rock(this, 208, -512);
		starting.add(rock_29);

		// rock_30
		const rock_30 = new Rock(this, 80, -544);
		starting.add(rock_30);

		// rock_31
		const rock_31 = new Rock(this, 112, -560);
		starting.add(rock_31);

		// rock_32
		const rock_32 = new Rock(this, 176, -560);
		starting.add(rock_32);

		// rock_33
		const rock_33 = new Rock(this, 208, -544);
		starting.add(rock_33);

		// rock_34
		const rock_34 = new Rock(this, 112, -512);
		starting.add(rock_34);

		// rock_35
		const rock_35 = new Rock(this, 112, -592);
		starting.add(rock_35);

		// rock_36
		const rock_36 = new Rock(this, 144, -592);
		starting.add(rock_36);

		// rock_37
		const rock_37 = new Rock(this, 176, -592);
		starting.add(rock_37);

		// rock_38
		const rock_38 = new Rock(this, 208, -592);
		starting.add(rock_38);

		// exitZone
		const exitZone = this.add.rectangle(64, -992, 192, 32);
		exitZone.setOrigin(0, 1);
		exitZone.alpha = 0.1;
		exitZone.isFilled = true;
		starting.add(exitZone);

		// blastTrapContainer
		const blastTrapContainer = new BlastTrapContainer(this, 160, 240);
		starting.add(blastTrapContainer);

		// playerContainer
		const playerContainer = new PlayerContainer(this, 160, 160);
		this.add.existing(playerContainer);

		// pSDRobot
		const pSDRobot = new PSD(this, -200, 0);
		this.add.existing(pSDRobot);

		// start_level
		const start_level = this.add.sprite(144, 160, "Start-Level-Anim-Short-20");

		// blastTrapContainer_1
		const blastTrapContainer_1 = new BlastTrapContainer(this, 208, 352);
		this.add.existing(blastTrapContainer_1);

		// lists
		const obstacles = [rock_38, rock_37, rock_36, rock_35, rock_34, rock_33, rock_32, rock_31, rock_30, rock_29, rock_26, rock_28, rock_27, rock_25, rock_24, rock_23, rock_22, rock_21, rock_20, rock_19, rock_18, rock_17, rock_16, rock_15, rock_14, rock_13, rock_12, rock_11, rock_10, rock_9, rock_8, rock_7, rock_6, rock_5, rock_4, rock_3, rock_2, rock, rock_1];
		const mudList: Array<any> = [];
		const traps = [blastTrapContainer_1, blastTrapContainer];

		// wall_1 (components)
		new TileMapLayerPhysics(wall_1);

		// endTunnel_Wide (components)
		new DepthSortY(endTunnel_Wide);

		// rock (prefab fields)
		rock.rawType = 2;

		// rock_2 (prefab fields)
		rock_2.rawType = 2;

		// rock_3 (prefab fields)
		rock_3.rawType = 1;

		// rock_5 (prefab fields)
		rock_5.rawType = 1;

		// rock_7 (prefab fields)
		rock_7.rawType = 2;

		// rock_8 (prefab fields)
		rock_8.rawType = 2;

		// rock_9 (prefab fields)
		rock_9.rawType = 3;

		// rock_10 (prefab fields)
		rock_10.rawType = 2;

		// rock_11 (prefab fields)
		rock_11.rawType = 2;

		// rock_12 (prefab fields)
		rock_12.rawType = 1;

		// rock_13 (prefab fields)
		rock_13.rawType = 2;

		// rock_14 (prefab fields)
		rock_14.rawType = 2;

		// rock_15 (prefab fields)
		rock_15.rawType = 2;

		// rock_17 (prefab fields)
		rock_17.rawType = 2;

		// rock_18 (prefab fields)
		rock_18.rawType = 2;

		// rock_19 (prefab fields)
		rock_19.rawType = 1;

		// rock_20 (prefab fields)
		rock_20.rawType = 2;

		// rock_21 (prefab fields)
		rock_21.rawType = 1;

		// rock_23 (prefab fields)
		rock_23.rawType = 2;

		// rock_24 (prefab fields)
		rock_24.rawType = 2;

		// rock_25 (prefab fields)
		rock_25.rawType = 2;

		// rock_27 (prefab fields)
		rock_27.rawType = 1;

		// rock_28 (prefab fields)
		rock_28.rawType = 1;

		// rock_26 (prefab fields)
		rock_26.rawType = 2;

		// rock_29 (prefab fields)
		rock_29.rawType = 2;

		// rock_31 (prefab fields)
		rock_31.rawType = 2;

		// rock_32 (prefab fields)
		rock_32.rawType = 1;

		// rock_33 (prefab fields)
		rock_33.rawType = 2;

		// rock_34 (prefab fields)
		rock_34.rawType = 1;

		// rock_35 (prefab fields)
		rock_35.rawType = 1;

		// rock_36 (prefab fields)
		rock_36.rawType = 1;

		// rock_37 (prefab fields)
		rock_37.rawType = 2;

		// blastTrapContainer (components)
		const blastTrapContainerCheckDistance = CheckDistance.getComponent(blastTrapContainer);
		blastTrapContainerCheckDistance.target = playerContainer;

		// blastTrapContainer_1 (components)
		const blastTrapContainer_1CheckDistance = CheckDistance.getComponent(blastTrapContainer_1);
		blastTrapContainer_1CheckDistance.target = playerContainer;

		this.floor_1 = floor_1;
		this.wall_1 = wall_1;
		this.starting = starting;
		this.rock_1 = rock_1;
		this.rock = rock;
		this.rock_5 = rock_5;
		this.rock_9 = rock_9;
		this.rock_10 = rock_10;
		this.rock_14 = rock_14;
		this.rock_15 = rock_15;
		this.rock_19 = rock_19;
		this.rock_21 = rock_21;
		this.rock_22 = rock_22;
		this.rock_27 = rock_27;
		this.exitZone = exitZone;
		this.playerContainer = playerContainer;
		this.pSDRobot = pSDRobot;
		this.start_level = start_level;
		this.cave_test_map_2 = cave_test_map_2;
		this.obstacles = obstacles;
		this.mudList = mudList;
		this.traps = traps;

		this.events.emit("scene-awake");
	}

	private floor_1!: Phaser.Tilemaps.TilemapLayer;
	private wall_1!: Phaser.Tilemaps.TilemapLayer;
	private starting!: Phaser.GameObjects.Layer;
	private rock_1!: Rock;
	private rock!: Rock;
	private rock_5!: Rock;
	private rock_9!: Rock;
	private rock_10!: Rock;
	private rock_14!: Rock;
	private rock_15!: Rock;
	private rock_19!: Rock;
	private rock_21!: Rock;
	private rock_22!: Rock;
	private rock_27!: Rock;
	private exitZone!: Phaser.GameObjects.Rectangle;
	public playerContainer!: PlayerContainer;
	private pSDRobot!: PSD;
	private start_level!: Phaser.GameObjects.Sprite;
	private obstacles!: Rock[];
	private mudList!: Array<any>;
	private traps!: BlastTrapContainer[];

	/* START-USER-CODE */
	public platformer_fun!: Phaser.Tilemaps.Tilemap
	cave_test_map_2!: Phaser.Tilemaps.Tilemap
	cave_test_map_1!: Phaser.Tilemaps.Tilemap
	// Write your code here
	bulletGroup!: Phaser.GameObjects.Group
	enemyGroup!: Phaser.GameObjects.Group
	trapProjGroup!: Phaser.GameObjects.Group
	private physicsChecker!: PhysicsChecker

	lastfired = 0
	destination!: SelectionSquare

	create() {

		this.editorCreate()

		this.exitZone.setDepth(-1000)
		// this.loadSoundAssets()
		// eventcenter emit to tell Bootstrap which scene is active now
		eventsCenter.emit(SCENE_SWITCH_EVENTS.UPDATE_ACTIVE, "Level")
		eventsCenter.emit(AUDIO_PLAY_EVENTS.GAMEPLAY)

		// this.playerContainer.player.play('player-front-idle')
		this.floor_1.depth = this.wall_1.y * 2
		this.wall_1.depth = this.wall_1.y * 2

		// this.wall_1.setCollisionByProperty({collides: true})

		this.initObjectPool()

		this.destination = SelectionSquare.getComponent(this.playerContainer.player)

		this.events.on(EVENTKEYS.CREATE_BULLETS, this.handleBulletUpdate, this)
		this.events.on(EVENTKEYS.DEPLOY_PSD, this.deployPSD, this)
		this.events.on(EVENTKEYS.TAKEBACK_PSD, this.takeBackPSD, this)
		this.events.on(EVENTKEYS.GEN_TRAP_PROJECTILE, this.addTrapProj, this)
		// this.events.on(EVENTKEYS.GEN_PSD_FIELD, this.addColliderEnemyField, this)

		this.start_level.once('animationcomplete', () => {
			this.events.once('resume', this.onStartLevelAnimsComplete, this)
			eventsCenter.emit(SCENE_SWITCH_EVENTS.TO_EXPLAINER)
		}, this)

		this.playerContainer.setVisible(false)
		this.playStartLevelAnims()

		const fieldArr = [] as Phaser.GameObjects.GameObject[]
		this.pSDRobot.innerField?.getAll().forEach(item => {
			fieldArr.push(item)
		})
		this.pSDRobot.outerField?.getAll().forEach(item => {
			fieldArr.push(item)
		})
		// fieldArr.push(this.pSDRobot.innerField?.getAll(), this.pSDRobot.outerField?.getAll())

		this.physicsChecker = new PhysicsChecker(this, {
			player: this.playerContainer,
			swarm: this.enemyGroup,
			wall: this.wall_1,
			bullets: this.bulletGroup,
			rocks: this.obstacles,
			exitzone: this.exitZone,
			psdfield: fieldArr,
			trapProj: this.trapProjGroup
		})
	}

	update(time: number, delta: number)
	{
		this.handleDepthSort()
		this.checkForGameOver()
	}

	// private genTrapProjectile(trapx: number, trapy: number)
	// {
	// 	const pos = [
	// 		{x: 0, y: -32}, 
	// 		{x:  -32, y: 0}, 
	// 		{x: 0, y: 32}, 
	// 		{x: 32, y: 0}, 
	// 	]

	// 	const physData = [
	// 		{
	// 			width: 16,
	// 			height: 32,
	// 			offsetX: 8,
	// 			offsetY: 0
	// 		},
	// 		{
	// 			width: 32,
	// 			height: 16,
	// 			offsetX: 0,
	// 			offsetY: 8
	// 		}
	// 	]

	// 	for(let i = 0; i < pos.length; i++)
	// 	{
	// 		const proj = this.trapProjGroup.create(trapx + pos[i].x, trapy + pos[i].y) as TrapProjectile

	// 		const justMove = JustMovement.getComponent(proj)
	// 		justMove.speed = 100
	// 		switch(i) {
	// 			case DIRECTION.BACK: {
	// 				proj.setPhysicsData(physData[0])
	// 				proj.angle = -90;
	// 				justMove.moveUp();
	// 				break;
	// 			}
	// 			case DIRECTION.LEFT: {
	// 				proj.setPhysicsData(physData[1])
	// 				proj.angle = 180;
	// 				proj.flipY = true
	// 				justMove.moveLeft();
	// 				break;
	// 			}
	// 			case DIRECTION.FRONT: {
	// 				proj.setPhysicsData(physData[0])
	// 				proj.angle = 90;
	// 				proj.flipY = true
	// 				justMove.moveDown();
	// 				break;
	// 			}
	// 			case DIRECTION.RIGHT: {
	// 				proj.setPhysicsData(physData[1])
	// 				proj.angle = 0;
	// 				justMove.moveRight();
	// 				break;
	// 			}
	// 		}
	// 	}
	// }

	private checkForGameOver()
	{
		if(GameState.hp < 1 || GameState.sanity < 1)
		{
			this.sound.stopAll()
			eventsCenter.emit(SCENE_SWITCH_EVENTS.GO_GAMEOVER, "Level")
		}
	}

	//@ts-ignore
	private handlePlayerMud(p, m)
	{
		const player = p as PlayerContainer
		const pBody = player.body as Phaser.Physics.Arcade.Body
		if(!pBody)
		{
			return
		}

		// player.inMudCondition()

	}

	getCollidingBlocks()
	{
		return {
			wall: this.wall_1,
			rocks: this.obstacles,
			group: this.enemyGroup
		}
	}

	private RocksPropagator(startx: number, starty: number, endY: number)
	{
		const distX = 32
		const distY = 32
		for(let i = 0; i < 6; i++)
		{
			for(let j = 0; j < endY; j++)
			{
				if(j % 2 === 0 && i % 2 === 0)
				{
					this.createRock(startx + distX * i, starty - distY * j)
				}
				else if(j % 2 === 1 && i % 2 === 1)
				{
					this.createRock(startx + distX * i, starty - distY * j)
				}
			}
		}
	}

	private createRock(x: number, y: number)
	{
		const r = new Rock(this, x, y)
		this.add.existing(r)
		r.rawType = Phaser.Math.Between(1, 3)
		r.setCurrHP(r.rawType)
		r.startRockAnims()
		this.obstacles.push(r)

		// return r
	}

	/**
	 * Spawn a up-going swarm per x, y
	 */
	private SwarmGenerator(x: number, y: number, Repeat: number, Delay: number, StartAt: number = 0)
	{
		return this.time.addEvent({
			repeat: Repeat,
			delay: Delay,
			startAt: StartAt,
			callback: this.createSingleSwarm,
			callbackScope: this,
			args: [x, y]
		})
	}

	private createSingleSwarm(x: number, y: number)
	{
		// const enemy = new Enemy(this, x, y)
		// this.add.existing(enemy)
		// this.enemyTeam.push(enemy)

		const enemy = this.enemyGroup.get(x, y) as Enemy
		if(!enemy)
		{
			return
		}

		enemy.setActive(true).setVisible(true)
		this.physics.add.existing(enemy)

		enemy.startMovement()
		FollowTarget.getComponent(enemy).setTarget(this.playerContainer.player)

		const follow = FollowTarget.getComponent(enemy);

		if(!follow){ return }
		follow.setTarget(this.playerContainer.player)
		follow.range = 300
		follow.deadRangeX = 20

	}
	/**
	 * Spawns more swarm that goes
	 */

	/* private addColliderEnemyField()
	{
		if(!this.pSDRobot.outerField || !this.pSDRobot.innerField)
		{
			return
		}
		this.physics.add.collider(this.enemyGroup, this.pSDRobot.outerField.getAll(), this.handleEnemyFieldCollides, undefined, this)
		this.physics.add.collider(this.enemyGroup, this.pSDRobot.innerField.getAll(), this.handleEnemyFieldCollides, undefined, this)
	} */

	private onStartLevelAnimsComplete()
	{
		if(this.playerContainer)
		{
			this.playerContainer.setVisible(true)
		}

		const input = KeyboardInput.getComponent(this.playerContainer)
		if(!input)
		{
			return
		}
		input.setActive(true)

		// this.genEnemy()


		this.RocksPropagator(80, -624, 9)
	}

	private genEnemy()
	{
		this.SwarmGenerator(80, 384, 20, 4000, 0)
		this.SwarmGenerator(128, 384, 20, 4000, 2500)
		this.SwarmGenerator(176, 384, 20, 4000, 1500)
		this.SwarmGenerator(224, 384, 20, 4000,  500)
	}

	private playStartLevelAnims()
	{
		this.playerContainer.setVisible(false)
		this.start_level.play('start-level-short')
	}

	private deployPSD(rect: Phaser.GameObjects.Rectangle)
	{
		const {x, y} = rect
		const Xspawn = x + this.playerContainer.x
		const Yspawn = y + this.playerContainer.y
		if(this.cave_test_map_2.hasTileAtWorldXY(Xspawn, Yspawn, this.cameras.main, this.wall_1))
		{
			// revert psd comp state back to idle
			// this.playerContainer.setPSDCompState(PSD_STATES.EQIUP_IDLE)
			return
		}

		eventsCenter.emit(AUDIO_PLAY_EVENTS.DEPLOY)
		this.pSDRobot.spawn(Xspawn, Yspawn)
		this.pSDRobot.deploy()
	}

	private takeBackPSD(rect: Phaser.GameObjects.Rectangle)
	{
		if(!this.checkSelectionPSDOverlap(rect))
		{
			return
		}

		this.pSDRobot.returnToPlayer()
		this.events.once(EVENTKEYS.PSD_FULLY_SHUTDOWN, () => {
			this.playerContainer.emit(EVENTKEYS.PLAYER_RECOVER)
		})
		// 
	}

	private checkSelectionPSDOverlap(rect: Phaser.GameObjects.Rectangle)
	{
		if(!rect)
		{
			console.error(`selection square is undefined`)
			return
		}

		const checkRect = rect.getBounds()
		const PSDRect = this.pSDRobot.getBounds()

		return Phaser.Geom.Intersects.RectangleToRectangle(checkRect, PSDRect)
	}

	private addTrapProj(proj: TrapProjectile)
	{
		this.trapProjGroup.add(proj)
	}

	private handleBulletUpdate(dir: number)
	{
		const bullet = this.bulletGroup.get()

		const delay = 500

		if(bullet && this.time.now > this.lastfired)
		{
			eventsCenter.emit(AUDIO_PLAY_EVENTS.LASERGUN)

			bullet.fire(this.playerContainer.x, this.playerContainer.y)

			this.setBulletRotationAndVel(bullet, dir)
			// console.log('bullet', bullet.x, bullet.y)

			this.lastfired = this.time.now + delay
		}
	}

	private initObjectPool()
	{
		this.trapProjGroup = this.add.group({
			classType: TrapProjectile,
			maxSize: 50,
			runChildUpdate: true
		})

		this.bulletGroup = this.add.group({
			classType: Bullet,
			maxSize: 50,
			runChildUpdate: true
		})

		this.enemyGroup = this.add.group({
			classType: Enemy,
			maxSize: 100,
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