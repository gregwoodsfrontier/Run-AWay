
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class KeyboardInput extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__KeyboardInput"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): KeyboardInput {
		return (gameObject as any)["__KeyboardInput"];
	}

	private gameObject: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	start()
	{
		const scene = this.gameObject.scene
		this.cursors = scene.input.keyboard.createCursorKeys();

		/* this.scene.input.keyboard.on('keydown-UP', function (event: KeyboardEvent) {
			if(event.shiftKey)
			{
				console.log('shift + UP')
				return
			}
		}) */
	}

	update()
	{
		if(this.cursors.shift.isDown)
		{
			if(this.cursors.up.isDown)
			{
				this.executeShiftUp()
			}
			else if(this.cursors.down.isDown)
			{
				this.executeShiftDown()
			}
			else if(this.cursors.left.isDown)
			{
				this.executeShiftLeft()
			}
			else if(this.cursors.right.isDown)
			{
				this.executeShiftRight()
			}
			else
			{
				this.executeShiftKeyUp()
			}

			return
		}

		if(this.cursors.left.isDown)
		{
			this.executeLeft()
		}
		else if(this.cursors.right.isDown)
		{
			this.executeRight()
		}
		else if(this.cursors.up.isDown)
		{
			this.executeUp()
		}
		else if(this.cursors.down.isDown)
		{
			this.executeDown()
		}
		else
		{	
			this.executeKeyUp()
		}

		if(Phaser.Input.Keyboard.JustDown(this.cursors.space))
		{
			this.executeSpace()
		}
	}

	executeShiftUp()
	{
		
	}

	executeShiftDown()
	{
		
	}

	executeShiftLeft()
	{
		
	}

	executeShiftRight()
	{
		
	}

	executeShiftKeyUp()
	{
		
	}

	executeKeyUp()
	{
		console.log('up is input')
	}

	executeLeft()
	{
		console.log('left is input')
	}

	executeRight()
	{
		console.log('right is input')
	}

	executeUp()
	{
		console.log('up is input')
	}

	executeDown()
	{
		console.log('down is input')
	}

	executeSpace()
	{
		console.log('space is input')
	}

	executeShift()
	{
		console.log('shift is input')
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
