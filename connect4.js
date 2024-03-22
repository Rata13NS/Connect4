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
    //orizontala
    for (let i = rows - 1; i >= 0; --i) {
        let startCell = 0;
        while (startCell <= 3) {
            let grid1 = grid[i][startCell].style.backgroundColor;
            let grid2 = grid[i][startCell + 1].style.backgroundColor;
            let grid3 = grid[i][startCell + 2].style.backgroundColor;
            let grid4 = grid[i][startCell + 3].style.backgroundColor;
            if (grid1 === grid2 && grid3 === grid4 && grid1 === grid4 && grid1 != 'blue') {
                return showWinner();
            }
            ++startCell;
        }
    }
    //verticala
    for (let i = columns - 1; i >= 0; --i) {
        startCell = rows - 1;
        while (startCell >= rows - 3) {
            let grid1 = grid[startCell][i].style.backgroundColor;
            let grid2 = grid[startCell - 1][i].style.backgroundColor;
            let grid3 = grid[startCell - 2][i].style.backgroundColor;
            let grid4 = grid[startCell - 3][i].style.backgroundColor;
            if (grid1 === grid2 && grid3 === grid4 && grid1 === grid4 && grid1 != 'blue') {
                return showWinner();
            }
            --startCell;
        }
    }
    //diagonala principala
    let cellCounter = 0;
    for (let i = 2; i >= 0; --i) {
        let startRowCell = i;
        let startColCell = 0;
        while (startColCell <= cellCounter) {
            let grid1 = grid[startRowCell][startColCell].style.backgroundColor;
            let grid2 = grid[startRowCell + 1][startColCell + 1].style.backgroundColor;
            let grid3 = grid[startRowCell + 2][startColCell + 2].style.backgroundColor;
            let grid4 = grid[startRowCell + 3][startColCell + 3].style.backgroundColor;
            if (grid1 === grid2 && grid3 === grid4 && grid1 === grid4 && grid1 != 'blue') {
                return showWinner();
            }
            ++startRowCell;
            ++startColCell;
        }
        ++cellCounter;
    }
    cellCounter = 6;
    for (let i = 3; i <= 5; ++i) {
        let startRowCell = i;
        let startColCell = 6;
        while (startColCell >= cellCounter) {
            let grid1 = grid[startRowCell][startColCell].style.backgroundColor;
            let grid2 = grid[startRowCell - 1][startColCell - 1].style.backgroundColor;
            let grid3 = grid[startRowCell - 2][startColCell - 2].style.backgroundColor;
            let grid4 = grid[startRowCell - 3][startColCell - 3].style.backgroundColor;
            if (grid1 === grid2 && grid3 === grid4 && grid1 === grid4 && grid1 != 'blue') {
                return showWinner();
            }
            --startRowCell;
            --startColCell;
        }
        --cellCounter;
    } 
    //diagonala secundara
    cellCounter = 6;
    for (let i = 2; i >= 0; --i) {
        let startRowCell = i;
        let startColCell = 6;
        while (cellCounter <= startColCell) {
            let grid1 = grid[startRowCell][startColCell].style.backgroundColor;
            let grid2 = grid[startRowCell + 1][startColCell - 1].style.backgroundColor;
            let grid3 = grid[startRowCell + 2][startColCell - 2].style.backgroundColor;
            let grid4 = grid[startRowCell + 3][startColCell - 3].style.backgroundColor;
            if (grid1 === grid2 && grid3 === grid4 && grid1 === grid4 && grid1 != 'blue') {
                return showWinner();
            }
            ++startRowCell;
            --startColCell;
        }
        --cellCounter;
    }
    cellCounter = 0;
    for (let i = 3; i <= 5; ++i) {
        let startRowCell = i;
        let startColCell = 0;
        while (startColCell <= cellCounter) {
            let grid1 = grid[startRowCell][startColCell].style.backgroundColor;
            let grid2 = grid[startRowCell - 1][startColCell + 1].style.backgroundColor;
            let grid3 = grid[startRowCell - 2][startColCell + 2].style.backgroundColor;
            let grid4 = grid[startRowCell - 3][startColCell + 3].style.backgroundColor;
            if (grid1 === grid2 && grid3 === grid4 && grid1 === grid4 && grid1 != 'blue') {
                return showWinner();
            }
            --startRowCell;
            ++startColCell;
        }
        ++cellCounter;
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
