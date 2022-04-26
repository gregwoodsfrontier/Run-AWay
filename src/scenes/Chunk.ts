// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Player from "../prefabs/Player";
import Rock from "../prefabs/Rock";
/* START-USER-IMPORTS */
import KeyboardInput from "../components/KeyboardInput";
import JustMovement from "../components/JustMovement";
import AnimationV2 from "../components/AnimationV2";
import DepthSortY from "../components/DepthSortY";
import TileGen from "../manager/TileGen";
import BlockOptimizer from "../manager/BlockOptimization";
import EndTunnel from "../prefabs/EndTunnel";
import { seed } from "../main";
import Bullet from "../prefabs/Bullet";
import Block from "../prefabs/Block";
import eventsCenter from "../EventsCenter";
import { SCENE_SWITCH_EVENTS } from "../types/scenes";
import { DIRECTION } from "../types/direction";
import MudTrap from "../prefabs/MudTrap";
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

		this.player = player;
		this.obstacles = obstacles;

		this.events.emit("scene-awake");
	}

	public player!: Player;
	private obstacles!: Rock[];

	/* START-USER-CODE */
	public platformer_fun!: Phaser.Tilemaps.Tilemap
	// Write your code here
	private blocks!: Block[];

	public mud = new Array();
	public proxymines = new Array();
	public poisonclouds = new Array();

	private tunnel!: EndTunnel;

	bulletGroup!: Phaser.GameObjects.Group

	lastfired = 0

	create() {

		this.editorCreate();
		eventsCenter.emit(SCENE_SWITCH_EVENTS.UPDATE_ACTIVE, "Chunk")
		this.player.play('player-front-idle')

		this.startWorldGen()

		// this.handlePlayerInput()

		// this code moves the player down to the beginning of the level (bottom left corner)
		const tempSeed = Phaser.Math.Between(100, 999)
		
		this.player.x = 48;
		this.player.y = 640*(20+Math.round(((tempSeed/3)/999)*100))+640-this.player.height;
		
		this.initObjectPool()

		// enable player input
        const input = KeyboardInput.getComponent(this.player)
        input.setActive(true)

		const block = new Block(this);
		
		//Bullet event
		this.events.on('create-bullet', this.handleBulletUpdate, this)

		//collision
		this.physics.add.collider(this.player, this.blocks, block.onPlayerHit);
		this.physics.add.collider(this.bulletGroup, this.blocks, this.onBulletHit);
		this.physics.add.collider(this.player, this.tunnel , this.switchtoBossScene);

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

		for(let i = 0; i < this.mud.length; i++)
		{
			this.add.existing(this.mud[i]);
		}

		for(let i = 0; i < this.proxymines.length; i++)
		{
			this.add.existing(this.proxymines[i]);
		}

		this.add.existing(this.tunnel);

		// apply blocks to this.blocks
		this.blocks = blocks;
	}

	optimize()
	{
		BlockOptimizer.HideIrrelevant(this.blocks, this.player.x, this.player.y);

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

	onBulletHit(a?,b?){
		const bullet = a as Bullet;
		bullet.despawn()
		const block = b as Block;
		block.onBulletHit(bullet , block)
	}

	//Switchesto boss Scene
	switchtoBossScene(){
		eventsCenter.emit(SCENE_SWITCH_EVENTS.TO_BOSS )
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here