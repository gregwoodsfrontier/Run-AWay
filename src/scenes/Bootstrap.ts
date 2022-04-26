
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";

/* START-USER-IMPORTS */
import eventsCenter from "../EventsCenter";
import { AUDIO_PLAY_EVENTS, SCENE_SWITCH_EVENTS } from "../types/scenes";
enum GAME_AUDIO {
	GAMEPLAY,
	DEPLOYPSD,
	FIELD_FADEOUT,
	FIELD_LOOP,
	FIELD_START,
	COLLECT,
	MENU_SELECT,
	PLAYER_FOOTSTEPS,
	ENEMY_FOOTSTEPS,
	TARGET_HIT
}
const AUDIOKEYS = [
	'Gameplay_Track_1',
	'DeployPSD',
	'Energy_Field_Fade_Out',
	'Energy_Field_Loop',
	'Energy_Field_Start',
	'CollectMineral',
	'MenuSelect',
	'Footsteps',
	'EnemyFootsteps',
	'TargetHit'
]
const AUDIO_EVENT_KEYS = [
	AUDIO_PLAY_EVENTS.GAMEPLAY,
	AUDIO_PLAY_EVENTS.DEPLOY,
	AUDIO_PLAY_EVENTS.FIELD_FADE,
	AUDIO_PLAY_EVENTS.FIELD_LOOP,
	AUDIO_PLAY_EVENTS.FIELD_START,
	AUDIO_PLAY_EVENTS.COLLECT,
	AUDIO_PLAY_EVENTS.MENUSELECT,
	AUDIO_PLAY_EVENTS.PLAYER_FOOT,
	AUDIO_PLAY_EVENTS.ENEMY_FOOT,
	AUDIO_PLAY_EVENTS.TARGET_HIT
]
/* END-USER-IMPORTS */


export default class Bootstrap extends Phaser.Scene {

