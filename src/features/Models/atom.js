import { PLAYER_COLOR, COLORS, STATE } from '../../constants';

export default class Atom {
    constructor(x, y, state, color) {
        this.x = x;
        this.y = y;
        this.state = state;
        this.color = color;
    }

    updateState(turn) {
        if(this.state < Object.keys(COLORS).length) {
            if(this.state === 0 || this.color === PLAYER_COLOR[turn]) {
                this.state = this.state + 1;
            }
        } else {
            this.state = 0;
        }
    }

    setColor(turn) {
        if(this.color === COLORS.none) {
            this.color = PLAYER_COLOR[turn];
        }
    }
}