import { makeAutoObservable } from "mobx"

class GameStateManager {
    hp = 100
    sanity = 100
    energy = 100
    inventory = []
    isPSDDeployed = false
    isGunDeployed = false

    constructor()
    {
        makeAutoObservable(this)
    }
}

export const GameState = new GameStateManager