import $ from 'jquery';
import  { updateGrid, createGameState } from './features/chain-grid/chain-grid';

export const cellClickEventHandler = ({ target }, gameState) => {
    console.log(gameState);
    let x = Number($(target).closest('.chain-cell').attr('data-x'));
    let y = Number($(target).closest('.chain-cell').attr('data-y'));
    let cell = gameState.gridArray[y][x];
    cell.setColor(gameState.turn);
    cell.updateState(gameState.turn);
    gameState.updateTurn();
    console.log(gameState);
    updateGrid($('.chain-container'), gameState, `${y}-${x}`);
}