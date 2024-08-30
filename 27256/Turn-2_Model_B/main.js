const MAP_WIDTH = 10;
const MAP_HEIGHT = 10;
let grid = [];
let visibilityGrid = [];

// Initialize grid and visibilityGrid
for (let i = 0; i < MAP_WIDTH; i++) {
    grid[i] = [];
    visibilityGrid[i] = [];
    for (let j = 0; j < MAP_HEIGHT; j++) {
        grid[i][j] = { terrain: 'unknown', unit: null };
        visibilityGrid[i][j] = 'unexplored'; 
    }
}

// Dummy unit for testing
let unit = { x: 5, y: 5, vision: 3 };

function updateVisibility(unit) {
    let visionRadius = unit.vision;
    let unitX = unit.x;
    let unitY = unit.y;

    // Loop through all cells within vision radius
    for (let dx = -visionRadius; dx <= visionRadius; dx++) {
        for (let dy = -visionRadius; dy <= visionRadius; dy++) {
            let cellX = unitX + dx;
            let cellY = unitY + dy;

            // Check if cell is within map bounds
            if (cellX >= 0 && cellX < MAP_WIDTH && cellY >= 0 && cellY < MAP_HEIGHT) {
                // Update visibility for this cell
                visibilityGrid[cellX][cellY] = 'visible';
            }
        }
    }
}

function getCellElement(x, y) {
    return document.querySelector(`#grid div[data-x='${x}'][data-y='${y}']`);
}

// DOM update function
function updateDOM() {
    for (let i = 0; i < MAP_WIDTH; i++) {
        for (let j = 0; j < MAP_HEIGHT; j++) {
            const visibility = visibilityGrid[i][j];
            const cellElement = getCellElement(i, j);

            if (visibility === 'unexplored') {
                cellElement.classList.add('fog');
            } else {
                cellElement.classList.remove('fog');
            }
        }
    }
}

// Create the grid in the DOM
function createGrid() {
    const gridElement = document.getElementById('grid');
    for (let i = 0; i < MAP_WIDTH; i++) {
        for (let j = 0; j < MAP_HEIGHT; j++) {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.dataset.x = i;
            cellElement.dataset.y = j;
            gridElement.appendChild(cellElement);
        }
    }
}

// Initialize
createGrid();
updateVisibility(unit);
updateDOM();
