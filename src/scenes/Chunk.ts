// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Player from "../prefabs/PlayerContainer";
import Rock from "../prefabs/Rock";
import PSD from "../prefabs/PSD";
import { PSD_STATE } from "../types/PSD";
import Enemy from "../prefabs/Enemy";
import { ENEMY_STATE_KEYS } from "../types/enemyStateKeys";
import psdField from "../prefabs/psdField";
/* START-USER-IMPORTS */
import KeyboardInput from "../components/KeyboardInput";
import JustMovement from "../components/JustMovement";
import DepthSortY from "../components/DepthSortY";
import TileGen from "../manager/TileGen";
import BlockOptimizer from "../manager/BlockOptimization";
import EndTunnel from "../prefabs/EndTunnel";
// import { seed } from "../main";
import Bullet from "../prefabs/Bullet";
import Block from "../prefabs/Block";
import eventsCenter from "../EventsCenter";
import { SCENE_SWITCH_EVENTS } from "../types/scenes";
import { DIRECTION } from "../types/direction";
import MudTrap from "../prefabs/MudTrap";
import { time } from "console";
// import Blasts from "../prefabs/Blasts";
// import BlastsTrap from "../prefabs/BlastsTrap";
import PSDComp from "../components/PSDComp";
import SelectionSquare from "../components/SelectionSquare";
import FollowTarget from "../components/FollowTarget";
import { GameState } from "../manager/gameState";

/* END-USER-IMPORTS */

export default class Chunk extends Phaser.Scene {

	constructor() {
		super("Chunk");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// player
		const player = new Player(this, 148, 474);
		this.add.existing(player);

		// rock
		const rock = new Rock(this, 368, 480);
		this.add.existing(rock);

		// lists
		const obstacles = [rock];

		this.playerContainer = player;
		this.obstacles = obstacles;

		this.events.emit("scene-awake");
	}

	public playerContainer!: Player;
	private obstacles!: Rock[];

	/* START-USER-CODE */
	public platformer_fun!: Phaser.Tilemaps.Tilemap
	// Write your code here
	private blocks!: Block[];

	public mud = new Array();
	public proxymines = new Array();
	public poisonclouds = new Array();
	private pSDRobot!: PSD;
	#destination!: SelectionSquare
	private enemyA!: Enemy;
	private enemyTeam!: Enemy[];

	private tunnel!: EndTunnel;
	public timer: Phaser.Time.TimerEvent;

	bulletGroup!: Phaser.GameObjects.Group

	lastfired = 0

	create() {

		this.editorCreate();
		eventsCenter.emit(SCENE_SWITCH_EVENTS.UPDATE_ACTIVE, "Chunk")
		this.playerContainer.player.play('player-front-idle')

		this.startWorldGen()

		// this.handlePlayerInput()

		// this code moves the player down to the beginning of the level (bottom left corner)
		// const tempSeed = Phaser.Math.Between(100, 999)
		this.events.once('send-seed', (tempSeed: number) => {
			this.playerContainer.x = 48;
			this.playerContainer.y = 640*(20+Math.round(((tempSeed/3)/999)*100))+640-this.playerContainer.height;	
		}, this)

		//PSD
		const pSDRobot = new PSD(this, -this.playerContainer.x, this.playerContainer.y);
		this.add.existing(pSDRobot);

		this.pSDRobot = pSDRobot;
		
		// enemyA
		const enemyA = new Enemy(this, this.playerContainer.x +30 , this.playerContainer.y + 250);
		this.add.existing(enemyA);

		//enemyteam
		const enemyTeam = [enemyA];

		this.initObjectPool()

		this.enemyA = enemyA;
		this.enemyTeam = enemyTeam;

		// enable player input
        const input = KeyboardInput.getComponent(this.playerContainer.player)
        input.setActive(true)

		const block = new Block(this)
		const blasts = new BlastsTrap(this);
		//const blaststrap = new BlastsTrap(this)

		this.#destination = SelectionSquare.getComponent(this.playerContainer.player)

		this.enemyTeam.forEach(e => {
			FollowTarget.getComponent(e).activate()
			const enemy = e as Enemy
			enemy.startMovement()
		})
		this.SwarmGenerator(80, 384, 5, 3000, 0)
		this.SwarmGenerator(192, 384, 5, 3000, 1500)
		
		//Events
		this.events.on('create-bullet', this.handleBulletUpdate, this)
		this.events.on('deploy-PSD', this.deployPSD, this)
		this.events.on('takeback-PSD', this.takeBackPSD, this)
		this.events.on('gen-psd-field', this.addColliderEnemyField, this)


		//collision
			// Bullet Collision
		this.physics.add.overlap(this.bulletGroup, this.blocks, this.onBulletBlockHit);
		this.physics.add.collider(this.bulletGroup, this.mud, this.onBulletMudHit);
		this.physics.add.collider(this.bulletGroup, this.proxymines, this.DestroyBlast);
		this.physics.add.overlap(this.bulletGroup, this.enemyTeam, this.handleBulletSwarm, undefined, this)

			//Player collision
		this.physics.add.collider(this.playerContainer, this.blocks, block.onPlayerHit);
		this.physics.add.collider(this.playerContainer, this.mud, () =>{this.onPlayerMud()});
		this.physics.add.collider(this.playerContainer, this.tunnel , this.switchtoBossScene);
		this.physics.add.collider(this.playerContainer, this.enemyTeam, this.handlePlayerSwarm, undefined, this)
			
			//Enemy Collision
		this.physics.add.collider(this.enemyTeam, this.enemyTeam)
		this.physics.add.collider(this.enemyTeam, this.blocks)

	}

