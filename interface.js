const turnStatus = document.querySelector('.turn-status');
const fields = [...board.children];

export const setTurnStatus = (message) => (turnStatus.textContent = message);

export const disableField = (fieldRef) => (fieldRef.disabled = true);

export const disableBoard = () => {
    fields.forEach((field) => disableField(field));
};

export const highlightWinCombo = (winCombo) =>
    winCombo.forEach((winIdx) => fields[winIdx].classList.add('game-field--winner'));
