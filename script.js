const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart"); // Added restart button reference

let currentPlayer = "X";
let gameActive = true;
let cells = ["", "", "", "", "", "", "", "", ""];

function drawBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => handleClick(index));
    board.appendChild(cellDiv);
  });
}

function handleClick(index) {
  if (cells[index] !== "" || !gameActive) return;

  cells[index] = currentPlayer;
  drawBoard();

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`; // Fixed message
    gameActive = false;
  } else if (!cells.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]              // diags
  ];
  return winConditions.some(combination =>
    combination.every(i => cells[i] === currentPlayer)
  );
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  cells = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "Player X's turn";
  drawBoard();
}

drawBoard();
statusText.textContent = "Player X's turn";

// Restart button event
restartBtn.addEventListener("click", restartGame);
