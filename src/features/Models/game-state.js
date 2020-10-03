import { PLAYER_COLOR } from '../../constants';

export default class GameState {
    constructor(turn, noPlayer, gridArray) {
        this.turn = turn;
        this.noPlayers = noPlayer;
        this.color = PLAYER_COLOR[turn];
        this.gridArray = gridArray;
    }
    updateTurn() {
        if(this.turn === this.noPlayers) {
            this.turn = 1;
        } else {
            this.turn = this.turn + 1;
        }
        this.color = PLAYER_COLOR[this.turn];
    }
}