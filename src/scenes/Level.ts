// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Player from "../prefabs/Player";
import Enemy from "../prefabs/Enemy";
import PSD from "../prefabs/PSD";
import Rock from "../prefabs/Rock";
/* START-USER-IMPORTS */
import DepthSortY from "../components/DepthSortY";
import { DIRECTION } from "../types/direction";
import Bullet from "../prefabs/Bullet";
import JustMovement from "../components/JustMovement";
import SelectionSquare from "../components/SelectionSquare";
import KeyboardInput from "../components/KeyboardInput";
import { PSD_STATE } from "../types/PSD";
import eventsCenter from "../EventsCenter";
import { SCENE_SWITCH_EVENTS } from "../types/scenes";
import { ENEMY_STATE_KEYS } from "../types/enemyStateKeys";
import psdField from "../prefabs/psdField";
// import DetectionBoxes from "../components/DetectionBoxes";
import { GameState } from "../manager/gameState";
import FollowTarget from "../components/FollowTarget";
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

		// endTunnel___Wide
		this.add.image(160, -976, "EndTunnel - Wide");

		// floor_1
		const floor_1 = cave_test_map_2.createLayer("floor", ["gamedevjs-cave-tileset-1"], 0, -960);

		// wall_1
		const wall_1 = cave_test_map_2.createLayer("wall", ["gamedevjs-cave-tileset-1"], 0, -960);

		// player
		const player = new Player(this, 160, 160);
		this.add.existing(player);

		// enemyA
		const enemyA = new Enemy(this, -80, 384);
		this.add.existing(enemyA);

		// pSDRobot
		const pSDRobot = new PSD(this, -200, 0);
		this.add.existing(pSDRobot);

		// start_level
		const start_level = this.add.sprite(144, 160, "Start-Level-Anim-Short-20");

		// rock_1
		const rock_1 = new Rock(this, 80, 32);
		this.add.existing(rock_1);

		// rock
		const rock = new Rock(this, 176, 32);
		this.add.existing(rock);

		// rock_2
		const rock_2 = new Rock(this, 144, 0);
		this.add.existing(rock_2);

		// rock_3
		const rock_3 = new Rock(this, 112, 32);
		this.add.existing(rock_3);

		// rock_4
		const rock_4 = new Rock(this, 208, 0);
		this.add.existing(rock_4);

		// rock_5
		const rock_5 = new Rock(this, 80, -32);
		this.add.existing(rock_5);

		// rock_6
		const rock_6 = new Rock(this, 208, -80);
		this.add.existing(rock_6);

		// rock_7
		const rock_7 = new Rock(this, 112, -80);
		this.add.existing(rock_7);

		// rock_8
		const rock_8 = new Rock(this, 144, -32);
		this.add.existing(rock_8);

		// rock_9
		const rock_9 = new Rock(this, 176, -112);
		this.add.existing(rock_9);

		// rock_10
		const rock_10 = new Rock(this, 80, -192);
		this.add.existing(rock_10);

		// rock_11
		const rock_11 = new Rock(this, 208, -160);
		this.add.existing(rock_11);

		// rock_12
		const rock_12 = new Rock(this, 112, -144);
		this.add.existing(rock_12);

		// rock_13
		const rock_13 = new Rock(this, 144, -176);
		this.add.existing(rock_13);

		// rock_14
		const rock_14 = new Rock(this, 176, -224);
		this.add.existing(rock_14);

		// rock_15
		const rock_15 = new Rock(this, 80, -272);
		this.add.existing(rock_15);

		// rock_16
		const rock_16 = new Rock(this, 208, -368);
		this.add.existing(rock_16);

		// rock_17
		const rock_17 = new Rock(this, 112, -320);
		this.add.existing(rock_17);

		// rock_18
		const rock_18 = new Rock(this, 144, -368);
		this.add.existing(rock_18);

		// rock_19
		const rock_19 = new Rock(this, 176, -304);
		this.add.existing(rock_19);

		// rock_20
		const rock_20 = new Rock(this, 176, -400);
		this.add.existing(rock_20);

		// rock_21
		const rock_21 = new Rock(this, 80, -592);
		this.add.existing(rock_21);

		// rock_22
		const rock_22 = new Rock(this, 80, -384);
		this.add.existing(rock_22);

		// rock_23
		const rock_23 = new Rock(this, 112, -432);
		this.add.existing(rock_23);

		// rock_24
		const rock_24 = new Rock(this, 80, -464);
		this.add.existing(rock_24);

		// rock_25
		const rock_25 = new Rock(this, 144, -480);
		this.add.existing(rock_25);

		// rock_27
		const rock_27 = new Rock(this, 176, -448);
		this.add.existing(rock_27);

		// rock_28
		const rock_28 = new Rock(this, 144, -544);
		this.add.existing(rock_28);

		// rock_26
		const rock_26 = new Rock(this, 208, -480);
		this.add.existing(rock_26);

		// rock_29
		const rock_29 = new Rock(this, 208, -512);
		this.add.existing(rock_29);

		// rock_30
		const rock_30 = new Rock(this, 80, -544);
		this.add.existing(rock_30);

		// rock_31
		const rock_31 = new Rock(this, 112, -560);
		this.add.existing(rock_31);

		// rock_32
		const rock_32 = new Rock(this, 176, -560);
		this.add.existing(rock_32);

		// rock_33
		const rock_33 = new Rock(this, 208, -544);
		this.add.existing(rock_33);

		// rock_34
		const rock_34 = new Rock(this, 112, -512);
		this.add.existing(rock_34);

		// rock_35
		const rock_35 = new Rock(this, 112, -592);
		this.add.existing(rock_35);

		// rock_36
		const rock_36 = new Rock(this, 144, -592);
		this.add.existing(rock_36);

		// rock_37
		const rock_37 = new Rock(this, 176, -592);
		this.add.existing(rock_37);

		// rock_38
		const rock_38 = new Rock(this, 208, -592);
		this.add.existing(rock_38);

		// rectangle_1
		const rectangle_1 = this.add.rectangle(64, -608, 192, 192);
		rectangle_1.setOrigin(0, 1);
		rectangle_1.alpha = 0;
		rectangle_1.isFilled = true;

		// exitZone
		const exitZone = this.add.rectangle(64, -944, 192, 32);
		exitZone.setOrigin(0, 1);
		exitZone.alpha = 0.1;
		exitZone.isFilled = true;

		// lists
		const enemyTeam = [enemyA];
		const obstacles = [rock_38, rock_37, rock_36, rock_35, rock_34, rock_33, rock_32, rock_31, rock_30, rock_29, rock_26, rock_28, rock_27, rock_25, rock_24, rock_23, rock_22, rock_21, rock_20, rock_19, rock_18, rock_17, rock_16, rock_15, rock_14, rock_13, rock_12, rock_11, rock_10, rock_9, rock_8, rock_7, rock_6, rock_5, rock_4, rock_3, rock_2, rock, rock_1];
		const mudList: Array<any> = [];

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

		this.floor_1 = floor_1;
		this.wall_1 = wall_1;
		this.player = player;
		this.enemyA = enemyA;
		this.pSDRobot = pSDRobot;
		this.start_level = start_level;
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
		this.cave_test_map_2 = cave_test_map_2;
		this.enemyTeam = enemyTeam;
		this.obstacles = obstacles;
		this.mudList = mudList;

		this.events.emit("scene-awake");
	}

	private floor_1!: Phaser.Tilemaps.TilemapLayer;
	private wall_1!: Phaser.Tilemaps.TilemapLayer;
	public player!: Player;
	private enemyA!: Enemy;
	private pSDRobot!: PSD;
	private start_level!: Phaser.GameObjects.Sprite;
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
	private enemyTeam!: Enemy[];
	private obstacles!: Rock[];
	private mudList!: Array<any>;

	/* START-USER-CODE */
	public platformer_fun!: Phaser.Tilemaps.Tilemap
	cave_test_map_2!: Phaser.Tilemaps.Tilemap
	cave_test_map_1!: Phaser.Tilemaps.Tilemap
	// Write your code here
	bulletGroup!: Phaser.GameObjects.Group
	lastfired = 0
	#destination!: SelectionSquare

	create() {

		this.editorCreate();
		// eventcenter emit to tell Bootstrap which scene is active now
		eventsCenter.emit(SCENE_SWITCH_EVENTS.UPDATE_ACTIVE, "Level")

		this.player.play('player-front-idle')
		this.floor_1.depth = this.wall_1.y * 2
		this.wall_1.depth = this.wall_1.y * 2

		// this.wall_1.setCollisionByProperty({collides: true})

		this.initObjectPool()

		this.physics.add.collider(this.player, this.wall_1);
		this.physics.add.collider(this.player, this.enemyTeam, this.handlePlayerSwarm, undefined, this)
		//@ts-ignore
		this.physics.add.collider(this.enemyTeam, this.enemyTeam)
		this.physics.add.collider(this.enemyTeam, this.wall_1)
		this.physics.add.collider(this.bulletGroup, this.wall_1, this.handleBulletWallCollision, undefined, this)
		this.physics.add.overlap(this.bulletGroup, this.enemyTeam, this.handleBulletSwarm, undefined, this)
		this.physics.add.collider(this.enemyTeam, this.obstacles)
		this.physics.add.collider(this.bulletGroup, this.obstacles, this.handleBulletRocks, this.checkBulletRocks)
		this.physics.add.collider(this.player, this.obstacles, this.handlePlayerRocks)

		this.physics.add.existing(this.exitZone, true)
		this.physics.add.collider(this.player, this.exitZone, this.goToChunks)

		this.#destination = SelectionSquare.getComponent(this.player)

		this.events.on('create-bullet', this.handleBulletUpdate, this)
		this.events.on('deploy-PSD', this.deployPSD, this)
		this.events.on('takeback-PSD', this.takeBackPSD, this)
		this.events.on('gen-psd-field', this.addColliderEnemyField, this)

		this.start_level.once('animationcomplete', () => {
			this.events.once('resume', this.onStartLevelAnimsComplete, this)
			eventsCenter.emit(SCENE_SWITCH_EVENTS.TO_EXPLAINER)
		}, this)
		this.enemyTeam.forEach(e => {
			FollowTarget.getComponent(e).deactivate()
		})

		this.player.setVisible(false)
		this.playStartLevelAnims()

		/* if(process.env.NODE_ENV !== "development")
		{
			this.start_level.once('animationcomplete', () => {
				this.events.once('resume', this.onStartLevelAnimsComplete, this)
				eventsCenter.emit(SCENE_SWITCH_EVENTS.TO_EXPLAINER)
			}, this)
			this.enemyTeam.forEach(e => {
				FollowTarget.getComponent(e).deactivate()
			})

			this.player.setVisible(false)
			this.playStartLevelAnims()

			// swarm and rock propagator are in onStartLevelAnimsComplete
			return
		} */

		// bypass if environment is in development
		/* this.start_level.setVisible(false).setActive(false)
		this.onStartLevelAnimsComplete()

		this.SwarmGenerator(80, 384, 5, 3000, 0)
		this.SwarmGenerator(192, 384, 5, 3000, 1500)
		this.RocksPropagator(80, -624, 9) */
	}

	update(time: number, delta: number)
	{
		this.handleDepthSort()
		this.checkForGameOver()
	}

	private checkForGameOver()
	{
		if(GameState.hp < 1 || GameState.sanity < 1)
		{
			eventsCenter.emit(SCENE_SWITCH_EVENTS.GO_GAMEOVER, "Level")
		}
	}

	//@ts-ignore
	private handlePlayerMud(p, m)
	{
		const player = p as Player
		const pBody = player.body as Phaser.Physics.Arcade.Body
		if(!pBody)
		{
			return
		}

		console.log('player is in mud')
		// player.inMudCondition()

	}

	getCollidingBlocks()
	{
		return {
			wall: this.wall_1,
			rocks: this.obstacles,
			group: this.enemyTeam
		}
	}

	private goToChunks()
	{
		// console.log('scene key', this.scene.key)
		eventsCenter.emit(SCENE_SWITCH_EVENTS.TO_CHUNKS, "Level")
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

	private handlePlayerRocks(p: Phaser.Types.Physics.Arcade.GameObjectWithBody, r: Phaser.Types.Physics.Arcade.GameObjectWithBody)
	{
		const player = p as Player
		const rocks = r as Rock
		if(!rocks.isPickable)
		{
			return
		}

		rocks.beingPickedUp()
	}

	//@ts-ignore
	private checkBulletRocks(a, b)
	{
		const rock = b as Rock
		return !rock.isPickable
	}

	//@ts-ignore
	private handleBulletRocks(a, b)
	{
		const bullet = a as Bullet
		const rock = b as Rock

		bullet.despawn()

		rock.damage(1)

		// rock.destroy()
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

	private handlePlayerSwarm(p: any, e: any)
	{
		const enemy = e as Enemy
		GameState.changeHealthBy(-10)
		enemy.despawn()
	}

	private createSingleSwarm(x: number, y: number)
	{
		const enemy = new Enemy(this, x, y)
		this.add.existing(enemy)
		this.enemyTeam.push(enemy)
		const follow = FollowTarget.getComponent(enemy);
		follow.setTarget(this.player)
		follow.range = 300
		follow.deadRangeX = 20

	}
	/**
	 * Spawns more swarm that goes
	 */
	private createMoreSwarm()
	{
		const spawnX = [80, 128, 160, 192]
		const spawnY = 0
		for(let i = 0; i < spawnX.length; i++)
		{
			const enemy = new Enemy(this, spawnX[i], spawnY)
			this.add.existing(enemy)
			const follow = FollowTarget.getComponent(enemy);
			follow.range = 300
			follow.deadRangeX = 35
			this.enemyTeam.push(enemy)
		}
	}

	private addColliderEnemyField()
	{
		if(!this.pSDRobot.outerField || !this.pSDRobot.innerField)
		{
			return
		}
		this.physics.add.collider(this.enemyTeam, this.pSDRobot.outerField.getAll(), this.handleEnemyFieldCollides, undefined, this)
		this.physics.add.collider(this.enemyTeam, this.pSDRobot.innerField.getAll(), this.handleEnemyFieldCollides, undefined, this)
	}

	//@ts-ignore
	private handleEnemyFieldCollides(e, f)
	{
		// enemy enrages
		const enemy = e as Enemy
		const field = f as Phaser.Physics.Arcade.Image
		const fieldCon = field.parentContainer as psdField
		const follow = FollowTarget.getComponent(enemy)
		follow.deactivate()
		enemy.enrage()

		let ty = 5
		const t = this.tweens.create({
			targets: enemy,
			duration: 200,
			onStart: () => {
				enemy.setSMState(ENEMY_STATE_KEYS.IDLE)
				const b = enemy.body as Phaser.Physics.Arcade.Body
				b.setVelocity(ty)
			},
			onComplete: () => {
				enemy.setSMState(ENEMY_STATE_KEYS.WALK)
			}
		})


		fieldCon.damage(enemy.attack)
		this.time.delayedCall(500, () => {
			if(field.y < enemy.y)
			{
				ty = 4
				t.play()
			}
			else if(field.y > enemy.y)
			{
				ty = -4
				t.play()
			}
		})

	}

	//@ts-ignore
	private enrageEnemy(enemy, field)
	{
		const e = enemy as Enemy
		const follow = FollowTarget.getComponent(e)
		follow.deactivate()
		e.enrage()
	}

	private onStartLevelAnimsComplete()
	{
		if(this.player)
		{
			this.player.setVisible(true)
		}

		const input = KeyboardInput.getComponent(this.player)
		if(!input)
		{
			return
		}
		input.setActive(true)
		this.enemyTeam.forEach(e => {
			FollowTarget.getComponent(e).activate()
			const enemy = e as Enemy
			enemy.startMovement()
		})

		this.SwarmGenerator(80, 384, 5, 3000, 0)
		this.SwarmGenerator(192, 384, 5, 3000, 1500)
		this.RocksPropagator(80, -624, 9)
	}

	private handleBulletSwarm(a: Phaser.Types.Physics.Arcade.GameObjectWithBody, b: Phaser.Types.Physics.Arcade.GameObjectWithBody)
	{
		const bullet = a as Bullet
		const enemy = b as Enemy
		bullet.despawn()
		enemy.emit('stay-still')
		enemy.destoryAndDetach()
		const idxToDel = this.enemyTeam.findIndex(e => e = enemy)
		this.enemyTeam.splice(idxToDel, 1)
		// enemy.despawn()
	}

	private playStartLevelAnims()
	{
		this.player.setVisible(false)
		this.start_level.play('start-level-short')
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
		if(this.cave_test_map_2.hasTileAtWorldXY(x, y, this.cameras.main, this.wall_1))
		{
			// revert psd comp state back to idle
			this.player.setPSDCompState(PSD_STATE.EQIUP_IDLE)
			return
		}

		this.pSDRobot.spawn(x, y)
		this.pSDRobot.deploy()
	}

	private takeBackPSD()
	{
		if(!this.checkSelectionPSDOverlap())
		{
			return
		}

		this.pSDRobot.returnToPlayer()
		this.player.emit('player-recover-psd')
		this.enemyTeam.forEach(e => {
			FollowTarget.getComponent(e).activate()
		})
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