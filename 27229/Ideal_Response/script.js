let board = [];
let currentPlayer = 'X';
let gameMode = 'multi';
let player1Score = 0;
let player2Score = 0;
let roundCount = 0;
let gameEnded = false;

document.addEventListener('DOMContentLoaded', () => {
    initializeBoard();
    animateBoardEntrance();
});

function initializeBoard() {
    const gameBoardDiv = document.getElementById('game-board');
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.onclick = () => cellClicked(i);
        gameBoardDiv.appendChild(cell);
        board.push('');
    }
}

function animateBoardEntrance() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.style.opacity = 0;
        setTimeout(() => {
            cell.style.transition = 'opacity 0.5s ease-in-out';
            cell.style.opacity = 1;
        }, index * 100);
    });
}

function cellClicked(index) {
    if (gameEnded || board[index] !== '') return;
    board[index] = currentPlayer;
    animateMark(index, currentPlayer);
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameMode === 'single' && currentPlayer === 'O' && !gameEnded) {
        aiMove();
    }
}

function animateMark(index, player) {
    let cell = document.getElementsByClassName('cell')[index];
    cell.style.transform = 'scale(0)';
    cell.style.transition = 'transform 0.5s ease-out';
    cell.style.transform = 'scale(1)';
    cell.innerText = player;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
        if (pattern.every(idx => board[idx] === 'X')) {
            endRound('X');
            return;
        }
        if (pattern.every(idx => board[idx] === 'O')) {
            endRound('O');
            return;
        }
    }
    if (!board.includes('')) {
        endRound('Tie');
    }
}

function endRound(winner) {
    gameEnded = true;
    if (winner === 'X' || winner === 'O') {
        document.getElementById('result').innerText = `Player ${winner} wins this round!`;
        winner === 'X' ? player1Score += 2 : player2Score += 2;
    } else {
        document.getElementById('result').innerText = "It's a tie!";
        player1Score++; player2Score++;
    }
    updateScoreBoard();
    setTimeout(resetBoard, 2000);
}

function resetBoard() {
    board = board.map(() => '');
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
    currentPlayer = 'X';
    gameEnded = false;
    roundCount++;
    document.getElementById('rounds').innerText = `Rounds: ${roundCount}/5`;
    if (roundCount === 5) {
        declareFinalWinner();
    }
}

function declareFinalWinner() {
    let winner = player1Score > player2Score ? 'X' : 'O';
    document.getElementById('result').innerText = `Player ${winner} is the overall winner!`;
}

function aiMove() {
    let availableSpots = board.reduce((acc, val, idx) => val === '' ? [...acc, idx] : acc, []);
    let randomSpot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    setTimeout(() => cellClicked(randomSpot), 500);
}

function setMode(mode) {
    gameMode = mode;
    resetBoard();
}

function updateScoreBoard() {
    document.getElementById('player1-score').innerText = `Player X: ${player1Score}`;
    document.getElementById('player2-score').innerText = `Player O: ${player2Score}`;
}
