export interface ILevelData
{
	onGameOver: (data: IGameOverSceneData) => void
    onPauseMenu: (data: IPauseData) => void
}

export interface IPauseData
{
    onResumeGame: () => void
}

export interface IGameOverSceneData
{
	onRestart?: () => void
}

export interface ITitleData
{
    onNewGame: () => void
}

export enum SCENE_SWITCH_EVENTS {
    UPDATE_ACTIVE = 'update-active',
    TO_PAUSE = 'to-pause',
    TO_GAME = 'to-game',
    RESUME_GAME = 'resume-game',
    TO_GAMEOVER = 'to-gameover',
    TO_EXPLAINER = 'to-explainer',
    RESUME_FROM_EXPLAIN = 'resume-from-explain',
    GO_GAMEOVER = 'go-gameover',
    GO_YOUSURVIVED = 'go-yousurvived',
    TO_CHUNKS = 'to-chunks',
    TO_TITLE = 'to-title',
    BACK_TO_GAME = 'back-to-game',
    TO_BOSS = 'to-boss',
    PAUSE_TO_TITLE = 'pause-to-title',
    PAUSE_TO_RESTART = 'pause-to-restart',
    PAUSE_TO_EXPLAINER = 'pause-to-explain'
}

export enum AUDIO_PLAY_EVENTS {
    GAMEPLAY = 'audio-gameplay',
    GAMEPLAY_STOP = 'audio-gameplay-stop',
    DEPLOY = 'audio-deploy',
    FIELD_FADE = 'audio-field-fade',
    FIELD_LOOP = 'audio-field-loop',
    FIELD_LOOP_STOP = 'audio-field-loop-stop',
    FIELD_START = 'audio-field-start',
    COLLECT = 'audio-collect',
    MENUSELECT = 'audio-menu-select',
    PLAYER_FOOT = 'audio-player-footsteps',
    ENEMY_FOOT = 'audio-enemy-footsteps',
    TARGET_HIT = 'audio-target-hit',
    PLAYER_FOOT_STOP = 'audio-player-footsteps-stop',
    ENEMY_FOOT_STOP = 'audio-enemy-footsteps-stop',
    BOSSTRAP = 'audio-boss-trap',
    ENEMY_SHOOT = 'audio-enemy-shoot',
	GAS_TRAP = 'audio-gas-trap',
	LASERGUN = 'audio-laser-gun',
	LASERGUN_EQUIP = 'audio-laser-gun-equip',
	PROXY_TRAP = 'audio-proxy-trap',
    BOSS_FIGHT = 'audio-boss-trap',
    BOSS_FIGHT_STOP = 'audio-boss-trap-stop'
}