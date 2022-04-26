
// You can write more code here

/* START OF COMPILED CODE */
import Phaser, { Time } from "phaser";
import Blasts from "./Blasts";
import { GameState } from "../manager/gameState";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class BlastsTrap extends Phaser.GameObjects.Sprite {

    public player?: Phaser.GameObjects.Sprite;
    public timer: Phaser.Time.TimerEvent;
    public walls : Phaser.GameObjects.Sprite;

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "raw-break-interact" , frame ?? 96);

		/* START-USER-CTR-CODE */
        this.scene.physics.add.existing(this)
        this.StartTimer()
		/* END-USER-CTR-CODE */
	}
    
    StartTimer(){
            this.timer = this.scene.time.addEvent({
                delay: 3000,                // ms
                callback: () =>{
                    this.CreateBlasts()
                },
                loop: -1
            });

    }

  CreateBlasts(){
      if(!this.player ){return}
      var distanceX = Math.abs(this.player.x) - Math.abs(this.x)
      var distanceY = Math.abs(this.player.y) - Math.abs(this.y)

      if(!this){
          return
        }
    this.play("trap-explode");
      if(distanceX <= 150 && distanceY <= 150){
          const blast = new Blasts(this.scene , this.x +10 , this.y)
          this.scene.add.existing(blast)
          const body = blast.body as Phaser.Physics.Arcade.Body;
          body.setVelocity(70,0);
          //
          const blast1 = new Blasts(this.scene , this.x , this.y +10)
          this.scene.add.existing(blast1)
          blast1.angle = 90;
          const body1 = blast1.body as Phaser.Physics.Arcade.Body;
          body1.setVelocity(0,70);
  
          //

          const blast2 = new Blasts(this.scene , this.x -10 , this.y)
          this.scene.add.existing(blast2)
          blast2.angle = 180;
          const body2 = blast2.body as Phaser.Physics.Arcade.Body;
          body2.setVelocity(-70 , 0);
          
          //
          const blast3 = new Blasts(this.scene , this.x -10 , this.y)
          this.scene.add.existing(blast3)
          blast3.angle = -90;
          const body3 = blast3.body as Phaser.Physics.Arcade.Body;
          body3.setVelocity(0,-70);
          

         

        const blasts = [blast, blast1 , blast2 , blast3]
        this.scene.physics.add.collider(blasts , this.walls , this.onDestroy)
        this.scene.physics.add.collider(this.player , blasts , this.playerDamage)
        
      }
      else{
          this.play("trap-idle")
      }
    
  }

  onDestroy(a){
    const blast = a as Blasts;
    blast.destroy()
  }

  playerDamage(obj1?: Phaser.GameObjects.Sprite , obj2?: Phaser.GameObjects.Sprite){
    obj2.destroy()
    GameState.changeHealthBy(-10)
  }


}