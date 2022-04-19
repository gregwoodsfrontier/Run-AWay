
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import CopperBlock from "../components/CopperBlock";
import Physics from "../components/Physics";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
let WhiteHealth = 4;
let RedHealth = 12;
let GreenHealth = 20;
var objframe = 0;
export default class Block extends Phaser.GameObjects.Sprite {
	constructor(scene: Phaser.Scene,  x?: number, y?: number, texture?: string, frame?: number | string ) {
		super(scene, x ?? 0, y ?? 0, texture , frame ?? 0 );

		/* START-USER-CTR-CODE */
		// Write your code here.
		const physIcs = new Physics(this);
		physIcs.static = true;
		switch(texture){
			case("WhiteBlock"):
			this.setTexture("WhiteBlock" , 3)
			break;
			case("RedBlock"):
			this.setTexture("RedBlock" , 10)
			break;
			case("GreenBlock"):
			this.setTexture("GreenBlock" , 17)
			break;
		}
	
		/* END-USER-CTR-CODE */
	
	}

	public onCopperhit(obj1?:Phaser.GameObjects.Sprite , obj2? :Phaser.GameObjects.Sprite){
		//once player collide with it
		//changes frame name to int
		objframe = parseInt(obj2?.frame.name)
		objframe++;
		//checks if the object's frame has reached the limit
		if(obj2?.texture.key == "WhiteBlock" && objframe>WhiteHealth){
			obj2.destroy();
		}
		else if(obj2?.texture.key == "RedBlock" && objframe>RedHealth){
			obj2.destroy();
		}
		else if(obj2?.texture.key == "GreenBlock" && objframe>GreenHealth){
			obj2.destroy();
		}
		//apply texture to the block
		else{
			obj2?.setTexture(obj2.texture.key , objframe)
		}
	
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
