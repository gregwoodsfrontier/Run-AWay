
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ButtonScaleComp extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__ButtonScaleComp"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): ButtonScaleComp {
		return (gameObject as any)["__ButtonScaleComp"];
	}

	private gameObject: Phaser.GameObjects.Image;

	/* START-USER-CODE */
	public endScale = 1.2

	// Write your code here.
	scaleDown()
	{
		const tween = this.scene.tweens.addCounter({
			from: this.endScale,
			to: 1,
			duration: 300,
			onUpdate: () => {
				const scalin = tween.getValue()
				this.gameObject.setScale(scalin)
			}
		})
	}

	scaleUp()
	{
		const tween = this.scene.tweens.addCounter({
			from: 1,
			to: this.endScale,
			duration: 300,
			onUpdate: () => {
				const scalin = tween.getValue()
				this.gameObject.setScale(scalin)
			}
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
