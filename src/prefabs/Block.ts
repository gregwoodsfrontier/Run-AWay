
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Phaser from "phaser";
import Physics from "../components/Physics";
import { GameState } from "../manager/gameState";
/* END-USER-IMPORTS */

//Variables
let SilverHealth = 4;
let CopperHealth = 12;
let GoldHealth = 20;
let NormalHealth = 28;
let objframe = 0;
let Pickable = false;
//

export default class Block extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene,  x?: number, y?: number, texture?: string, frame?: number | string ) {
		super(scene, x ?? 0, y ?? 0, texture , frame ?? 0 );

		/* START-USER-CTR-CODE */
		if(texture != "Floor"){
			const physIcs = new Physics(this);
			physIcs.static = true;
			this.physIcs = physIcs;
			switch(texture){
				case("SilverBlock"):
					this.setTexture("raw-break-interact" , 3)
					break;
				case("CopperBlock"):
					this.setTexture("raw-break-interact" , 10)
					break;
				case("GoldBlock"):
					this.setTexture("raw-break-interact" , 17)
					break;
				case("NormalBlock"):
					this.setTexture("raw-break-interact" , 26)
					break;
				case("ULBorder"):
					this.setTexture("Borders" ,24)
					this.setScale(0.5);
					physIcs.height =14;
					physIcs.width =14;
					break;
				case("UBorder"):
					this.setTexture("Borders" ,25)
					this.setScale(0.5);
					physIcs.height =14;
					physIcs.width =32;
					break;
				case("URBorder"):
					this.setTexture("Borders" ,26)
					this.setScale(0.5);
					physIcs.height =14;
					physIcs.width =14;
					physIcs.offsetX =18;
					break;
				case("LBorder"):
					this.setTexture("Borders" ,32)
					this.setScale(0.5);
					physIcs.height =32;
					physIcs.width =14;
					break;
				case("RBorder"):
					this.setTexture("Borders" ,34)
					this.setScale(0.5);
					physIcs.height =32;
					physIcs.width =14;
					physIcs.offsetX=18;
					break;
				case("BBorder"):
					this.setTexture("Borders" ,41)
					this.setScale(0.5);
					physIcs.height =14;
					physIcs.width =32;
					physIcs.offsetY=18;
					break;
				case("BLBorder"):
					this.setTexture("Borders" ,40)
					this.setScale(0.5);
					physIcs.height =14;
					physIcs.width =14;
					physIcs.offsetY=18;
					break;
				case("BRBorder"):
					this.setTexture("Borders" ,42)
					this.setScale(0.5);
					physIcs.height =14;
					physIcs.width =14;
					physIcs.offsetX=18;
					physIcs.offsetY=18;
					break;
		}
	}
	else{
		this.setTexture("floor" ,Phaser.Math.Between(0,7))
	}
	
		/* END-USER-CTR-CODE */

	/* START-USER-CODE */

	
}

	private physIcs: Physics;

	public onBulletHit(obj1?:Phaser.GameObjects.Sprite , obj2? :Phaser.GameObjects.Sprite){
		//once player collide with it
		//changes frame name to int

		if(!obj2)
		{
			return
		}

		objframe = parseInt(obj2?.frame.name)
		objframe++;

		//checks if the object's frame has reached the limit
		if(objframe == SilverHealth +1){
			return;
		}
		else if(objframe == CopperHealth +1){
			return
		}
		else if(objframe == GoldHealth +1){
			return
		}
		else if(objframe == NormalHealth +1){
			return
		}
		if(obj2?.texture.key != "Borders" && !Pickable){
			obj2?.setFrame(objframe)
		}
		//apply texture to the block
		 
	}
	
	public onPlayerHit(obj1?:Phaser.GameObjects.Sprite , obj2? :Phaser.GameObjects.Sprite){
		let currentFrame = parseInt(obj2?.frame.name)
		if( currentFrame == SilverHealth  ){
			GameState.changeHealthBy(3)
			GameState.changeEnergyBy(3)
			GameState.changeSanityBy(3)
			obj2?.destroy();
		}
		else if(currentFrame == CopperHealth ){
			GameState.changeHealthBy(1)
			GameState.changeEnergyBy(1)
			GameState.changeSanityBy(1)
			obj2?.destroy()
		}
		else if(currentFrame == GoldHealth){
			GameState.changeHealthBy(5)
			GameState.changeEnergyBy(5)
			GameState.changeSanityBy(5)
			obj2?.destroy()
		}
		else if(currentFrame == NormalHealth){
			obj2?.destroy()
		}

	}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
