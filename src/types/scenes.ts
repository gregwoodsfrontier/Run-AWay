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
    PAUSE_TO_TITLE = 'pause-to-title',
    PAUSE_TO_RESTART = 'pause-to-restart',
    PAUSE_TO_EXPLAINER = 'pause-to-explain'
}