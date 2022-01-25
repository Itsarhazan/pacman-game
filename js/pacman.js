'use strict';

var PACMAN = '<img width="40px" src="img/pacman.png">';
const PACMAN_LEFT = '<img width="40px" src="img/pacman-left.png">'
const PACMAN_RIGHT = '<img width="40px" src="img/pacman-right.png">'
const PACMAN_DOWN = '<img width="40px" src="img/pacman-down.png">'
const PACMAN_UP = '<img width="40px" src="img/pacman-up.png">'
var gIntervalId;

var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function getGhostByLoc(loc) {
    for (var i = 0; i < gGhosts.length; i++) {
        if ((gGhosts[i].location.i === loc.i) && (gGhosts[i].location.j === loc.j)) {
            return gGhosts[i];
        }
    }
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
    // return if cannot move
    if (nextCellContent === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCellContent === GHOST) {
        var currGhost = getGhostByLoc(nextLocation);
        handleGhost(currGhost);
    };
    if (nextCellContent === SUPERFOOD) {
        if (gPacman.isSuper) return;
        makeSuper();
    }
    if (nextCellContent === FOOD) collectFood();
    if (nextCellContent === CHERRY) {
        updateScore(10);
        gCherryOnBoard = false
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN);
}

function makeSuper() {
    gPacman.isSuper = true;
    setTimeout(resetGhosts, 5000);
}

function collectFood() {
    audioEat.play();
    updateScore(1);
    gFoodCount--;
    console.log(gFoodCount);
    if (gFoodCount === 0) gameOver();
}


function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };
    // figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            PACMAN = PACMAN_DOWN
            nextLocation.i++;
            break;
        case 'ArrowUp':
            PACMAN = PACMAN_UP
            nextLocation.i--;
            break;
        case 'ArrowLeft':
            PACMAN = PACMAN_LEFT
            nextLocation.j--;
            break;
        case 'ArrowRight':
            PACMAN = PACMAN_RIGHT
            nextLocation.j++;
            break;
    }

    return nextLocation;
}