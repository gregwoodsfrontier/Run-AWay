
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
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

		// music_Button
		this.add.image(76, 292, "Music-Button");

		// sFX_Button
		this.add.image(69, 323, "SFX-Button");

		// rules_Button
		this.add.image(78, 213, "Rules-Button");

		// mainMenu_Button
		this.add.image(90, 181, "MainMenu-Button");

		// newGame_Button
		this.add.image(88, 151, "NewGame-Button");

		// resume_Button
		this.add.image(83, 121, "Resume-Button");

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

		// mainMenu_Button_Selected
		this.add.image(90, 181, "MainMenu-Button-Selected");

		// music_Button_Selected
		this.add.image(76, 292, "Music-Button-Selected");

		// sFX_Button_Selected
		this.add.image(69, 323, "SFX-Button-Selected");

		// slider_Up_Button
		this.add.image(260, 292, "Slider-Up-Button");

		// slider_Up_Button_1
		this.add.image(260, 323, "Slider-Up-Button");

		// slider_Down_Button
		this.add.image(116, 292, "Slider-Down-Button");

		// slider_Down_Button_1
		this.add.image(116, 323, "Slider-Down-Button");

		// resume_Button_Selected
		this.add.image(83, 121, "Resume-Button-Selected");

		// rules_Button_Selected
		this.add.image(78, 213, "Rules-Button-Selected");

		// newGame_Button_Selected
		this.add.image(88, 151, "NewGame-Button-Selected");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
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
