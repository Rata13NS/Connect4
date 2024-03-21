let gridContainer = document.getElementById("gridContainer");
let winnerPlayer = document.getElementById("statusWinner");
let winnerButton = document.getElementById("winnerButton");
let boxes = [];
let currentPlayer = 1;
let buttonCounter = 0;
let stopfunction = true;
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
    if (index % 7 === 0) {
        lastCell = 35;
        changeColor(lastCell);
    } else if ((index - 1) % 7 === 0) {
        lastCell = 36;
        changeColor(lastCell);
    } else if ((index - 2) % 7 === 0) {
        lastCell = 37;
        changeColor(lastCell);
    } else if ((index - 3) % 7 === 0) {
        lastCell = 38;
        changeColor(lastCell);
    } else if ((index - 4) % 7 === 0) {
        lastCell = 39;
        changeColor(lastCell);
    } else if ((index - 5) % 7 === 0) {
        lastCell = 40;
        changeColor(lastCell);
    } else if ((index - 6) % 7 === 0) {
        lastCell = 41;
        changeColor(lastCell);
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
            for (let i = startCell; i <= startCell + 3; ++i) {
                let consecutiveBoxes = 1;
                consecutiveBoxesStatus(startCell, consecutiveBoxes)
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
                consecutiveBoxesStatus(startCell, consecutiveBoxes)
            }
            startCell -= 7;  
        }
    }
    //diagonala secundara
    let cellCounter = 12;
    for (let i = 35; i >= 21; i = i - 7) {
        startCell = i;
        while (startCell >= i - cellCounter) {
            for (let j = startCell; j >= startCell - 18; j = j - 6) {
                let consecutiveBoxes = -6;
                consecutiveBoxesStatus(startCell, consecutiveBoxes)
            }
            startCell -= 6; 
        }
        cellCounter -= 6;
    }
    cellCounter = 12;
    for (let i = 36; i <= 38; ++i) {
        startCell = i;
        while (startCell >= i - cellCounter) {
            for (let j = startCell; j >= startCell - 18; j = j - 6) {
                let consecutiveBoxes = -6;
                consecutiveBoxesStatus(startCell, consecutiveBoxes)
            }
            startCell -= 6; 
        }
        cellCounter -= 6;
    }
    //diagonala principala
    cellCounter = 16;
    for (let i = 1; i <= 3; ++i) {
        startCell = i;
        while (startCell <= i + cellCounter) {
            for (let j = startCell; j <= startCell + 24; j = j + 8) {
                let consecutiveBoxes = 8;
                consecutiveBoxesStatus(startCell, consecutiveBoxes)
            }
            startCell += 8; 
        }
        cellCounter -= 8;
    }
    cellCounter = 16;
    for (let i = 0; i <= 14; i = i + 7) {
        startCell = i;
        while (startCell <= i + cellCounter) {
            for (let j = startCell; j <= startCell + 24; j = j + 8) {
                let consecutiveBoxes = 8;
                consecutiveBoxesStatus(startCell, consecutiveBoxes)
            }
            startCell += 8; 
        }
        cellCounter -= 8;
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
        createGrid();
        game();
    });
}

function consecutiveBoxesStatus(startCell, consecutiveBoxes) {
    let box1 = boxes[startCell].style.backgroundColor;
    let box2 = boxes[startCell + consecutiveBoxes].style.backgroundColor;
    let box3 = boxes[startCell + 2 * consecutiveBoxes].style.backgroundColor;
    let box4 = boxes[startCell + 3 * consecutiveBoxes + 2 * diferenceBetweenBoxes].style.backgroundColor;
    if (box1 === box2 && box3 === box4 && box1 === box4 && box1 != 'blue') {
        return showWinner();
    }
}
