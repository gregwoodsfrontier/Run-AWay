import Phaser from "phaser"
import Bootstrap from "./scenes/Bootstrap";
import Level from "./scenes/Level";
import Preload from "./scenes/Preload";
import UI from "./scenes/UI";
import Chunk from "./scenes/Chunk";
import rnd from "./drand/random";

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

// use drand generation to create a seed with 3 digits

var seed = await rnd(); // create round number with Drand

console.log(`Raw Drand Randomness returned: ${seed}`); // print randomness before being changed into 3 digit seed

seed = seed.replace(/\D/g,''); // remove all non-numeric characters
seed = seed.slice(0, 3); // pick out first 3 characters
seed = parseInt(seed); // convert back to number
export {seed} // export the seed for access from other files

console.log(`New seed: ${seed}`); // return processed seed

// finished, seed has been created!

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
    scene: [Boot, Preload, Bootstrap, Level, UI , Chunk]
});

game.scene.start("Boot");


