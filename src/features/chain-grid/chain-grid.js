import $ from 'jquery';
import { SMALL_GRID, LARGE_GRID, COLORS } from '../../constants.js';
import Atom from '../models/atom';
import { cellClickEventHandler } from '../../event-handler';

export function createGrid(element, gameState) {
    const gridContainer = $(element);
    gridContainer.empty();
    const gridArray = gameState.gridArray;

    gridArray.forEach((row) => {
        let gridRow = $(getRowMarkup());
        row.forEach((cell) => {
            let gridColumn = $(getCellMarkup(cell.x, cell.y, cell.state));
            if (cell.state > 0) {
                gridColumn.append(getAtomToCell(cell.state, cell.color));
            }
            gridRow.append(gridColumn);
        }, false);
        gridContainer.append(gridRow);
    }, false);

    $('.chain-cell').on('click', (e) => cellClickEventHandler(e, gameState));
    updateTurnColor(gameState.color, gridContainer);
}

export function createGameState(gridSize) {
    const { rows, columns } = (gridSize === 'large') ? LARGE_GRID : SMALL_GRID;
    let gridArray = [];

    for (let i = 0; i < rows; i++) {
        let rowArray = [];
        for (let j = 0; j < columns; j++) {
            rowArray.push(new Atom(j, i, 0, COLORS.none));
        }
        gridArray.push(rowArray);
    }
    return gridArray;
}

export const updateGrid = (element, gameState, cellyx) => {
    const gridContainer = element;
    const gridArray = gameState.gridArray;

    gridArray.forEach((row) => {
        row.forEach((cell) => {
            let currentCell = gridContainer.find(`.${cellyx}`);
            if (cellyx === `${cell.y}-${cell.x}` && currentCell.attr('data-state') != cell.state) {
                currentCell.empty();
                currentCell.attr('data-state', cell.state);
                currentCell.append(getAtomToCell(cell.state, cell.color));
            }
        }, false);
    }, false);
    updateTurnColor(gameState.color, gridContainer);
}

const updateTurnColor = (color, element) => {
    if (color === COLORS.red) {
        applyBorder(element, '#f40e0e');
    } else if (color === COLORS.blue) {
        applyBorder(element, '#4f36c0');
    } else if (color === COLORS.green) {
        applyBorder(element, '#aeab25');
    }
}

const applyBorder = (element, color) => {
    $(element).css({ border: `1px solid ${color}` })
    $(element).find('.chain-column').css({ border: `1px solid ${color}` });
}

const getCellMarkup = (x, y, state) => {
    return `<div class="chain-cell chain-column ${y}-${x}" data-state="${state}" data-y="${y}" data-x="${x}"></div>`;
}

const getRowMarkup = () => {
    return `<div class="chain-row"></div>`;
}

const getAtomToCell = (state, color) => {
    if (!state) return;
    return `<img alt="${color}-${state}" src="./${color}${state}.png" class="atom-img-animate">`;
}