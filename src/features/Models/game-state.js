import { COLORS, PLAYER_COLOR, SMALL_GRID } from '../../constants';
import { updateTurnColor, createGameState, createGrid } from '../chain-grid/chain-grid';
import { alertModal } from '../alert-modal/alert-modal';
export default class GameState {
    constructor(turn, noPlayer, gridArray) {
        this.playerColors = PLAYER_COLOR;
        this.turn = turn;
        this.noPlayers = noPlayer;
        this.color = PLAYER_COLOR[turn];
        this.gridArray = gridArray;
        this.userInputs = 0;
        this.savedNoPlayers = noPlayer;
        this.savedTurn = turn;
        this.updatePlayerBasedOnUserSelection(this.savedNoPlayers);
    }
    updatePlayerBasedOnUserSelection(savedNoPlayers) {
        let count = 0;
        for (let key in this.playerColors) {
            if (count >= savedNoPlayers) {
                delete this.playerColors[key];
            }
            count++;
        }
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
        for (let key in this.playerColors) {
            if (updatedUserColor.includes(this.playerColors[key])) {
                newPlayers[key] = this.playerColors[key];
            } else {
                lostplayers.push(this.playerColors[key]);
            }
        }
        if(Boolean(lostplayers.length)) {
            alert(`Player ${lostplayers.join(' ')} Lost`);
        }
        this.noPlayers = Object.keys(newPlayers).length;
        if (this.noPlayers === 1) {
            // TO DO: Below Logic is for resetting the state need to move
            alertModal(`${newPlayers[Object.keys(newPlayers)[0]]} Won`);
            this.turn = this.savedTurn;
            this.playerColors = PLAYER_COLOR;
            this.noPlayers = this.savedNoPlayers;
            this.color = this.playerColors[this.turn];
            this.gridArray = createGameState(SMALL_GRID.name);
            //createGrid(element, this);
        } else {
            debugger;
            this.playerColors = this.getNewPlayers(newPlayers);
            this.updateTurn(false);
            updateTurnColor(this.color, element);
        }
    }
    getNewPlayers(players) {
        let newPlayers = {};
        let count = 1;
        for(let key in players) {
            newPlayers[count] = players[key];
            count ++;
        }
        return newPlayers;
    }
    getPlayersList(players) {
        let playerNames = '';
        for(let player in players) {
            playerNames = playerNames + playerNames ? ' ' : '' + player[Object.keys(player[0])];
        }
        return playerNames;
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
            this.color = this.playerColors[this.turn];
        }
    }
}