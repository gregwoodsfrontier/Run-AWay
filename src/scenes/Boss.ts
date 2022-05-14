
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Player from "../prefabs/PlayerContainer";
/* START-USER-IMPORTS */
import eventsCenter from "../EventsCenter";
import { SCENE_SWITCH_EVENTS } from "../types/scenes";
/* END-USER-IMPORTS */

export default class Boss extends Phaser.Scene {

	constructor() {
		super("Boss");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// boss_Level
		const boss_Level = this.add.tilemap("Boss Level");
		boss_Level.addTilesetImage("Boss Tileset", "BOSS LEVEL v1");

		// floor_1
		boss_Level.createLayer("Floor", ["Boss Tileset"], 0, 0);

		// walls_1
		boss_Level.createLayer("Walls", ["Boss Tileset"], 0, 0);

		// player
		const player = new Player(this, 80, 576);
		this.add.existing(player);

		// start_level_anim
		this.add.image(64, 576, "Start-Level-Anim-Short-20");

		this.player = player;
		this.boss_Level = boss_Level;

		this.events.emit("scene-awake");
	}

	private player!: Player;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		eventsCenter.emit(SCENE_SWITCH_EVENTS.UPDATE_ACTIVE, "Boss")
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
