import $ from 'jquery';
import  { createGrid, createGameState } from './features/chain-grid/chain-grid';
import GameState from './features/models/game-state';
import { SMALL_GRID } from './constants';

const initialState = 1;
const noPlayers = 3;

const gameState = new GameState(initialState, noPlayers, createGameState(SMALL_GRID.name));
createGrid($('.chain-container'), gameState);