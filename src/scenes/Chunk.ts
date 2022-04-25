// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import TileMapLayerPhysics from "../components/TileMapLayerPhysics";
import Player from "../prefabs/Player";
import Block from "../prefabs/Block";
import FollowTarget from "../components/FollowTarget";
import TileGen from "../manager/TileGen";
import BlockOptimizer from "../manager/BlockOptimization";
/* START-USER-IMPORTS */
import KeyboardInput from "../components/KeyboardInput";
import JustMovement from "../components/JustMovement";
import AnimationV2 from "../components/AnimationV2";
import DepthSortY from "../components/DepthSortY";
import EndTunnel from "../prefabs/EndTunnel";
import { seed } from "../main";
/* END-USER-IMPORTS */

export default class Chunk extends Phaser.Scene {

	constructor() {
		super("Chunk");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// cave_test_map_1

		// blocks
		//important to set the frame to check it in the callback
		/*9const block3 = new Block(this, 170, 180,"SilverBlock" ) ;
		const block1 = new Block(this, 170, 208,"CopperBlock" ) ;
		const block2 = new Block(this, 170, 208,"GoldBlock" ) ;
		const normalblock = new Block(this, 130, 250,"NormalBlock" ) ;
		const floorr = new Block(this, 170, 240,"RBorder" ) ;
		const blocks = [block1,block2,block3, floorr , normalblock]
		for(var x =0; x<blocks.length; x++){
			this.add.existing(blocks[x])
		}*/

		

		// player
		const player = new Player(this, 193, 446);
		this.add.existing(player);
		this.player = player;

		// const block = new Block(this);

		

		this.events.emit("scene-awake");
	}

	public player!: Player;
	


	/* START-USER-CODE */
	public platformer_fun!: Phaser.Tilemaps.Tilemap
	// Write your code here
	private blocks!: Block[];

	private tunnel!: EndTunnel;

	create() {

		this.editorCreate();
		this.player.play('player-front-idle')

		this.startWorldGen()

		this.handlePlayerInput()

		// this code moves the player down to the beginning of the level (bottom left corner)
		this.player.x = 48;
		this.player.y = 640*(20+Math.round(((seed/3)/999)*100))+640-this.player.height;

		const block = new Block(this);
		this.physics.add.collider(this.player, this.blocks, block.onHit);
		
	}

	update()
	{
		this.handleDepthSort();
		this.optimize();
	}

	private handlePlayerInput()
	{
		const playerKeyboardInput = KeyboardInput.getComponent(this.player)
		const playerMove = JustMovement.getComponent(this.player)
		const playerAnims = AnimationV2.getComponent(this.player)

		playerKeyboardInput.executeLeft = () => {
			playerMove.moveLeft()
			playerAnims.playAnims({
				character: 'player',
				direction: 'left',
				state: 'walk'
			})
		}
		playerKeyboardInput.executeRight = () => {
			playerMove.moveRight()
			playerAnims.playAnims({
				character: 'player',
				direction: 'right',
				state: 'walk'
			})
		}
		playerKeyboardInput.executeUp = () => {
			playerMove.moveUp()
			playerAnims.playAnims({
				character: 'player',
				direction: 'back',
				state: 'walk'
			})
		}
		playerKeyboardInput.executeDown = () => {
			playerMove.moveDown()
			playerAnims.playAnims({
				character: 'player',
				direction: 'front',
				state: 'walk'
			})
		}
		playerKeyboardInput.executeKeyUp = () => {
			playerMove.stayStill()
			playerAnims.playIdleFromWalk()
		}

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

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here