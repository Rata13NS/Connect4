let gridContainer = document.getElementById("gridContainer");
let winnerPlayer = document.getElementById("statusWinner");
let winnerButton = document.getElementById("winnerButton");
let boxes = [];
let userCounter = 1;
let buttonCounter = 0;
let stopfunction = true;

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
            neitherOneWon();
            statusGame();
          });
      });
}

function statusGame() {

}

function restartButton() {
    ++buttonCounter;
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
    let lastCel;
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
        lastCel = 41;
        changeColor(lastCel);
    } else if ((index - 6) % 7 === 0) {
        lastCel = 41;
        changeColor(lastCel);
    }
}

function changeColor(lastCel) {
    let colCounter = 0;
    while (boxes[lastCel - colCounter].style.backgroundColor != 'blue') {
        colCounter += 7;
    }
    if (userCounter === 1) {
        boxes[lastCel - colCounter].style.backgroundColor = 'green';
        userCounter = 2;
    } else {
        boxes[lastCel - colCounter].style.backgroundColor = 'red';
        userCounter = 1; 
    }
}
