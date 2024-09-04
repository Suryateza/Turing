// Initialize Firebase (replace with your config)
const firebaseConfig = {
    // Your Firebase configuration here
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Game variables
let puzzleSize = 3; // Default difficulty
let pieces = [];
let emptySpot = {x: puzzleSize - 1, y: puzzleSize - 1};
let time = 0;
let timerInterval;
let score = 0;

function startGame() {
    clearInterval(timerInterval);
    time = 0;
    score = 0;
    updateDisplay();
    shufflePuzzle();
    startTimer();
}

function shufflePuzzle() {
    pieces = Array.from({length: puzzleSize * puzzleSize}, (_, i) => i);
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
    renderPuzzle();
}

function renderPuzzle() {
    const puzzleArea = document.getElementById('puzzle-area');
    puzzleArea.innerHTML = '';
    pieces.forEach((piece, index) => {
        if (piece === 0) return; // 0 represents the empty space
        let item = document.createElement('div');
        item.className = 'puzzle-piece';
        item.style.backgroundImage = 'url("path\_to\_your\_image.jpg")';
        item.style.backgroundPosition = `-\${(piece \% puzzleSize) * 100}px -\${Math.floor(piece / puzzleSize) * 100}px`;
        item.style.width = item.style.height = `\${300 / puzzleSize}px`;
        item.style.left = `\${(index \% puzzleSize) * (300 / puzzleSize)}px`;
        item.style.top = `\${Math.floor(index / puzzleSize) * (300 / puzzleSize)}px`;
        item.setAttribute('data-index', piece);
        item.draggable = true;
        puzzleArea.appendChild(item);
    });
    addDragListeners();
}

function addDragListeners() {
    document.querySelectorAll('.puzzle-piece').forEach(piece => {
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragover', dragOver);
        piece.addEventListener('drop', drop);
    });
}

// Drag and Drop Functions
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-index'));
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const movingIndex = e.dataTransfer.getData('text');
    const targetIndex = parseInt(e.target.getAttribute('data-index'), 10);
    if (swapPieces(movingIndex, targetIndex)) {
        checkWin();
    }
}

function swapPieces(from, to) {
    const fromPos = pieces.indexOf(parseInt(from, 10));
    const toPos = pieces.indexOf(parseInt(to, 10));
    if (canMove(fromPos, toPos)) {
        [pieces[fromPos], pieces[toPos]] = [pieces[toPos], pieces[fromPos]];
        renderPuzzle();
        return true;
    }
    return false;
}

function canMove(from, to) {
    const dx = Math.abs((from % puzzleSize) - (to % puzzleSize));
    const dy = Math.abs(Math.floor(from / puzzleSize) - Math.floor(to / puzzleSize));
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

function checkWin() {
    if (pieces.every((val, index) => val === index + 1 || val === 0)) {
        alert('You won! Your score: ' + score);
        clearInterval(timerInterval);
        updateLeaderboard(score);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        updateDisplay();
    }, 1000);
}

function updateDisplay() {
    document.getElementById('time').textContent = new Date(time * 1000).toISOString().substr(11, 8);
    document.getElementById('current-score').textContent = score = Math.max(0, 1000 - time); // Simple scoring
}

// Leaderboard
function updateLeaderboard(score) {
    const playerName = prompt('Enter your name for the leaderboard:');
    if (playerName) {
        database.ref('leaderboard').push({
            name: playerName,
            score: score,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }
}

// Real-time Leaderboard
database.ref('leaderboard').orderByChild('score').limitToLast(10).on('value', (snapshot) => {
    const leaderboard = document.getElementById('leaderboard-list');
    leaderboard.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        const li = document.createElement('li');
        li.textContent = `\${childData.name}: \${childData.score}`;
        leaderboard.insertBefore(li, leaderboard.firstChild); // Insert at top
    });
});

// Event Listeners
document.getElementById('shuffle').addEventListener('click', startGame);
document.getElementById('level').addEventListener('change', function() {
    puzzleSize = parseInt(this.value, 10);
    startGame();
});

// Initial Game Start
startGame();