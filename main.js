import {
    setGameStatus,
    setTurnStatus,
    disableField,
    disableBoard,
    highlightWinCombo,
} from './interface';

const board = document.getElementById('board');
const fieldCollection = [...board.children];

const state = {
    turn: 0,
    board: Array(9).fill(null),
    currentPlayer: ['👨‍✈️', '🧜‍♀️'][Math.floor(Math.random() * 2)],
    switchCurrentPlayer: function () {
        return this.currentPlayer === '👨‍✈️'
            ? (this.currentPlayer = '🧜‍♀️')
            : (this.currentPlayer = '👨‍✈️');
    },
    setBoard: function (fieldRef) {
        const idx = fieldCollection.indexOf(fieldRef);
        this.board[idx] = this.currentPlayer;
        fieldCollection[idx].textContent = this.currentPlayer;
    },
};

const isWinner = () => {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Destructured because filter returns a nested array.
    const [winCombo] = winCombos.filter((combo) => {
        const [a, b, c] = combo;
        return (
            state.board[a] && state.board[a] === state.board[b] && state.board[a] === state.board[c]
        );
    });

    return winCombo;
};

const resolveGame = () => {
    const winner = isWinner();

    // isWinner() returns undefined when there is no winner.
    if (winner) {
        disableBoard();
        highlightWinCombo(winner);
    }
};

const handleFieldClick = ({ target }) => {
    if (!target.matches('.game-field')) {
        return;
    }

    state.setBoard(target);
    state.switchCurrentPlayer();
    disableField(target);

    if (state.turn >= 4) {
        resolveGame();
    }

    state.turn++;
};

board.addEventListener('click', handleFieldClick);
