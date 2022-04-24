import { makeAutoObservable } from "mobx"

class GameStateManager {
    hp = 100
    sanity = 100
    energy = 100
    inventory: number[] = []
    isPSDDeployed = false
    isGunDeployed = false

    constructor()
    {
        makeAutoObservable(this)
    }

    changeEnergyBy(n: number)
    {
        Phaser.Math.Clamp(this.energy += n, 0, 100)
    }

    changeHealthBy(n: number)
    {
        Phaser.Math.Clamp(this.hp += n, 0, 100)
    }

    changeSanityBy(n: number)
    {
        Phaser.Math.Clamp(this.sanity += n, 0, 100)
    }

    setHealth(n: number)
    {
        this.hp = n
    }

    setEnergy(n: number)
    {
        this.energy = n
    }

    setSanity(n: number)
    {
        this.sanity = n
    }
    
    setInventory(arr: number[])
    {
        this.inventory = arr
    }

    setPSDDeploy(b: boolean)
    {
        this.isPSDDeployed = b
    }

    setGunDeploy(b: boolean)
    {
        this.isGunDeployed = b
    }
}

export const GameState = new GameStateManager