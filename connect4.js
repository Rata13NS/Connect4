let gridContainer = document.getElementById("gridContainer");
let winnerPlayer = document.getElementById("statusWinner");
let winnerButton = document.getElementById("winnerButton");
let boxes = [];
let userCounter = 1;
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
    if (userCounter === 1) {
        boxes[lastColored].style.backgroundColor = 'green';
        statusGame();
        userCounter = 2;
    } else {
        boxes[lastColored].style.backgroundColor = 'red';
        statusGame();
        userCounter = 1; 
    }
}

function statusGame() {
    //orizontala
    let startCell = 35;
    let copyStartCell = 35;
    while (startCell >= 0) {
        copyStartCell = startCell;
        while (startCell <= copyStartCell + 3) {
            for (let i = startCell; i <= startCell + 3; ++i) {
                let box1 = boxes[startCell].style.backgroundColor;
                let box2 = boxes[startCell + 1].style.backgroundColor;
                let box3 = boxes[startCell + 2].style.backgroundColor;
                let box4 = boxes[startCell + 3].style.backgroundColor;
                if (box1 === box2 && box3 === box4 && box1 === box4 && box1 != 'blue') {
                    return showWinner();
                }
            }
            ++startCell;
        }
        startCell -= 11;
    }
    //verticala
    for (let i = 35; i <= 41; ++i) {
        startCell = i;
        while (startCell >= i - 14) {
            for (let j = startCell; j >= startCell - 21; j = j - 7) {
                let box1 = boxes[startCell].style.backgroundColor;
                let box2 = boxes[startCell - 7].style.backgroundColor;
                let box3 = boxes[startCell - 14].style.backgroundColor;
                let box4 = boxes[startCell - 21].style.backgroundColor;
                if (box1 === box2 && box3 === box4 && box1 === box4 && box1 != 'blue') {
                    return showWinner();
                }
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
                let box1 = boxes[startCell].style.backgroundColor;
                let box2 = boxes[startCell - 6].style.backgroundColor;
                let box3 = boxes[startCell - 12].style.backgroundColor;
                let box4 = boxes[startCell - 18].style.backgroundColor;
                if (box1 === box2 && box3 === box4 && box1 === box4 && box1 != 'blue') {
                    return showWinner();
                }
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
                let box1 = boxes[startCell].style.backgroundColor;
                let box2 = boxes[startCell - 6].style.backgroundColor;
                let box3 = boxes[startCell - 12].style.backgroundColor;
                let box4 = boxes[startCell - 18].style.backgroundColor;
                if (box1 === box2 && box3 === box4 && box1 === box4 && box1 != 'blue') {
                    return showWinner();
                }
            }
            startCell -= 6; 
        }
        cellCounter -= 6;
    }
    //diagonala principala
}

function showWinner() {
    winnerPlayer.innerHTML = "Conglaturations to Player " + userCounter + "! You are the winner!";
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
        userCounter = 1;
        stopfunction = true;
        createGrid();
        game();
    });
}
