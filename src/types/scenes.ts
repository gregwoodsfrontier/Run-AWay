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
    TO_PAUSE = 'to-pause',
    TO_GAME = 'to-game',
    RESUME_GAME = 'resume-game',
    TO_GAMEOVER = 'to-gameover',
    TO_EXPLAINER = 'to-explainer',
    RESUME_FROM_EXPLAIN = 'resume-from-explain',
    GO_GAMEOVER = 'go-gameover',
    GO_YOUSURVIVED = 'go-yousurvived'
}