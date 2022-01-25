'use strict';
const WALL = '⬜️';
const FOOD = '.';
const EMPTY = ' ';
const SUPERFOOD = '🍔';
const CHERRY = '🍒';

var audioEat = new Audio('audio/eat food.wav');
var audioLose = new Audio('audio/lose.wav');
var audioVictory = new Audio('audio/win game.wav');


var gBoard;
var gGame = {
    score: 0,
    isOn: false
};
var gFoodCount = 0;
// var gCherryInterval;
var gCherryOnBoard = false


function init() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
    gFoodCount = 0;
    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    gGame.score = 0;
    setInterval(addCherry, 15000);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var cell = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                cell = WALL;
            } else
                gFoodCount++;
            board[i][j] = cell;
        }
    }
    gFoodCount--;

    board[1][1] = SUPERFOOD;
    board[8][1] = SUPERFOOD;
    board[1][8] = SUPERFOOD;
    board[8][8] = SUPERFOOD;
    gFoodCount -= 4;

    return board;
}

function addCherry() {
    if (!gCherryOnBoard) {
        var pos = getEmptyPos();
        if (!pos) return;
        gBoard[pos.i][pos.j] = CHERRY;
        renderCell(pos, CHERRY);
        gCherryOnBoard = true
    }
}

// update model and dom
function updateScore(diff) {
    // model
    gGame.score += diff;

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;

}

function gameOver() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    var elModal = document.querySelector('.modal');
    var elGameOver = document.querySelector('.modal .game-over');
    if (gFoodCount === 0) {
        audioVictory.play();
        elGameOver.innerText = 'victory!🥳';
    } else {
        audioLose.play();
        elGameOver.innerText = 'Lose!😭';
    }
    elModal.style.display = 'inline-block';


}