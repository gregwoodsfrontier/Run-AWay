
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class psdField extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? -16, y ?? -16);

		// top-left
		const top_left = scene.add.image(-16, -16, "PSDField", 5);
		this.add(top_left);

		// top-right
		const top_right = scene.add.image(48, -16, "PSDField", 6);
		this.add(top_right);

		// bot-left
		const bot_left = scene.add.image(-16, 48, "PSDField", 9);
		this.add(bot_left);

		// bot-right
		const bot_right = scene.add.image(48, 48, "PSDField", 10);
		this.add(bot_right);

		// top
		const top = scene.add.image(16, -16, "PSDField", 1);
		this.add(top);

		// left
		const left = scene.add.image(-16, 16, "PSDField", 4);
		this.add(left);

		// right
		const right = scene.add.image(48, 16, "PSDField", 7);
		this.add(right);

		// bot
		const bot = scene.add.image(16, 48, "PSDField", 13);
		this.add(bot);

		// top_left (components)
		const top_leftPhysics = new Physics(top_left);
		top_leftPhysics.static = true;

		// top_right (components)
		const top_rightPhysics = new Physics(top_right);
		top_rightPhysics.static = true;

		// bot_left (components)
		const bot_leftPhysics = new Physics(bot_left);
		bot_leftPhysics.static = true;

		// bot_right (components)
		const bot_rightPhysics = new Physics(bot_right);
		bot_rightPhysics.static = true;

		// top (components)
		const topPhysics = new Physics(top);
		topPhysics.static = true;

		// left (components)
		const leftPhysics = new Physics(left);
		leftPhysics.static = true;

		// right (components)
		const rightPhysics = new Physics(right);
		rightPhysics.static = true;

		// bot (components)
		const botPhysics = new Physics(bot);
		botPhysics.static = true;

		this.top_left = top_left;
		this.top_right = top_right;
		this.bot_left = bot_left;
		this.bot_right = bot_right;
		this.top = top;
		this.left = left;
		this.right = right;
		this.bot = bot;

		/* START-USER-CTR-CODE */
		// Write your code here.
		scene.add.existing(this)
		/* END-USER-CTR-CODE */
	}

	private top_left: Phaser.GameObjects.Image;
	private top_right: Phaser.GameObjects.Image;
	private bot_left: Phaser.GameObjects.Image;
	private bot_right: Phaser.GameObjects.Image;
	private top: Phaser.GameObjects.Image;
	private left: Phaser.GameObjects.Image;
	private right: Phaser.GameObjects.Image;
	private bot: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
