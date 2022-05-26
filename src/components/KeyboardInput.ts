
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class KeyboardInput extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Container) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__KeyboardInput"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.XKey = this.gameObject.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
		this.CKey = this.gameObject.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
		this.WKey = this.gameObject.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		this.AKey = this.gameObject.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.SKey = this.gameObject.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.DKey = this.gameObject.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Container): KeyboardInput {
		return (gameObject as any)["__KeyboardInput"];
	}

	private gameObject: Phaser.GameObjects.Container;

	/* START-USER-CODE */
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private XKey: Phaser.Input.Keyboard.Key
	private CKey: Phaser.Input.Keyboard.Key
	private WKey: Phaser.Input.Keyboard.Key
	private AKey: Phaser.Input.Keyboard.Key
	private SKey: Phaser.Input.Keyboard.Key
	private DKey: Phaser.Input.Keyboard.Key
	private active = false

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

	setActive(state: boolean)
	{
		this.active = state
	}

	update()
	{
		if(!this.active)
		{
			return
		}

		if(Phaser.Input.Keyboard.JustDown(this.WKey))
		{
			this.executeWKeyJustDown()
		}

		if(Phaser.Input.Keyboard.JustDown(this.AKey))
		{
			this.executeAKeyJustDown()
		}

		if(Phaser.Input.Keyboard.JustDown(this.SKey))
		{
			this.executeSKeyJustDown()
		}

		if(Phaser.Input.Keyboard.JustDown(this.DKey))
		{
			this.executeDKeyJustDown()
		}

		if(Phaser.Input.Keyboard.JustDown(this.CKey))
		{
			this.executeCKeyJustDown()
		}

		if(Phaser.Input.Keyboard.JustUp(this.CKey))
		{
			this.executeCKeyJustUp()
		}

		if(this.XKey.isDown)
		{
			this.executeXKeyDown()
		}

		if(Phaser.Input.Keyboard.JustUp(this.XKey))
		{
			this.executeXKeyJustUp()
		}

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
				this.executeShiftArrowKeyUp()
			}
			return
		}

		if(Phaser.Input.Keyboard.JustUp(this.cursors.shift))
		{
			this.executeShiftJustUp()
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

	executeWKeyJustDown(){}
	executeAKeyJustDown(){}
	executeSKeyJustDown(){}
	executeDKeyJustDown(){}

	executeCKeyJustDown(){}
	executeCKeyJustUp(){}
	executeXKeyDown(){}
	executeXKeyJustUp(){}
	executeShiftJustUp(){}
	executeShiftUp(){}
	executeShiftDown(){}
	executeShiftLeft(){}
	executeShiftRight(){}
	executeShiftArrowKeyUp(){}

	executeKeyUp(){}

	executeLeft()
	{}

	executeRight()
	{}

	executeUp()
	{}

	executeDown()
	{}

	executeSpace()
	{}

	executeShift()
	{}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