	update()
	{
		this.handleDepthSort();
		this.optimize();
	}

	private startWorldGen()
	{
		// generate world and get tiles
		const blocks: Block[] = TileGen.GenerateWorld(this);

		// add blocks to world
		for(let i = 0; i < blocks.length; i++)
		{
			this.add.existing(blocks[i]);
		}

		this.blocks = blocks;

		for(let i = 0; i < this.mud.length; i++)
		{
			this.add.existing(this.mud[i]);
		}

		for(let i = 0; i < this.proxymines.length; i++)
		{
			this.add.existing(this.proxymines[i]);
			this.proxymines[i].player = this.playerContainer;
			this.proxymines[i].walls = this.blocks;
		}

		this.add.existing(this.tunnel);

		// apply blocks to this.blocks
		
	}

	optimize()
	{
		BlockOptimizer.HideIrrelevant(this.blocks, this.playerContainer.x, this.playerContainer.y);

		// repeat this function after 2.5 seconds
		//this.time.delayedCall(2500, this.optimize, undefined, this)
	}

	private handleBlockCollision(
		a: Phaser.Types.Physics.Arcade.GameObjectWithBody, 
		b: Phaser.Types.Physics.Arcade.GameObjectWithBody
	)
	{
		const block = b as Block
		if(block.texture.key === "Borders")
		{
			return
		}
		else if(block.texture.key === "raw-break-interact")
		{
			console.log('this is a mine')
		}

		console.log(block.texture)
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

	//Bullet


	private handleBulletUpdate(dir: number)
	{
		const bullet = this.bulletGroup.get();

		const delay = 500

		if(bullet && this.time.now > this.lastfired)
		{
			bullet.fire(this.playerContainer.x, this.playerContainer.y)

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
	//Enemy
	//_____________________________________________________________________
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
		follow.setTarget(this.playerContainer.player)
		follow.range = 300
		follow.deadRangeX = 20

	}
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

	private ActivateEnemy(){
		this.enemyTeam.forEach(e => {
			FollowTarget.getComponent(e).activate()
			const enemy = e as Enemy
			enemy.startMovement()})
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
	//EnemyEnd
	//_____________________________________________________________________

	//PSD
	//_____________________________________________________________________

	private deployPSD()
	{
		const destination = SelectionSquare.getComponent(this.playerContainer.player)
		if(!destination)
		{
			console.error(`selection square is undefined`)
			return
		}

		const {x, y} = destination.getSelectionSquare()
		//this.player.setPSDCompState(PSD_STATE.EQIUP_IDLE)


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
		this.playerContainer.emit('player-recover-psd')
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
	//PSD code End
	//_____________________________________________________________________

	//Collision callbacks
	//___________________________________________________________________
	//@ts-ignore
	onBulletBlockHit(a?,b?){
		const bullet = a as Bullet;
		const block = b as Block;
		if(parseInt(block.frame.name) == 4 || parseInt(block.frame.name) == 12 || parseInt(block.frame.name) == 20
		|| parseInt(block.frame.name) == 28){
			return
		}
		bullet.despawn()
		block.onBulletHit(bullet , block)
	}
	//@ts-ignore
	onBulletMudHit(a?,b?){
		const bullet = a as Bullet;
		bullet.despawn()
		const mud = b as MudTrap;
		mud.destroy();
	}

	onPlayerMud(){
		this.playerContainer.inMudCondition();
		this.timer = this.time.addEvent({
			delay: 5000,                // ms
			callback: () =>{
				this.playerContainer.outMudCondition();
			}
		});
	}
	//@ts-ignore
	DestroyBlast(a , b){
		const bullet = a as Bullet;
		bullet.despawn()
		const blast = b as BlastsTrap
		blast.timer.destroy()
		blast.destroy()
	}



	//_____________________________________________________________________

	//Switchesto boss Scene
	switchtoBossScene(){
		eventsCenter.emit(SCENE_SWITCH_EVENTS.TO_BOSS )
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
