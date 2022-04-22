import Phaser from "phaser";
import Phaser, { Time } from "phaser";

//variables
let TimeCount = 0;
let TimeDestroy = 0;
let Gases = [];
///
export default class GasTrap extends Phaser.GameObjects.Sprite {

    private timer: Phaser.Time.TimerEvent;
    private Gas: Phaser.GameObjects.Sprite;
    public player: Phaser.GameObjects.Sprite;

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "raw-break-interact", frame ?? 104);

        this.StartTimer()
    }
    StartTimer(){
        this.timer = this.scene.time.addEvent({
            delay: 200,                // ms
            callback: () =>{
                this.CreateGas()
            },
            loop: -1
        });
    }
    
    
    CreateGas(){

        let distanceX = Math.abs(this.player.x - this.x)
        let distanceY = Math.abs(this.player.y - this.y)

        if( distanceX < 100 && distanceY < 100){
            if(TimeCount == 0) {

                this.play("trap-poison")

                this.on(Phaser.Animations.Events.ANIMATION_UPDATE , (frame: Phaser.Animations.AnimationFrame)=>{
                    
                    if(TimeCount > 0){
                    return
                    }   
                    TimeCount++;
                })
            }
        }
        else{
        this.play("trap-poison-idle")
        
        }

        if(TimeCount == 7 ){
            for(let x =0; x< Gases.length;x++){
                Gases[x].destroy();
            }
            TimeCount = 0;
        }
        
        if(TimeCount !=0 ){
        
        this.Gas =this.scene.add.sprite(this.x + Phaser.Math.Between(-40,40) ,
                
        this.y + Phaser.Math.Between(-40,40) ,"raw-break-interact" , 108);

        this.Gas.angle = Phaser.Math.Between(0,360);

        this.Gas.scale = Phaser.Math.Between(1,1.2);

        this.Gas.play("trap-poison-mistraw-break-interact");

        this.scene.physics.add.existing(this.Gas);
        
        Gases.push(this.Gas)

        TimeCount++
        }
        
    }
   

}