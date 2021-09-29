const turnStatus = document.querySelector('.game-status');
const gameStatus = document.querySelector('.turn-status');
const fieldCollection = [...board.children];

export const setGameStatus = (message) => (gameStatus.textContent = message);

export const setTurnStatus = (message) => (turnStatus.textContent = message);

export const disableField = (fieldRef) => (fieldRef.disabled = true);

export const disableBoard = () => {
    fieldCollection.forEach((field) => disableField(field));
};

export const highlightWinCombo = (winCombo) =>
    winCombo.forEach((winIdx) => fieldCollection[winIdx].classList.add('highlight-winner'));
