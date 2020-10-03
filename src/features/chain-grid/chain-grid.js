import $ from 'jquery';
import { SMALL_GRID, LARGE_GRID, COLORS } from '../../constants.js';
import Atom from '../Models/atom';
import  { cellClickEventHandler } from '../../event-handler';
 
export function createGrid(element, gameState) {
    const gridContainer = $(element);
    gridContainer.empty();
    const gridArray = gameState.gridArray;

    gridArray.reduce((input, row) => {
        let gridRow = $(getRowMarkup());
        row.reduce((input, cell) => {
            let gridColumn = $(getCellMarkup(cell.x, cell.y));
            if(cell.state > 0) {
                gridColumn.append(getAtomToCell(cell.state, cell.color));
            }
            gridRow.append(gridColumn);
        }, false);
        gridContainer.append(gridRow);
    }, false);

    $('.chain-cell').on('click', (e) => cellClickEventHandler(e, gameState));
}

export function createGameState(gridSize) {
    const { rows, columns } = (gridSize === 'large') ? LARGE_GRID : SMALL_GRID;
    let gridArray = [];

    for(let i = 0; i < rows; i ++) {
        let rowArray = [];
        for(let j = 0; j < columns; j++) {
            rowArray.push(new Atom(j, i, 0, COLORS.none));
        }
        gridArray.push(rowArray);
    }
    return gridArray;
}

const getCellMarkup = (x, y) => {
    return `<div class="chain-cell chain-column" data-y="${y}" data-x="${x}"></div>`;
}

const getRowMarkup = () => {
    return `<div class="chain-row"></div>`;
}

const getAtomToCell = (state, color) => {
    return `<img alt="${color}-${state}" src="./${color}${state}.png" class="atom-img-animate">`;
}