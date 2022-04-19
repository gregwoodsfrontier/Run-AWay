export enum DIRECTION {
	BACK,
	LEFT,
	FRONT,
	RIGHT
}

export function getDirectionName(dir: number)
{
    switch (dir) {
        case DIRECTION.BACK: {
            return 'back'
            break
        }

        case DIRECTION.FRONT: {
            return 'front'
            break
        }

        case DIRECTION.LEFT: {
            return 'left'
            break
        }

        case DIRECTION.RIGHT: {
            return 'right'
            break
        }

        default: {
            console.warn('no such direction')
            return
        }
    }
}