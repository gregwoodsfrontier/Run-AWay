
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PreloadText from "../components/PreloadText";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// guapen
		const guapen = this.add.image(160, 320, "guapen");
		guapen.scaleX = 0.5915891440784282;
		guapen.scaleY = 0.5915891440784282;

		// progress
		const progress = this.add.text(160, 475, "", {});
		progress.setOrigin(0.5, 0.5);
		progress.text = "0%";
		progress.setStyle({ "fontSize": "30px" });

		// gamedevjs
		const gamedevjs = this.add.image(239, 231, "gamedevjs");
		gamedevjs.scaleX = 0.5663740786333126;
		gamedevjs.scaleY = 0.5663740786333126;

		// progress (components)
		new PreloadText(progress);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.load.pack("asset-pack", "assets/packs/asset-pack.json");
		this.load.pack("audio-asset-pack", "assets/packs/audio-asset-pack.json")
		this.load.pack("ingame-menu", "assets/packs/ingame-menu-asset-pack.json")
		this.load.pack("boss", "assets/packs/boss-asset-pack.json")

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Bootstrap"));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
