
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Button from "../components/Button";
import ButtonScaleComp from "../components/ButtonScaleComp";
/* START-USER-IMPORTS */
import eventsCenter from "../EventsCenter";
import { AUDIO_PLAY_EVENTS, SCENE_SWITCH_EVENTS } from "../types/scenes";

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
		this.add.image(188, 292, "Slider-Button");

		// slider_Up_Button_Selected_1
		this.add.image(260, 323, "Slider-Up-Button-Selected");

		// slider_Down_Button_Selected_1
		this.add.image(116, 323, "Slider-Down-Button-Selected");

		// sliderBar_1
		this.add.image(188, 323, "SliderBar");

		// slider_Button_1
		this.add.image(188, 323, "Slider-Button");

		// slider_Up_Button_Music
		const slider_Up_Button_Music = this.add.image(260, 292, "Slider-Up-Button");

		// slider_Up_Button_SFX
		const slider_Up_Button_SFX = this.add.image(260, 323, "Slider-Up-Button");

		// slider_Down_Button_Music
		const slider_Down_Button_Music = this.add.image(116, 292, "Slider-Down-Button");

		// slider_Down_Button_SFX
		const slider_Down_Button_SFX = this.add.image(116, 323, "Slider-Down-Button");

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

		// explainer
		const explainer = this.add.image(525, 304, "UI-Explainer-window");

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

		// explainer (components)
		new Button(explainer);

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
		this.explainer = explainer;

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
	private explainer!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.time.delayedCall(500, () => {
			this.sound.pauseAll()
		}, undefined, this)
		
		// this.setMainBehavior()
		this.setCustomBehavior({
			button: this.mainMenuButton,
			upTexture: "MainMenu-Button-Selected",
			downTexture: "MainMenu-Button",
			sceneSwitch: this.goBackToTitle
		})

		this.setCustomBehavior({
			button: this.resumeButton,
			upTexture: "Resume-Button-Selected",
			downTexture: "Resume-Button",
			sceneSwitch: this.resumeGame
		})

		this.setCustomBehavior({
			button: this.newGameButton,
			upTexture: "NewGame-Button-Selected",
			downTexture: "NewGame-Button",
			sceneSwitch: this.restartCurrentGame
		})

		this.setCustomBehavior({
			button: this.resumeButton,
			upTexture: "Resume-Button-Selected",
			downTexture: "Resume-Button",
			sceneSwitch: this.resumeGame
		})

		this.setCustomBehavior({
			button: this.rulesButton,
			upTexture: "Rules-Button-Selected",
			downTexture: "Rules-Button",
			sceneSwitch: () => {
				console.log('null')
			}
		})

		this.setRulesButtonAgain()
		this.setExplainerBehavior()

	}

	private setRulesButtonAgain()
	{
		const buttonComp = Button.getComponent(this.rulesButton)
		buttonComp.handlePointerUp = () => {
			this.rulesButton.setTexture("Rules-Button-Selected")
			this.showExplainer()
		}
	}

	private setExplainerBehavior()
	{
		// const scaleComp = ButtonScaleComp.getComponent(this.explainer)
		const buttonComp = Button.getComponent(this.explainer)
		buttonComp.handlePointerUp = () => {
			this.hideExplainer()
		}
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
			eventsCenter.emit(AUDIO_PLAY_EVENTS.MENUSELECT)
			button.setTexture(downTexture)
		}
		buttonComp.handlePointerUp = () => {
			button.setTexture(upTexture)
			sceneSwitch()
		}
	}

	private showExplainer()
	{
		this.tweens.add({
			targets: this.explainer,
			x: this.scale.width/2,
			duration: 500
		})

	}

	private hideExplainer()
	{
		this.tweens.add({
			targets: this.explainer,
			x: 525,
			duration: 500
		})
	}

	private restartCurrentGame()
	{
		eventsCenter.emit(SCENE_SWITCH_EVENTS.PAUSE_TO_RESTART)
	}

	private goBackToTitle()
	{
		// emit events to Bootstrap
		// stop whatever is running prior to pause, like UI, Level, Chunk, Boss
		eventsCenter.emit(SCENE_SWITCH_EVENTS.PAUSE_TO_TITLE)
	}

	private resumeGame()
	{
		eventsCenter.emit(SCENE_SWITCH_EVENTS.RESUME_GAME)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
