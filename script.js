// script.js
let board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;
let vsComputer = false;

// DOM Elements
const gameBoard = document.getElementById("game-board");
const resetButton = document.getElementById("reset");
const toggleModeButton = document.getElementById("toggle-mode");
const statusDisplay = document.getElementById("status");

// Winning Combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],           // Diagonals
];

// Initialize the board
function initializeBoard() {
    gameBoard.innerHTML = "";
    board.fill(null);
    gameActive = true;
    currentPlayer = "X";
    statusDisplay.textContent = "Player X's Turn";

    board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cell);
    });
}

// Handle Cell Click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.dataset.index;

    if (!gameActive || board[cellIndex]) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) {
        gameActive = false;
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
    } else if (board.every(cell => cell)) {
        gameActive = false;
        statusDisplay.textContent = "It's a Draw!";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;

        if (vsComputer && currentPlayer === "O") {
            computerMove();
        }
    }
}

// Check for a Win
function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        );
    });
}

// Reset Game
function resetGame() {
    initializeBoard();
}

// Toggle Game Mode
function toggleMode() {
    vsComputer = !vsComputer;
    toggleModeButton.textContent = vsComputer
        ? "Switch to Player vs Player"
        : "Switch to Player vs Computer";
    resetGame();
}

// Computer's Move
function computerMove() {
    setTimeout(() => {
        const emptyCells = board
            .map((cell, index) => (cell === null ? index : null))
            .filter(index => index !== null);

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const cell = document.querySelector(`[data-index='${randomIndex}']`);

        cell.click(); // Simulate a click on the chosen cell
    }, 500);
}

// Event Listeners
resetButton.addEventListener("click", resetGame);
toggleModeButton.addEventListener("click", toggleMode);

// Initialize the game on page load
initializeBoard();
