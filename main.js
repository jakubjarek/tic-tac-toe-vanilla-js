import {
    setTurnStatus,
    disableField,
    disableBoard,
    highlightWinCombo,
    showTryAgain,
} from './interface';

const board = document.getElementById('board');
const fields = [...board.children];

const state = {
    turn: 0,
    board: Array(9).fill(null),
    currentPlayer: ['👨‍✈️', '🧜‍♀️'][Math.floor(Math.random() * 2)],
    winner: '',
    switchCurrentPlayer: function () {
        return this.currentPlayer === '👨‍✈️'
            ? (this.currentPlayer = '🧜‍♀️')
            : (this.currentPlayer = '👨‍✈️');
    },
    setBoard: function (fieldRef) {
        const idx = fields.indexOf(fieldRef);
        this.board[idx] = this.currentPlayer;
        fields[idx].textContent = this.currentPlayer;
    },
};

setTurnStatus(`${state.currentPlayer} has the first move!`);

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
    let resolved = false;

    // isWinner() returns undefined when there is no winning combination.
    if (winner) {
        disableBoard();
        highlightWinCombo(winner);
        setTurnStatus(`${fields[winner[0]].textContent} is the winner!`);
        showTryAgain();
        resolved = !resolved;
    }

    if (state.turn === 8 && !winner) {
        setTurnStatus("It's a draw.");
        showTryAgain();
        resolved = !resolved;
    }

    return resolved;
};

const handleFieldClick = ({ target }) => {
    if (!target.matches('.game-field')) {
        return;
    }

    state.setBoard(target);
    disableField(target);

    if (state.turn >= 4) {
        resolveGame();
        if (resolveGame()) return;
    }

    state.switchCurrentPlayer();
    setTurnStatus(`${state.currentPlayer} has the next move.`);

    state.turn++;
};

board.addEventListener('click', handleFieldClick);
document.getElementById('try-again').addEventListener('click', () => location.reload());
