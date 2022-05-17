
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CameraFollow extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__CameraFollow"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container): CameraFollow {
		return (gameObject as any)["__CameraFollow"];
	}

	private gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container;

	/* START-USER-CODE */
	start()
	{
		const { scene } = this.gameObject
		scene.cameras.main.startFollow(this.gameObject, true)
		scene.cameras.main.setBounds(0, -1000, 320, 640*99, true)
	}

	/* update(){
		// const player = this.gameObject;
		// const cam = this.gameObject.scene.cameras.main;
		// cam.y = (player.y*-1) + screen.height/3;

	} */

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here