
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PlayerContainer from "../prefabs/PlayerContainer";
import Rock from "../prefabs/Rock";
/* START-USER-IMPORTS */
import KeyboardInput from "../components/KeyboardInput";
/* END-USER-IMPORTS */

export default class Chunk extends Phaser.Scene {

	constructor() {
		super("Chunk");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// playerContainer
		const playerContainer = new PlayerContainer(this, 179, 356);
		this.add.existing(playerContainer);

		// rock
		const rock = new Rock(this, 102, 267);
		this.add.existing(rock);

		this.playerContainer = playerContainer;

		this.events.emit("scene-awake");
	}

	private playerContainer!: PlayerContainer;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
