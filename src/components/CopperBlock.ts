import Phaser from "phaser";
import UserComponent from "./UserComponent";
import Block from "../prefabs/Block";
let Health =5;
export default class CopperBlock extends UserComponent{

    private gameObject: Phaser.GameObjects.Sprite
    constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);
        this.gameObject = gameObject;
		(gameObject as any)["__CopperBlock"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): CopperBlock {
		return (gameObject as any)["__CopperBlock"];
	}
    public onCopperHit(obj1?:Phaser.GameObjects.Sprite , obj2? :Phaser.GameObjects.Sprite ){
		Health--;
        obj2.setTexture("Block" , 1);
		console.log(Health)
    }
}