import { PLAYER_COLOR, COLORS, CELL_TYPE, SMALL_GRID, LARGE_GRID } from '../../constants';

export default class Atom {
    constructor(x, y, state, color, gridSize) {
        this.x = x;
        this.y = y;
        this.state = state;
        this.color = color;
        this.cellType = this.getCellType(x, y, gridSize);
    }

    getCellType(x, y, gridSize) {
        const { rows, columns } = (gridSize === 'large') ? LARGE_GRID : SMALL_GRID;
        if (x === 0 || y === 0 || y === rows - 1 || x === columns - 1) {
            if ((x === 0 && y === 0) ||
                (x === 0 && y === rows - 1) ||
                (x === columns - 1 && y === 0) ||
                (x === columns - 1 && y === rows - 1)) {
                return CELL_TYPE.corner;
            } else {
                return CELL_TYPE.adjacent;
            }
        }
        return CELL_TYPE.normal
    }

    updateState(gameSate, direct) {
        if (this.state < this.cellType) {
            if (this.state === 0 || this.color === gameSate.playerColors[gameSate.turn] || direct) {
                this.state = this.state + 1;
            }
        } else {
            if(!direct && this.color !== gameSate.playerColors[gameSate.turn]) {
                return false;
            }
            // We return below object to know it is time to bombard
            let bombard = {
                ...this
            };
            this.state = 0;
            this.color = COLORS.none;
            return bombard;
        }
        return false;
    }

    setColor(turn) {
        if (this.color === COLORS.none) {
            this.color = PLAYER_COLOR[turn];
        }
    }

    setColorDirect(color) {
        this.color = color;
    }
}