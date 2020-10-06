import $ from 'jquery';

export const alertModal = (title, playerSelection, closeButton) => {
    let modal = $(`<div id="chainModal" class="chain-modal">
                    <div class="modal-content"></div>
                </div>`);
    if (closeButton) {
        let button = $(`<span class="close">&times;</span>`);
        button.on('click', () => {
            $('.modal-container').empty();
        });
        modal.find('.modal-content').append(button);
    }
    if (title) {
        let customTitle = `<div class="title">
                                <h2>${title}</h2>
                            </div>`;
        modal.find('.modal-content').append(customTitle);
    }

    if (playerSelection) {
        let playerSelect = $(`<div class="chain-select">
                                <select name="playerCount" id="playerCount">
                                    <option value="2">2 Players</option>
                                    <option value="3">3 Players</option>
                                </select>
                            </div>`);
        playerSelect.find('#playerCount').on('change', function () {
            $('.modal-container').attr('data-players', this.value);
            $('.modal-container').empty();
        });
        modal.find('.modal-content').append(playerSelect);
    }

    $('.modal-container').append(modal);
}