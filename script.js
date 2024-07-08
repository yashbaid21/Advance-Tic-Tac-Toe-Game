const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const playAIButton = document.getElementById('playAI');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const scoreAIElement = document.getElementById('scoreAI');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameActive = true;
let playAgainstAI = false;
let scoreX = 0;
let scoreO = 0;
let scoreAI = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const index = e.target.getAttribute('data-index');

    if (gameState[index] !== null || !isGameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `${currentPlayer} has won!`;
        updateScore(currentPlayer);
        isGameActive = false;
        return;
    }

    if (!gameState.includes(null)) {
        message.textContent = 'Game is a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (playAgainstAI && currentPlayer === 'O') {
        setTimeout(makeAIMove, 500);
    }
};

const checkWin = () => {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
};

const makeAIMove = () => {
    let availableCells = gameState.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    
    if (checkWin()) {
        message.textContent = `O has won!`;
        updateScore('AI');
        isGameActive = false;
        return;
    }

    if (!gameState.includes(null)) {
        message.textContent = 'Game is a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = 'X';
};

const updateScore = (player) => {
    if (player === 'X') {
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else if (player === 'O' && playAgainstAI) {
        scoreAI++;
        scoreAIElement.textContent = scoreAI;
    } else {
        scoreO++;
        scoreOElement.textContent = scoreO;
    }
};

const restartGame = () => {
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameActive = true;
    message.textContent = '';
};

const startGameWithAI = () => {
    playAgainstAI = true;
    restartGame();
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
playAIButton.addEventListener('click', startGameWithAI);
