
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Button from "../components/Button";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Explainer extends Phaser.Scene {

	constructor() {
		super("Explainer");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// uI_Explainer
		const uI_Explainer = this.add.image(160, 320, "UI-Explainer-window");

		// uI_Explainer (components)
		new Button(uI_Explainer);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
