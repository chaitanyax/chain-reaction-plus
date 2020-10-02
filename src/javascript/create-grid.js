import $ from 'jquery';
import { SMALL_GRID, LARGE_GRID } from './constants.js';

export default function createGrid(element, gridSize) {
    const gridContainer = $(element);
    const { rows, columns } = (gridSize === 'large') ? LARGE_GRID : SMALL_GRID;
    
    for(let i = 0; i < rows; i ++) {
        let gridRow = $(`<div class="chain-row ycord-${i}"></div>`);
        for(let j = 0; j < columns; j++) {
            let gridColumn = $(`<div class="chain-column ycord-${i} xcord-${j}"></div>`);
            gridRow.append(gridColumn);
        }
        gridContainer.append(gridRow);
    }
}