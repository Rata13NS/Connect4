let gridContainer = document.getElementById("gridContainer");
let winnerPlayer = document.getElementById("statusWinner");
let winnerButton = document.getElementById("winnerButton");
let boxes = [];
let currentPlayer = 1;
let buttonCounter = 0;
let stopfunction = true;
let wonGame = false;
let lastCell;
let four = 4;
let five = 5;
let six = 6;
let seven = 7;

function createGrid() {
    for (let i = 0; i < six; i++) {
        let row = document.createElement('div');
        row.className = "row";
        for (let j = 0; j < seven; j++) {
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
    for (let i = 0; i <= six; ++i) {
        if ((index - i) % seven === 0) {
            lastCell = i + five * seven;
            return changeColor(lastCell);
        }
    }
}

function changeColor(lastCell) {
    let columnCounter = 0;
    while (boxes[lastCell - columnCounter].style.backgroundColor != 'blue') {
        columnCounter += seven;
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
    for (let i = five * seven; i >= 0; i = i - seven) {
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
        startCell -= seven;
    }
    //verticala
    for (let i = five * seven; i <= 41; ++i) {
        startCell = i;
        while (startCell >= i - seven * 2) {
            for (let j = startCell; j >= startCell - seven * 3; j = j - seven) {
                let consecutiveBoxes = -seven;
                consecutiveBoxesStatus(startCell, consecutiveBoxes);
                if (wonGame === true) {
                    return showWinner();
                }
            }
            startCell -= seven;  
        }
    }
    //diagonala principala
    let i;
    let cellCounter = four * four;
    for (i = 1; i <= 3; ++i) {
        mainDiagonal(i);
        if (wonGame === true) {
            return showWinner();
        }
    }
    cellCounter = four * four;
    for (i = 0; i <= seven * 2; i = i + seven) {
        mainDiagonal(i);
        if (wonGame === true) {
            return showWinner();
        }
    }
    function mainDiagonal(i) {
        startCell = i;
        while (startCell <= i + cellCounter) {
            for (let j = startCell; j <= startCell + four * six; j = j + four * 2) {
                let consecutiveBoxes = four * 2;
                consecutiveBoxesStatus(startCell, consecutiveBoxes);
            }
            startCell += four * 2; 
        }
        cellCounter -= four * 2;
    }
    //diagonala secundara
    cellCounter = six * 2;
    for (i = five * seven; i >= seven * 3; i = i - seven) {
        secondaryDiagonal(i);
        if (wonGame === true) {
            return showWinner();
        }
    }
    cellCounter = six * 2;
    for (i = six * six; i <= six * six + 2; ++i) {
        secondaryDiagonal(i);
        if (wonGame === true) {
            return showWinner();
        }
    }
    function secondaryDiagonal(i) {
        startCell = i;
        while (startCell >= i - cellCounter) {
            for (let j = startCell; j >= startCell - four * four + 2; j = j - six) {
                let consecutiveBoxes = -six;
                consecutiveBoxesStatus(startCell, consecutiveBoxes);
            }
            startCell -= six; 
        }
        cellCounter -= six;
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
