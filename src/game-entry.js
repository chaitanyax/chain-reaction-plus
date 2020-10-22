import $ from "jquery";
import { createGrid, createGameState } from "./features/chain-grid/chain-grid";
import GameState from "./features/models/game-state";
import { SMALL_GRID } from "./constants";
import { alertModal } from "./features/alert-modal/alert-modal";

const callBackForModal = () => {
  const noPlayersFromModal = Number($(".modal-container").attr("data-players"));
  const initialState = 1;
  const noPlayers = noPlayersFromModal ? noPlayersFromModal : 3;

  const gameState = new GameState(
    initialState,
    noPlayers,
    createGameState(SMALL_GRID.name)
  );
  createGrid($(".chain-container"), gameState);
};

alertModal("Please Select How Many Players", true, false, callBackForModal);
