import Phaser from "phaser";
import { Time } from "phaser";


export default class MudTrap extends Phaser.GameObjects.Sprite {
    
    private timer: Phaser.Time.TimerEvent;
    public player: Phaser.GameObjects.Sprite;

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "raw-break-interact", frame ?? Phaser.Math.Between(88,91));

        this.scene.physics.add.existing(this,true)
        //sets the collision call Back
        //this.scene.physics.add.collider(this.player , this , this.MudHit)
    }

    MudHit(){
        
        //this.setVisible = false;
        //this.player?.setTint();
        //change player velocity

        //StartTimer()
        //after 5 seconds after collision it destroys and player is back to normal
        /*this.timer = this.scene.time.addEvent({
            delay: 5000,                // ms
            callback: () =>{
                this.player.setTint();  //normal
                // player velocity = normal
                this.destroy();
            },
            loop: -1
        });
        */

    }

}