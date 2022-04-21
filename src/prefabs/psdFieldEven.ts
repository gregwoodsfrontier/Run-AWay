
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class psdFieldEven extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? -129, y ?? 149);

		// top-left
		const top_left = scene.add.sprite(113, -165, "PSDField", 5);
		this.add(top_left);

		// top-right
		const top_right = scene.add.sprite(145, -165, "PSDField", 6);
		this.add(top_right);

		// bot-left
		const bot_left = scene.add.sprite(113, -133, "PSDField", 9);
		this.add(bot_left);

		// bot-right
		const bot_right = scene.add.sprite(145, -133, "PSDField", 10);
		this.add(bot_right);

		this.top_left = top_left;
		this.top_right = top_right;
		this.bot_left = bot_left;
		this.bot_right = bot_right;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	private top_left: Phaser.GameObjects.Sprite;
	private top_right: Phaser.GameObjects.Sprite;
	private bot_left: Phaser.GameObjects.Sprite;
	private bot_right: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
