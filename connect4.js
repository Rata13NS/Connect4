let gridContainer = document.getElementById("gridContainer");
let winnerPlayer = document.getElementById("statusWinner");
let winnerButton = document.getElementById("winnerButton");
let grid = [];
let currentPlayer = 1;
let buttonCounter = 0;
let stopfunction = true;
let rows = 6;
let columns = 7;

function createGrid() {
    for (let i = 0; i < rows; i++) {
        let row = document.createElement('div');
        row.className = "row";
        let newRow = [];
        for (let j = 0; j < columns; j++) {
            let box = document.createElement('div');
            box.className = "box";
            row.appendChild(box);
            box.style.backgroundColor = 'blue';
            newRow.push(box);
        }
        grid.push(newRow);
        gridContainer.appendChild(row);
    }
}

function game() {
    grid.forEach(function(row, rowIndex) {
        row.forEach(function(box, colIndex) {
            box.addEventListener('click', function() {
                if (stopfunction === false) return;
                dropColor(colIndex);
            });
        });
    });
}

function dropColor(col) {
    let rowToColor = rows - 1;
    while (rowToColor >= 0 && grid[rowToColor][col].style.backgroundColor !== 'blue') {
        rowToColor--;
    }
    if (currentPlayer === 1) {
        grid[rowToColor][col].style.backgroundColor = 'green';
        statusGame();
        currentPlayer = 2;
    } else {
        grid[rowToColor][col].style.backgroundColor = 'red';
        statusGame();
        currentPlayer = 1;
    }
}

function statusGame() {
    horizontalStatus();
    verticalStatus();
    mainDiagonalStatus();
    secondaryDiagonalStatus();
}

function horizontalStatus() {
    for (let i = rows - 1; i >= 0; i--) {
        let startCell = 0;
        while (startCell <= 3) {
            let rowDifference = 0;
            let colDifference = 1;
            gridsStatus(i, startCell, rowDifference, colDifference);
            ++startCell;
        }
    }
}

function verticalStatus() {
    for (let i = columns - 1; i >= 0; i--) {
        startCell = rows - 1;
        while (startCell >= rows - 3) {
            let rowDifference = -1;
            let colDifference = 0;
            gridsStatus(startCell, i, rowDifference, colDifference);
            --startCell;
        }
    }
}

function mainDiagonalStatus() {
    let cellCounter = 0;
    for (let i = 2; i >= 0; i--) {
        let startRowCell = i;
        let startColCell = 0;
        while (startColCell <= cellCounter) {
            let rowDifference = 1;
            let colDifference = 1;
            gridsStatus(startRowCell, startColCell, rowDifference, colDifference);
            ++startRowCell;
            ++startColCell;
        }
        ++cellCounter;
    }
    cellCounter = columns - 1;
    for (let i = 3; i <= rows - 1; i++) {
        let startRowCell = i;
        let startColCell = columns - 1;
        while (startColCell >= cellCounter) {
            let rowDifference = -1;
            let colDifference = -1;
            gridsStatus(startRowCell, startColCell, rowDifference, colDifference);
            --startRowCell;
            --startColCell;
        }
        --cellCounter;
    } 
}

function secondaryDiagonalStatus() {
    cellCounter = columns - 1;
    for (let i = 2; i >= 0; i--) {
        let startRowCell = i;
        let startColCell = columns - 1;
        while (cellCounter <= startColCell) {
            let rowDifference = 1;
            let colDifference = -1;
            gridsStatus(startRowCell, startColCell, rowDifference, colDifference);
            ++startRowCell;
            --startColCell;
        }
        --cellCounter;
    }
    cellCounter = 0;
    for (let i = 3; i <= rows - 1; i++) {
        let startRowCell = i;
        let startColCell = 0;
        while (startColCell <= cellCounter) {
            let rowDifference = -1;
            let colDifference = 1;
            gridsStatus(startRowCell, startColCell, rowDifference, colDifference);
            --startRowCell;
            ++startColCell;
        }
        ++cellCounter;
    }
}

function gridsStatus(rowGrid, colGrid, rowDifference, colDifference) {
    let grid1 = grid[rowGrid][colGrid].style.backgroundColor;
    let grid2 = grid[rowGrid + 1 * rowDifference][colGrid + 1 * colDifference].style.backgroundColor;
    let grid3 = grid[rowGrid + 2 * rowDifference][colGrid + 2 * colDifference].style.backgroundColor;
    let grid4 = grid[rowGrid + 3 * rowDifference][colGrid + 3 * colDifference].style.backgroundColor;
    if (grid1 === grid2 && grid3 === grid4 && grid1 === grid4 && grid1 != 'blue') {
        return showWinner();
    }
}

function showWinner() {
    winnerPlayer.innerHTML = "Congratulations to Player " + currentPlayer + "! You are the winner!";
    stopfunction = false;
    restartButton();
}

function restartButton() {
    let button = document.createElement("button");
    button.textContent = "Restart the game";
    button.style.background = "rgba(0, 0, 255, 0.8)";
    winnerButton.appendChild(button);
    button.addEventListener('click', function() {
        button.parentNode.removeChild(button);
        gridContainer.innerHTML = '';
        winnerPlayer.innerHTML = '';
        grid = [];
        currentPlayer = 1;
        stopfunction = true;
        createGrid();
        game();
    });
}
