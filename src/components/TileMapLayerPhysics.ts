
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class TileMapLayerPhysics extends UserComponent {

	constructor(gameObject: Phaser.Tilemaps.TilemapLayer) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__TileMapLayerPhysics"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.Tilemaps.TilemapLayer): TileMapLayerPhysics {
		return (gameObject as any)["__TileMapLayerPhysics"];
	}

	private gameObject: Phaser.Tilemaps.TilemapLayer;

	/* START-USER-CODE */

	awake()
	{
		this.gameObject.setCollisionByProperty({ collides: true })
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
