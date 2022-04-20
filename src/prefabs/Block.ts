
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
let SilverHealth = 4;
let CopperHealth = 12;
let GoldHealth = 20;
let NormalHealth = 28;
var objframe = 0;
export default class Block extends Phaser.GameObjects.Sprite {
	constructor(scene: Phaser.Scene,  x?: number, y?: number, texture?: string, frame?: number | string ) {
		super(scene, x ?? 0, y ?? 0, texture , frame ?? 0 );

		/* START-USER-CTR-CODE */
		// Write your code here.
		if(texture != "Floor"){
			const physIcs = new Physics(this);
			physIcs.static = true;
			switch(texture){
				case("SilverBlock"):
				this.setTexture("SilverBlock" , 3)
				break;
				case("CopperBlock"):
				this.setTexture("CopperBlock" , 10)
				break;
				case("GoldBlock"):
				this.setTexture("GoldBlock" , 17)
				break;
				case("NormalBlock"):
				this.setTexture("NormalBlock" , 26)
				break;
				case("ULBorder"):
				this.setTexture("Borders" ,24)
				this.setScale(0.5);
				physIcs.height =32;
				physIcs.width =32;
				break;
				case("UBorder"):
				this.setTexture("Borders" ,25)
				this.setScale(0.5);
				physIcs.height =32;
				physIcs.width =32;
				break;
				case("URBorder"):
				this.setTexture("Borders" ,26)
				this.setScale(0.5);
				physIcs.height =32;
				physIcs.width =32;
				break;
				case("LBorder"):
				this.setTexture("Borders" ,32)
				this.setScale(0.5);
				physIcs.height =32;
				physIcs.width =32;
				break;
				case("RBorder"):
				this.setTexture("Borders" ,34)
				this.setScale(0.5);
				physIcs.height =32;
				physIcs.width =32;
				break;
				case("BLBorder"):
				this.setTexture("Borders" ,40)
				this.setScale(0.5);
				physIcs.height =32;
				physIcs.width =32;
				break;
				case("BRBorder"):
				this.setTexture("Borders" ,42)
				this.setScale(0.5);
				physIcs.height =32;
				physIcs.width =32;
				break;
		}
	}
	else{
		this.setTexture("Floor" , 88)
	}
	
		/* END-USER-CTR-CODE */
	
	}

	public onCopperhit(obj1?:Phaser.GameObjects.Sprite , obj2? :Phaser.GameObjects.Sprite){
		//once player collide with it
		//changes frame name to int
		objframe = parseInt(obj2?.frame.name)
		objframe++;
		//checks if the object's frame has reached the limit
		if(obj2?.texture.key == "SilverBlock" && objframe>SilverHealth){
			obj2.destroy();
		}
		else if(obj2?.texture.key == "CopperBlock" && objframe>CopperHealth){
			obj2.destroy();
		}
		else if(obj2?.texture.key == "GoldBlock" && objframe>GoldHealth){
			obj2.destroy();
		}
		else if(obj2?.texture.key == "NormalBlock" && objframe>NormalHealth){
			obj2.destroy();
		}
		//apply texture to the block
		else if(obj2?.texture.key != "Borders"){
			obj2?.setTexture(obj2.texture.key , objframe)
		}
	
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
