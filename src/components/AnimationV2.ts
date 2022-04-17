
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
type Char = 'player' | 'dude' | 'swarm' | 'testboss'
type Dir = 'left' | 'right' | 'front' | 'back'
type State = 'walk' | 'idle' | 'attack'
type HoldState = 'hold' | 'gun' | undefined

export interface AnimType {
	character: Char,
	direction: Dir,
	state: State,
	holdState?: HoldState
}
/* END-USER-IMPORTS */

export default class AnimationV2 extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__AnimationV2"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): AnimationV2 {
		return (gameObject as any)["__AnimationV2"];
	}

	private gameObject: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */

	// Write your code here.
	playAnims(data: AnimType)
	{
		const { character, direction, state, holdState } = data

		if(!holdState)
		{
			this.gameObject.play(`${character}-${direction}-${state}`, true)
			return
		}

		this.gameObject.play(`${character}-${direction}-${state}-${holdState}`, true)

	}

	playIdleFromWalk()
	{
		const key = this.gameObject.anims.currentAnim.key

		// this.gameObject.anims.setCurrentFrame()

		const parts = key.split('-')
		const char = parts[0]
		const direction = parts[1]

		if(parts.length < 4)
		{
			this.gameObject.play(`${char}-${direction}-idle`, true)
		}
		else
		{
			const holdstate = parts[parts.length-1]
			this.gameObject.play(`${char}-${direction}-idle-${holdstate}`, true)

		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
