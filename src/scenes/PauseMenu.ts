
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Button from "../components/Button";
import ButtonScaleComp from "../components/ButtonScaleComp";
/* START-USER-IMPORTS */
import eventsCenter from "../EventsCenter";
import { SCENE_SWITCH_EVENTS } from "../types/scenes";

interface IButtonBehaviorArgs {
	button: Phaser.GameObjects.Image,
	upTexture: string,
	downTexture: string,
	sceneSwitch: () => void
}

/* END-USER-IMPORTS */

export default class PauseMenu extends Phaser.Scene {

	constructor() {
		super("Pause");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// 70per_Black_BG
		this.add.image(160, 320, "70per-Black-BG");

		// pause_Menu_Ref
		const pause_Menu_Ref = this.add.image(160, 320, "Pause_Menu_Ref");
		pause_Menu_Ref.visible = false;

		// pause_Menu_BG
		this.add.image(160, 209, "Pause-Menu-BG");

		// sliderBar
		this.add.image(188, 292, "SliderBar");

		// slider_Down_Button_Selected
		this.add.image(116, 292, "Slider-Down-Button-Selected");

		// slider_Up_Button_Selected
		this.add.image(260, 292, "Slider-Up-Button-Selected");

		// slider_Button
		this.add.image(130, 292, "Slider-Button");

		// slider_Up_Button_Selected_1
		this.add.image(260, 323, "Slider-Up-Button-Selected");

		// slider_Down_Button_Selected_1
		this.add.image(116, 323, "Slider-Down-Button-Selected");

		// sliderBar_1
		this.add.image(188, 323, "SliderBar");

		// slider_Button_1
		this.add.image(130, 323, "Slider-Button");

		// slider_Up_Button_Music
		const slider_Up_Button_Music = this.add.image(260, 292, "Slider-Up-Button");

		// slider_Up_Button_SFX
		const slider_Up_Button_SFX = this.add.image(260, 323, "Slider-Up-Button");

		// slider_Down_Button_Music
		const slider_Down_Button_Music = this.add.image(116, 292, "Slider-Down-Button");

		// slider_Down_Button_SFX
		const slider_Down_Button_SFX = this.add.image(116, 323, "Slider-Down-Button");

		// rules_Button_pressed
		this.add.image(78, 213, "Rules-Button");

		// newGame_Button_pressed
		this.add.image(88, 151, "NewGame-Button");

		// resume_Button_pressed
		this.add.image(83, 121, "Resume-Button");

		// mainMenuButton
		const mainMenuButton = this.add.image(90, 181, "MainMenu-Button-Selected");

		// musicButton
		const musicButton = this.add.image(76, 292, "Music-Button-Selected");

		// sFXButton
		const sFXButton = this.add.image(69, 323, "SFX-Button-Selected");

		// resumeButton
		const resumeButton = this.add.image(83, 121, "Resume-Button-Selected");

		// rulesButton
		const rulesButton = this.add.image(78, 213, "Rules-Button-Selected");

		// newGameButton
		const newGameButton = this.add.image(88, 151, "NewGame-Button-Selected");

		// slider_Up_Button_Music (components)
		new Button(slider_Up_Button_Music);
		new ButtonScaleComp(slider_Up_Button_Music);

		// slider_Up_Button_SFX (components)
		new Button(slider_Up_Button_SFX);
		new ButtonScaleComp(slider_Up_Button_SFX);

		// slider_Down_Button_Music (components)
		new Button(slider_Down_Button_Music);
		new ButtonScaleComp(slider_Down_Button_Music);

		// slider_Down_Button_SFX (components)
		new Button(slider_Down_Button_SFX);
		new ButtonScaleComp(slider_Down_Button_SFX);

		// mainMenuButton (components)
		new Button(mainMenuButton);
		new ButtonScaleComp(mainMenuButton);

		// resumeButton (components)
		new Button(resumeButton);
		new ButtonScaleComp(resumeButton);

		// rulesButton (components)
		new Button(rulesButton);
		new ButtonScaleComp(rulesButton);

		// newGameButton (components)
		new Button(newGameButton);
		new ButtonScaleComp(newGameButton);

		this.slider_Up_Button_Music = slider_Up_Button_Music;
		this.slider_Up_Button_SFX = slider_Up_Button_SFX;
		this.slider_Down_Button_Music = slider_Down_Button_Music;
		this.slider_Down_Button_SFX = slider_Down_Button_SFX;
		this.mainMenuButton = mainMenuButton;
		this.musicButton = musicButton;
		this.sFXButton = sFXButton;
		this.resumeButton = resumeButton;
		this.rulesButton = rulesButton;
		this.newGameButton = newGameButton;

		this.events.emit("scene-awake");
	}

	private slider_Up_Button_Music!: Phaser.GameObjects.Image;
	private slider_Up_Button_SFX!: Phaser.GameObjects.Image;
	private slider_Down_Button_Music!: Phaser.GameObjects.Image;
	private slider_Down_Button_SFX!: Phaser.GameObjects.Image;
	private mainMenuButton!: Phaser.GameObjects.Image;
	private musicButton!: Phaser.GameObjects.Image;
	private sFXButton!: Phaser.GameObjects.Image;
	private resumeButton!: Phaser.GameObjects.Image;
	private rulesButton!: Phaser.GameObjects.Image;
	private newGameButton!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		// this.setMainBehavior()
		this.setCustomBehavior({
			button: this.mainMenuButton,
			upTexture: "MainMenu-Button-Selected",
			downTexture: "MainMenu-Button",
			sceneSwitch: this.goBackToTitle
		})
	}

	private setCustomBehavior(data: IButtonBehaviorArgs)
	{
		const { upTexture, downTexture, button, sceneSwitch } = data
		const scaleComp = ButtonScaleComp.getComponent(button)
		const buttonComp = Button.getComponent(button)
		buttonComp.handlePointerOver = () => {
			scaleComp.scaleUp()
		}
		buttonComp.handlePointerOut = () => {
			scaleComp.scaleDown()
			button.setTexture(upTexture)
		}
		buttonComp.handlePointerDown = () => {
			button.setTexture(downTexture)
		}
		buttonComp.handlePointerUp = () => {
			button.setTexture(upTexture)
			sceneSwitch()
		}
	}

	private setMainBehavior()
	{
		const upTexture = "MainMenu-Button-Selected"
		const downTexture = "MainMenu-Button"
		const scaleComp = ButtonScaleComp.getComponent(this.mainMenuButton)
		const buttonComp = Button.getComponent(this.mainMenuButton)
		buttonComp.handlePointerOver = () => {
			scaleComp.scaleUp()
		}
		buttonComp.handlePointerOut = () => {
			scaleComp.scaleDown()
			this.mainMenuButton.setTexture(upTexture)
		}
		buttonComp.handlePointerDown = () => {
			this.mainMenuButton.setTexture(downTexture)
		}
		buttonComp.handlePointerUp = () => {
			this.mainMenuButton.setTexture(upTexture)
			this.goBackToTitle()
		}
	}

	private goBackToTitle()
	{
		// emit events to Bootstrap
		// stop whatever is running prior to pause, like UI, Level, Chunk, Boss
		eventsCenter.emit(SCENE_SWITCH_EVENTS.PAUSE_TO_TITLE)
	}

	private resumeGame()
	{
		this.scene.stop('Pause')
		this.scene.resume('Level')
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
