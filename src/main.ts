import Phaser from "phaser"
import Bootstrap from "./scenes/Bootstrap";
import Level from "./scenes/Level";
import Preload from "./scenes/Preload";
import UI from "./scenes/UI";
import Title from "./scenes/Title";
import PauseMenu from "./scenes/PauseMenu";

class Boot extends Phaser.Scene {

    constructor() {
        super("Boot");
    }

    preload() {

        this.load.pack("pack", "assets/preload-asset-pack.json");
    }

    create() {

       this.scene.start("Preload");
    }
}

const game = new Phaser.Game({
    width: 320,
    height: 640,
    backgroundColor: "#2f2f2f",
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [Boot, Preload, Bootstrap, Title, PauseMenu, Level, UI]
});

game.scene.start("Boot");


