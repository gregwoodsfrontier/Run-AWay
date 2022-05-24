import Phaser from "phaser"
import Bootstrap from "./scenes/Bootstrap";
import Level from "./scenes/Level";
import Preload from "./scenes/Preload";
import UI from "./scenes/UI";
import Title from "./scenes/Title";
import PauseMenu from "./scenes/PauseMenu";
import Explainer from "./scenes/Explainer";
import Boss from "./scenes/Boss";
import Chunk from "./scenes/Chunk";
import rnd from "./drand/random";
import YouSurvived from "./scenes/YouSurvived"
import GameOver from "./scenes/GameOver"
import MidLevel from "./scenes/MidLevel";

class Boot extends Phaser.Scene {
    seed = 0

    constructor() {
        super("Boot");
    }

    preload() {

        this.load.pack("pack", "assets/packs/preload-asset-pack.json");
    }

    create() {
        this.genSeed(this.seed)
        
       this.scene.start("Preload");
    }

    async genSeed(numx: any)
    {
        numx = await rnd(); // create round number with Drand
        console.log(`Raw Drand Randomness returned: ${numx}`); // print randomness before being changed into 3 digit numx
        numx = numx.replace(/\D/g,''); // remove all non-numeric characters
        numx = numx.slice(0, 3); // pick out first 3 characters
        numx = parseInt(numx); // convert back to number
        console.log(numx)
        console.log(`boot scene seed: ${numx}`)
        this.game.registry.set('seed', numx)
    }
}

// use drand generation to create a seed with 3 digits

/* let seed = 0

async function genSeed()
{
    let seed = await rnd(); // create round number with Drand
    console.log(`Raw Drand Randomness returned: ${seed}`); // print randomness before being changed into 3 digit seed
    seed = seed.replace(/\D/g,''); // remove all non-numeric characters
    seed = seed.slice(0, 3); // pick out first 3 characters
    seed = parseInt(seed); // convert back to number
    console.log(seed)

    return seed
}

(async () => {
    seed = await genSeed()
    console.log('seed in async', seed)
    // export {seed}
})() */

// await genSeed(seed)

// var seed = await rnd(); // create round number with Drand

// console.log(`Raw Drand Randomness returned: ${seed}`); // print randomness before being changed into 3 digit seed

// seed = seed.replace(/\D/g,''); // remove all non-numeric characters
// seed = seed.slice(0, 3); // pick out first 3 characters
// seed = parseInt(seed); // convert back to number
// export {seed} // export the seed for access from other files
// console.log('new seed')
// console.log(seed)

// console.log(`New seed: ${seed}`); // return processed seed

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
            debug: process.env.NODE_ENV === "development"
        }
    },
    scene: [
        Boot, Preload, Bootstrap, 
        Title, PauseMenu, Level, MidLevel, Chunk,
        UI, Explainer, Boss, YouSurvived, GameOver
    ]
});

game.scene.start("Boot");


