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