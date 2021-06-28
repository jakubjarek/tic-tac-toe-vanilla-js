const board = document.getElementById("app");
const gameStatusMessage = document.querySelector(".game-status");
const gameFieldCollection = board.querySelectorAll(".game-field");
const turnStatusMessage = document.querySelector(".turn-status");
const tryAgainContainer = document.querySelector(".try-again-container");
const tryAgainButton = document.querySelector(".try-again-button");

const FIRST_MARK = "👽";
const SECOND_MARK = "👹";
const WIN_ROWS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initialBoardState = () => Array(9).fill(null);

let boardState = initialBoardState();
let mark = [FIRST_MARK, SECOND_MARK][Math.floor(Math.random() * 2)];
let turn = 0;

const setBoardState = (t) => {
  const index = [...gameFieldCollection].indexOf(t);
  boardState[index] = mark;

  paintBoardContent();
};

const paintBoardContent = () => {
  boardState.forEach((item, idx) => {
    [...gameFieldCollection][idx].textContent = item;
  });
};

const setMark = () =>
  mark === FIRST_MARK ? (mark = SECOND_MARK) : (mark = FIRST_MARK);

const calculateWinningRow = () => {
  /*
    If there is a winning row,
    filter returns a nested array,
    therefore the use of destructuring.
  */
  const [winningRow] = WIN_ROWS.filter((comb) => {
    return (
      boardState[comb[0]] &&
      boardState[comb[0]] === boardState[comb[1]] &&
      boardState[comb[0]] === boardState[comb[2]]
    );
  });

  return winningRow ? winningRow : false;
};

const resolveGame = () => {
  const winningRow = calculateWinningRow();

  // If there is a winner.
  if (winningRow) {
    setBoardInactive();
    setGameStatusMessage(boardState[winningRow[0]]);
    setTurnStatusMessage("Congratulations!");
    highlightWinningCombination(winningRow);
    tryAgainContainer.classList.remove("hidden");
    return;
  }

  // If there is a tie.
  if (turn === 8 && !winningRow) {
    setGameStatusMessage(null, "It's a tie!");
    setTurnStatusMessage("Click the button to try again.");
    tryAgainContainer.classList.remove("hidden");
    return;
  }
};

// UI only fuctions.
// *****************

const setGameStatusMessage = (winner, message = `${winner} is the winner!`) =>
  (gameStatusMessage.textContent = message);

const setTurnStatusMessage = (message = `It's ${mark}'s turn!`) => {
  turnStatusMessage.textContent = message;
};

const setInactive = (t) => {
  t.disabled = true;
};

const setBoardInactive = () => {
  gameFieldCollection.forEach((field) => setInactive(field));
};

const highlightWinningCombination = (winningRow) => {
  winningRow.forEach((winnerFieldIdx) => {
    gameFieldCollection[winnerFieldIdx].classList.add("highlight-winner");
  });
};

// *****************
// UI only fuctions.

const handleGameFieldClick = ({ target }) => {
  if (target.nodeName === "BUTTON" && target.matches(".game-field")) {
    setBoardState(target);
    setMark();
    setInactive(target);
    setTurnStatusMessage();

    resolveGame();

    turn++;
  }
};

const restartGame = () => {
  boardState = initialBoardState();
  turn = 0;
  setMark();
  setInitialText();
  tryAgainContainer.classList.add("hidden");

  [...gameFieldCollection].forEach((field) => {
    field.classList.remove("game-field--inactive");
    field.classList.remove("highlight-winner");
    field.disabled = false;
    field.textContent = "";
  });
};

const setInitialText = () => {
  gameStatusMessage.textContent = "Game is in progress...";
  turnStatusMessage.textContent = `${mark} has the first move!`;
};

// Inits:
setInitialText();

// EventListeners:
board.addEventListener("click", handleGameFieldClick);
tryAgainButton.addEventListener("click", restartGame);
