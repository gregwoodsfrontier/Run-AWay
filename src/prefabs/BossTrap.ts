
import Phaser from "phaser";
import { Time } from "phaser";

//variables
let Beams = [];
let Deploy = true;

export default class BossTrap extends Phaser.GameObjects.Sprite {
    
    private timer: Phaser.Time.TimerEvent;
    private BeamBody: Phaser.GameObjects.Sprite;
    private BeamTip: Phaser.GameObjects.Sprite;
    public player: Phaser.GameObjects.Sprite;

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "BossTrap-1", frame ?? 0);
        
        //Static Body
        this.scene.physics.add.existing(this,true)
        this.StartTimer()
    }

    StartTimer(){
        //Set Timer to 20 seconds to strt deploying
        this.timer = this.scene.time.addEvent({
            delay: 20000,                // ms
            callback: () =>{
                this.Deploy()
            },
            loop: -1
        });
    }
    Deploy(){
        //Deploys it and set timer of acitvasion to 5 seconds
        if(Deploy){

        this.play("boss-trap-on")
        this.scene.sound.play("BossTrap")

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE , (texture: Phaser.Textures.Texture)=>{
            if(this.texture.key == "BossTrap-5"){
            this.timer.delay = 5000;
            Deploy = false;
            this.CreateBeam();
            }
        })
    }
    //Destroys it and the reset the timer to 20 seconds
    else{
        for(let i = 0; i < Beams.length; i++){
            Beams[i].destroy();
        }
        Beams = []
        this.play("boss-trap-off")
        Deploy = true;
        this.timer.delay = 20000;
        
    }
    }
    CreateBeam(){
        //upper beam
        this.BeamBody =this.scene.add.sprite(this.x+1 , this.y -38.5 , "BeamBody")
        this.BeamTip =this.scene.add.sprite(this.x-1 , this.y -70 , "BeamTip")
        this.BeamTip.angle = 180
        Beams.push(this.BeamBody , this.BeamTip)

        // right beam
        this.BeamBody =this.scene.add.sprite(this.x +34 , this.y -12 , "BeamBody")
        this.BeamBody.angle = 90
        this.BeamTip =this.scene.add.sprite(this.x +64 , this.y -14 , "BeamTip")
        this.BeamTip.angle = -90
        Beams.push(this.BeamBody , this.BeamTip)

        //lower beam
        this.BeamBody =this.scene.add.sprite(this.x+1 , this.y +6 , "BeamBody")
        this.BeamTip =this.scene.add.sprite(this.x +1 , this.y +36 , "BeamTip")
        Beams.push(this.BeamBody , this.BeamTip)

        //left beam
        this.BeamBody =this.scene.add.sprite(this.x -34 , this.y -14 , "BeamBody")
        this.BeamBody.angle = -90
        this.BeamTip =this.scene.add.sprite(this.x -64 , this.y -12 , "BeamTip")
        this.BeamTip.angle = 90
        Beams.push(this.BeamBody , this.BeamTip)

        //add Beams to existance 
        for(let i = 0; i < Beams.length; i++){
            this.scene.physics.add.existing(Beams[i] , true)
        }
    }

    /*BulletHit(){
        //destroys upon bullet collision
        this.destroy();
    }*/
}