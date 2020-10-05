import { COLORS, PLAYER_COLOR, SMALL_GRID } from '../../constants';
let playerColors = PLAYER_COLOR;
import  { updateTurnColor, createGameState, createGrid } from '../chain-grid/chain-grid';
export default class GameState {
    constructor(turn, noPlayer, gridArray) {
        this.turn = turn;
        this.noPlayers = noPlayer;
        this.color = playerColors[turn];
        this.gridArray = gridArray;
        this.userInputs = 0;
    }
    getPlayerWinLoseStatus(element) {
        let updatedUserColor = [];
        if (this.userInputs >= this.noPlayers) {
            this.gridArray.forEach(row => {
                row.forEach(column => {
                    if (column.color !== COLORS.none)
                        updatedUserColor.push(column.color);
                });
            });
        }
        let newPlayers = {};
        let lostplayers = [];
        for (let key in playerColors) {
            if (updatedUserColor.includes(playerColors[key])) {
                newPlayers[key] = playerColors[key];
            } else {
                alert(`Player ${playerColors[key]} Lost`);
                lostplayers.push(playerColors[key]);
            }
        }
        this.noPlayers = Object.keys(newPlayers).length;
        if(this.noPlayers === 1) {
            // TO DO: Below Logic is for resetting the state need to move
            alert('You Won');
            this.turn = 1;
            playerColors = PLAYER_COLOR;
            this.color = COLORS.none;
            this.noPlayers = 3;
            this.gridArray = createGameState(SMALL_GRID.name);
            createGrid(element, this);
        } else {
            playerColors = newPlayers;
            this.updateTurn(false);
            updateTurnColor(this.color, element);
        }
    }
    incrementUserInput() {
        this.userInputs += 1;
    }
    updateTurn(bombard) {
        if (!bombard) {
            if (this.turn === this.noPlayers) {
                this.turn = 1;
            } else {
                this.turn = this.turn + 1;
            }
            this.color = playerColors[this.turn];
        }
    }
}