
// You can write more code here

/* START OF COMPILED CODE */
import Phaser from "phaser";
import Physics from "../components/Physics";
import { GameState } from "../manager/gameState";
/* START-USER-IMPORTS */
enum STATE {
	IDLE,
	DAMAGED
}
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
		new Physics(top_left);

		// top_right (components)
		new Physics(top_right);

		// bot_left (components)
		new Physics(bot_left);

		// bot_right (components)
		new Physics(bot_right);

		// top (components)
		new Physics(top);

		// left (components)
		new Physics(left);

		// right (components)
		new Physics(right);

		// bot (components)
		new Physics(bot);

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

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this)
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)

		this.state = STATE.IDLE
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
	private status = [
		{
			lv: 1,
			hitPoint: 30
		},
		{
			lv: 2,
			hitPoint: 70
		}
	]

	private currLv = 1
	private currHP = 30

	// Write your code here.
	start()
	{
		const images = [
			this.top,
			this.left,
			this.right,
			this.bot,
			this.top_left,
			this.top_right,
			this.bot_left,
			this.bot_right
		]

		images.forEach(e => e.setVisible(false))
	}

	update()
	{
		this.checkZeroHealth()
	}

	clearField()
	{
		this.removeAll(true)
	}

	private checkZeroHealth()
	{
		if(this.currHP > 0)
		{
			return
		}

		this.clearField()
	}

	private setProps(lv: number)
	{
		if(lv < 2 && lv > 0)
		{
			this.currHP = this.status[0].hitPoint
			this.currLv = this.status[0].lv
		}
		else
		{
			this.currHP = this.status[1].hitPoint
			this.currLv = this.status[1].lv
		}
	}

	damage(n: number)
	{
		if(this.state === STATE.DAMAGED)
		{
			return
		}

		this.currHP = Phaser.Math.Clamp(this.currHP - n, 0, 70)
		GameState.changeEnergyBy(-n)
		this.state = STATE.DAMAGED

		this.scene.time.delayedCall(500, () => {
			this.state = STATE.IDLE
		})
	}

	makeNextLevel(lv: number)
	{
		/**
		 * 	Lv 2
		 *  [TL]-[T]x3-[TR]
		 * 	[L]-      -[R]
		 * 	 x3-      - x3
		 *  [BL]-[B]x3-[BR]
		*/

		this.setProps(lv)

		const {scene} = this
		const lim = lv * 2 + 1
		const sprKey = "PSDField"
		this.removeAll()

		for(let a = 0; a < lim; a++)
		{
			for(let b = 0; b < lim; b++)
			{
				let index = -1
				if(a === 0)
				{
					if(b === 0)
					{
						// top - left
						index = 0
					}
					else if(b === lim - 1)
					{
						// bot - left
						index = 12
					}
					else
					{
						// left
						index = 4
					}
				}
				else if(a === lim - 1)
				{
					if(b === 0)
					{
						// top - right
						index = 3
					}
					else if(b === lim - 1)
					{
						// bot - right
						index = 15
					}
					else
					{
						index = 7
					}
				}
				else
				{
					if(b === 0)
					{
						// top
						index = 1
					}
					else if(b === lim - 1)
					{
						// bot
						index = 13
					}
				}

				if(index < 0)
				{
					continue
				}

				const img = scene.physics.add.image( -32*(lv-0.5) + a*32, -32*(lv-0.5) + b*32, sprKey, index )
				img.setPushable(false)
				this.add(img)

			}
		}
		scene.add.existing(this)
		// this.scene.physics.add.existing(this, true)

		this.scene.events.emit('gen-psd-field')
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
