import $ from 'jquery';
import  { updateGrid, bombardCell } from './features/chain-grid/chain-grid';

export const cellClickEventHandler = ({ target }, gameState) => {
    console.log(gameState);
    let x = Number($(target).closest('.chain-cell').attr('data-x'));
    let y = Number($(target).closest('.chain-cell').attr('data-y')); 
    let cell = gameState.gridArray[y][x];
    let cellState = cell.state;
    let bombard = cell.updateState(gameState.turn);
    if(cellState !== cell.state) {
        bombard ? '' : cell.setColor(gameState.turn);
        gameState.updateTurn();
        updateGrid($('.chain-container'), gameState, `${y}-${x}`);
    }
    if(bombard) {
        bombardCell(gameState, bombard, $('.chain-container'), `${y}-${x}`);
    }

    console.log(gameState);
}