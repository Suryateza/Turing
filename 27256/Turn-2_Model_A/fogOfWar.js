// Map dimensions
const rows = 10;
const cols = 10;

// Initialize the map visibility array
const mapVisibility = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 'unexplored')
);

// Unit class as provided
class Unit {
    constructor(x, y, visionRange) {
        this.x = x;
        this.y = y;
        this.visionRange = visionRange;
    }

    getVisibleCells() {
        let visible = [];
        for (let i = -this.visionRange; i <= this.visionRange; i++) {
            for (let j = -this.visionRange; j <= this.visionRange; j++) {
                if (Math.abs(i) + Math.abs(j) <= this.visionRange) {
                    visible.push({ x: this.x + i, y: this.y + j });
                }
            }
        }
        return visible;
    }
}

// Function to update the fog of war
function updateFogOfWar(units) {
    for (let y = 0; y < mapVisibility.length; y++) {
        for (let x = 0; x < mapVisibility[y].length; x++) {
            if (mapVisibility[y][x] !== 'unexplored') {
                mapVisibility[y][x] = 'explored';
            }
        }
    }

    units.forEach(unit => {
        const visibleCells = unit.getVisibleCells();
        visibleCells.forEach(cell => {
            if (
                cell.x >= 0 &&
                cell.x < mapVisibility[0].length &&
                cell.y >= 0 &&
                cell.y < mapVisibility.length
            ) {
                mapVisibility[cell.y][cell.x] = 'visible';
            }
        });
    });
}

// Function to create the game board in the DOM
function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    for (let y = 0; y < rows; y++) {
        const row = gameBoard.insertRow();
        for (let x = 0; x < cols; x++) {
            const cell = row.insertCell();
            cell.className = `cell ${mapVisibility[y][x]}`;
        }
    }
}

// Function to apply visibility updates to the DOM
function applyVisibilityToDOM() {
    const gameBoard = document.getElementById('gameBoard');
    for (let y = 0; y < mapVisibility.length; y++) {
        for (let x = 0; x < mapVisibility[y].length; x++) {
            const cell = gameBoard.rows[y].cells[x];
            cell.className = `cell ${mapVisibility[y][x]}`;
        }
    }
}

// Example setup with one unit
const units = [new Unit(2, 2, 2)]; // Create a unit at position (2, 2) with a vision range of 2
createGameBoard();
updateFogOfWar(units);
applyVisibilityToDOM();