	constructor() {
		super("Bootstrap");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// image_1
		const image_1 = this.add.image(320, 180, "FufuSuperDino");
		image_1.alpha = 0;
		image_1.alphaTopLeft = 0;
		image_1.alphaTopRight = 0;
		image_1.alphaBottomLeft = 0;
		image_1.alphaBottomRight = 0;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */
	private activeGame = ""
	private allAudio = [] as Phaser.Sound.BaseSound[]
	// Write your code here

	create() {

		this.editorCreate();

		eventsCenter.on(SCENE_SWITCH_EVENTS.UPDATE_ACTIVE, this.updateActiveScene, this)

		eventsCenter.on(SCENE_SWITCH_EVENTS.TO_PAUSE, this.switchToPauseMenu, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.TO_GAME, this.createNewGame, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.RESUME_GAME, this.resumeGame, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.TO_GAMEOVER, this.handleGameOver, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.TO_EXPLAINER, this.goToExplainer, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.RESUME_FROM_EXPLAIN, this.resumeFromExplainer, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.GO_GAMEOVER, this.goToGameOver, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.GO_YOUSURVIVED, this.goToYouSurvived, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.TO_CHUNKS, this.toChunks, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.TO_TITLE, this.goToTitle, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.BACK_TO_GAME, this.backToGame, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.TO_BOSS , this.gotoBoss , this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.PAUSE_TO_TITLE, this.pauseToTitle, this)
		eventsCenter.on(SCENE_SWITCH_EVENTS.PAUSE_TO_RESTART, this.pauseToRestart, this)

		/* if(process.env.NODE_ENV === "development")
		{
			this.createNewGame()
			return
		} */

		this.loadSoundAssets()
		this.defineAudioEvents()

		this.startTitleScene()
	}

	private defineAudioEvents()
	{
		for(let i = 0; i < AUDIO_EVENT_KEYS.length; i++)
		{
			eventsCenter.on(AUDIO_EVENT_KEYS[i], () => {
				this.allAudio[i].play()
			}, this)
		}
		
		eventsCenter.on(AUDIO_PLAY_EVENTS.GAMEPLAY_STOP, () => {
			if(this.allAudio[GAME_AUDIO.GAMEPLAY].isPlaying)
			{
				this.allAudio[GAME_AUDIO.GAMEPLAY].stop()
			}
		}, this)

		/* eventsCenter.on(AUDIO_PLAY_EVENTS.GAMEPLAY, () => {
			this.allAudio[GAME_AUDIO.GAMEPLAY].play()
		}, this)

		eventsCenter.on(AUDIO_PLAY_EVENTS.MENUSELECT, () => {
			this.allAudio[GAME_AUDIO.MENU_SELECT].play()
		})
		eventsCenter.on(AUDIO_PLAY_EVENTS.FIELD_START, () => {
			this.allAudio[GAME_AUDIO.FIELD_START].play()
		}, this)
		eventsCenter.on(AUDIO_PLAY_EVENTS.FIELD_LOOP, () => {
			this.allAudio[GAME_AUDIO.FIELD_LOOP].play()
		}, this)
		eventsCenter.on(AUDIO_PLAY_EVENTS.FIELD_FADE, () => {
			this.allAudio[GAME_AUDIO.FIELD_FADEOUT].play()
		}, this) */
	}

	private loadSoundAssets()
	{
		AUDIOKEYS.forEach((key, idx) => {
			if(idx === GAME_AUDIO.FIELD_LOOP)
			{
				this.allAudio[idx] = this.sound.add(key, {
					loop: true,
					volume: 1
				})
			}
			else
			{
				this.allAudio[idx] = this.sound.add(key)
			}
		})
	}

	private updateActiveScene(key: string)
	{
		this.activeGame = key
		// console.log(`active scene: ${this.activeGame}`)
	}

	private pauseToRestart()
	{
		this.scene.stop("Pause")
		this.scene.launch(this.activeGame)
		this.scene.launch("UI")

	}

	private pauseToTitle()
	{
		const sceneToStop = ["UI", "Level", "Chunk", "Boss"]
		sceneToStop.forEach(key => {
			if(this.scene.isActive(key))
			{
				this.scene.stop(key)
			}
		})
		
		this.scene.stop("Pause")
		this.scene.launch("Title").bringToTop("Title")
	}
	
	private goToTitle(key: string)
	{
		this.scene.stop(key)
		this.scene.launch("Title")
	}

	private backToGame(key: string)
	{
		this.scene.stop(key)
		this.createNewGame()
	}

	private toChunks(key: string)
	{
		this.scene.stop(key)
		this.scene.launch("Chunk")
		this.scene.launch("UI").bringToTop("UI")
	}

	private goToExplainer()
	{
		this.scene.pause("Level")
		this.scene.pause("UI")
		this.scene.launch("Explainer").bringToTop("Explainer")
	}

	private goToGameOver(currentScene: string)
	{
		this.scene.stop("UI")
		this.scene.stop(currentScene)
		this.scene.launch("GameOver")
	}

	private goToYouSurvived(currentScene: string)
	{
		this.scene.stop("UI")
		this.scene.stop(currentScene)
		this.scene.launch("YouSurvived")
	}

	private resumeFromExplainer()
	{
		this.scene.stop("Explainer")
		this.scene.resume("Level")
		this.scene.resume("UI")
	}

	private switchToPauseMenu()
	{
		this.scene.pause("Level")
		this.scene.pause("UI")
		this.scene.launch("Pause").bringToTop("Pause")
	}

	private resumeGame()
	{
		this.scene.stop("Pause")

		if(this.scene.isPaused(this.activeGame))
		{
			this.sound.resumeAll()
			this.scene.resume(this.activeGame)
		}
		
		if(this.scene.isPaused("UI"))
		{
			this.scene.resume("UI")
		}
		
	}

	private startTitleScene()
	{
		this.scene.launch("Title")
	}

	private createNewGame()
	{
		this.scene.stop("Title")
		this.scene.launch("Level")
		// this.scene.launch("Chunk")
		this.scene.launch("UI")
	}

	private handleGameOver()
	{
		this.scene.stop('Level')
		this.scene.stop('UI')
		this.scene.launch('GameOver')
	}

	private gotoBoss(){
		this.scene.stop('Chunk')
		this.scene.launch('Boss')
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
