const turnStatus = document.querySelector('.game-status');
const gameStatus = document.querySelector('.turn-status');
const fields = [...board.children];

export const setGameStatus = (message) => (gameStatus.textContent = message);

export const setTurnStatus = (message) => (turnStatus.textContent = message);

export const disableField = (fieldRef) => (fieldRef.disabled = true);

export const disableBoard = () => {
    fields.forEach((field) => disableField(field));
};

export const highlightWinCombo = (winCombo) =>
    winCombo.forEach((winIdx) => fields[winIdx].classList.add('game-field--winner'));
