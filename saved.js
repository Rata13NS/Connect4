let gridContainer = document.getElementById("gridContainer");
let winnerPlayer = document.getElementById("statusWinner");
let winnerButton = document.getElementById("winnerButton");
let boxes = [];
let greenCells = [];
let redCells = [];
let userCounter = 1;
let buttonCounter = 0;
let stopfunction = true;
let lastCel;

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

function statusGame() {
    let startCel = 35;
    while (startCel >= 7) {
        for (let i = startCel; i <= startCel + 3; ++i) {
            let box1 = boxes[startCel].style.backgroundColor;
            let box2 = boxes[startCel + 1].style.backgroundColor;
            let box3 = boxes[startCel + 2].style.backgroundColor;
            let box4 = boxes[startCel + 3].style.backgroundColor;
            if (box1 === box2 && box3 === box4 && box1 === box4 && box1 != 'blue') {
                return showWinner();
            } else {
                startCel -= 7;
            }
        }

    }
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

function dropColor(index) {
    if (index % 7 === 0) {
        lastCel = 35;
        changeColor(lastCel);
    } else if ((index - 1) % 7 === 0) {
        lastCel = 36;
        changeColor(lastCel);
    } else if ((index - 2) % 7 === 0) {
        lastCel = 37;
        changeColor(lastCel);
    } else if ((index - 3) % 7 === 0) {
        lastCel = 38;
        changeColor(lastCel);
    } else if ((index - 4) % 7 === 0) {
        lastCel = 39;
        changeColor(lastCel);
    } else if ((index - 5) % 7 === 0) {
        lastCel = 40;
        changeColor(lastCel);
    } else if ((index - 6) % 7 === 0) {
        lastCel = 41;
        changeColor(lastCel);
    }
}

function changeColor(lastCel) {
    let columnCounter = 0;
    while (boxes[lastCel - columnCounter].style.backgroundColor != 'blue') {
        columnCounter += 7;
    }
    let lastColored = lastCel - columnCounter;
    if (userCounter === 1) {
        boxes[lastColored].style.backgroundColor = 'green';
        greenCells.push(lastColored);
        statusGame();
        userCounter = 2;
    } else {
        boxes[lastColored].style.backgroundColor = 'red';
        redCells.push(lastColored);
        statusGame();
        userCounter = 1; 
    }
}

function showWinner() {
    winnerPlayer.innerHTML = "Conglaturations to Player " + userCounter + "! You are the winner!";
    restartButton();
}
