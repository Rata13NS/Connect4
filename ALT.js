let gridContainer = document.getElementById("gridContainer");
let winnerPlayer = document.getElementById("statusWinner");
let winnerButton = document.getElementById("winnerButton");
let boxes = [];
let currentPlayer = 1;
let buttonCounter = 0;
let stopfunction = true;
let wonGame = false;
let lastCell;

function createGrid() {
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('div');
        row.className = "row";
        for (let j = 0; j < 7; j++) {
            let box = document.createElement('div');
            box.className = "box";
            row.appendChild(box);
            box.style.backgroundColor = 'blue';
            boxes.push(box);
        }                
        gridContainer.appendChild(row);
    }
}

function game() {
    boxes.forEach(function(box, index) {
        box.addEventListener('click', function() {
            if (stopfunction === false) return;
            dropColor(index);
          });
      });
}

function dropColor(index) {
    for (let i = 0; i <= 6; ++i) {
        if ((index - i) % 7 === 0) {
            lastCell = i + 35;
            return changeColor(lastCell);
        }
    }
}

function changeColor(lastCell) {
    let columnCounter = 0;
    while (boxes[lastCell - columnCounter].style.backgroundColor != 'blue') {
        columnCounter += 7;
    }
    let lastColored = lastCell - columnCounter;
    if (currentPlayer === 1) {
        boxes[lastColored].style.backgroundColor = 'green';
        statusGame();
        currentPlayer = 2;
    } else {
        boxes[lastColored].style.backgroundColor = 'red';
        statusGame();
        currentPlayer = 1; 
    }
}

function statusGame() {
    //orizontala
    for (let i = 35; i >= 0; i = i - 7) {
        startCell = i;
        while (startCell <= i + 3) {
            for (let j = startCell; j <= startCell + 3; ++j) {
                let consecutiveBoxes = 1;
                consecutiveBoxesStatus(startCell, consecutiveBoxes);
                if (wonGame === true) {
                    return showWinner();
                }
            }
            ++startCell;
        }
        startCell -= 7;
    }
    //verticala
    for (let i = 35; i <= 41; ++i) {
        startCell = i;
        while (startCell >= i - 14) {
            for (let j = startCell; j >= startCell - 21; j = j - 7) {
                let consecutiveBoxes = -7;
                consecutiveBoxesStatus(startCell, consecutiveBoxes);
                if (wonGame === true) {
                    return showWinner();
                }
            }
            startCell -= 7;  
        }
    }
    //diagonala principala
    let i;
    let cellCounter = 16;
    for (i = 1; i <= 3; ++i) {
        mainDiagonal(i);
        if (wonGame === true) {
            return showWinner();
        }
    }
    cellCounter = 16;
    for (i = 0; i <= 14; i = i + 7) {
        mainDiagonal(i);
        if (wonGame === true) {
            return showWinner();
        }
    }
    function mainDiagonal(i) {
        startCell = i;
        while (startCell <= i + cellCounter) {
            for (let j = startCell; j <= startCell + 24; j = j + 8) {
                let consecutiveBoxes = 8;
                consecutiveBoxesStatus(startCell, consecutiveBoxes);
            }
            startCell += 8; 
        }
        cellCounter -= 8;
    }
    //diagonala secundara
    cellCounter = 12;
    for (i = 35; i >= 21; i = i - 7) {
        secondaryDiagonal(i);
        if (wonGame === true) {
            return showWinner();
        }
    }
    cellCounter = 12;
    for (i = 36; i <= 38; ++i) {
        secondaryDiagonal(i);
        if (wonGame === true) {
            return showWinner();
        }
    }
    function secondaryDiagonal(i) {
        startCell = i;
        while (startCell >= i - cellCounter) {
            for (let j = startCell; j >= startCell - 18; j = j - 6) {
                let consecutiveBoxes = -6;
                consecutiveBoxesStatus(startCell, consecutiveBoxes);
            }
            startCell -= 6; 
        }
        cellCounter -= 6;
    }
}

function consecutiveBoxesStatus(startCell, consecutiveBoxes) {
    let box1 = boxes[startCell].style.backgroundColor;
    let box2 = boxes[startCell + consecutiveBoxes].style.backgroundColor;
    let box3 = boxes[startCell + 2 * consecutiveBoxes].style.backgroundColor;
    let box4 = boxes[startCell + 3 * consecutiveBoxes].style.backgroundColor;
    if (box1 === box2 && box3 === box4 && box1 === box4 && box1 != 'blue') {
        wonGame = true;
    }
}

function showWinner() {
    winnerPlayer.innerHTML = "Conglaturations to Player " + currentPlayer + "! You are the winner!";
    stopfunction = false;
    restartButton();
}

function restartButton() {
    let button = document.createElement("button");
    button.textContent="Restart the game";
    button.style.background = "rgba(0, 0, 255, 0.8)";
    winnerButton.appendChild(button);
    button.addEventListener('click', function() {
        button.parentNode.removeChild(button);
        gridContainer.innerHTML = '';
        winnerPlayer.innerHTML = '';
        boxes = [];
        currentPlayer = 1;
        stopfunction = true;
        wonGame = false
        createGrid();
        game();
    });
}
