/* START OF COMPILED CODE */

import Phaser from "phaser";
import Physics from "../components/Physics";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class BlastTrapV2 extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "raw-break-interact", frame ?? 96);

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.static = true;
		thisPhysics.height = 32;
		thisPhysics.offsetY = 32;

		/* START-USER-CTR-CODE */
      this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this)
      this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
  start()
  {
    this.tweenRed()
  }

  update()
  {

  }

  private createProjectiles()
  {
    console.log('projectiles in 4 directions')
  }

  private tweenRed()
  {
    const tween = this.scene.tweens.addCounter({
      from: 255,
      to: 0,
      duration: 100,
      repeat: 5,
      onUpdate: tween => {
        const val = Math.floor(tween.getValue())
        this.setTint(Phaser.Display.Color.GetColor(255, val, val))
      }
    })

    tween.once(Phaser.Tweens.Events.TWEEN_COMPLETE, this.createProjectiles, this)
  }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
