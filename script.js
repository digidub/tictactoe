//Module to produce the underlying game board array
const GameBoard = (() => {

    let arr = [];

    function buildArr() {
        arr = new Array(3);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(3);
            for (let j = 0; j < arr[i].length; j++) {
                arr[i][j] = `${i}${j}`;
            };
        };
        return this.arr = arr;
    };

    function resetArr() {
        this.arr = [];
        this.arr = buildArr();
    };

    return {
        arr,
        buildArr,
        resetArr
    };
})();

//uses the GameBoard module to produce the HTML elements using the game board array
const GameDOM = (() => {

    let _boardArr, _gameBoardDiv;

    const populate = () => {

        if (GameBoard.arr.length === 0) { //checks to see whether game board array already exists
            _boardArr = GameBoard.buildArr(); //makes it if it doesnt
            _gameBoardDiv = document.querySelector('.board')
            populateLoop("cell-hidden");
        }
        else { //if it does already exist
            _gameBoardDiv.innerHTML = ""; //reset the GameBoard DOM element
            _boardArr = GameBoard.resetArr(); //recreate the gameboard array
            populateLoop("cell-shown");
        }
    }

    const populateLoop = (gameState) => {
        for (let i = 0; i < _boardArr.length; i++) {
            for (let j = 0; j < _boardArr[i].length; j++) {
                let _cell = document.createElement("div");
                _cell.setAttribute('class', `${gameState}`);
                _cell.setAttribute('id', `${_boardArr[i][j]}`);
                _gameBoardDiv.appendChild(_cell);
            }
        }
    }



    return {
        populate,
    }
})();


//Player object used for storing and retreiving player's name, piece, score
const Player = (playerName) => {

    let score = 0;

    const getName = () => playerName;
    const getScore = () => score;

    function getPiece() {
        return this.piece;
    }

    function setPiece(piece) {
        this.piece = piece;
        return this.piece;
    }

    function setName(playerName) {
        this.name = playerName;
        return this.name;
    }

    function addPoint() {
        score++
        return score;
    }

    function emptySpace() {
        const freeSpaceArray = [];
        for (i = 0; i < MakeGame.board.length; i++) {
            for (j = 0; j < MakeGame.board[i].length; j++) {
                if ((MakeGame.board[i][j] != "X") && (MakeGame.board[i][j] != "O")) {
                    freeSpaceArray.push(MakeGame.board[i][j]);
                }
            }
        }
        return freeSpaceArray;
    }


    return {

        setName,
        setPiece,
        getName,
        getPiece,
        getScore,
        addPoint,
        emptySpace

    };
}


//controls the state of the game, including: whose turn, total turns so far, how turns are displayed, the display of the board, checking to see if a player has won, and resetting the board.
const gameState = (() => {

    let turn;
    let turnTally = 0
    let p1name, p2name, p1piece, p2piece;

    const p1nameDisplay = document.querySelector(".player1-name");
    const p2nameDisplay = document.querySelector(".player2-name");
    const board = document.querySelector(".board");
    const startDiv = document.querySelector(".new-game-form-shown");

    const startButton = document.querySelector(".start");
    const scoreBoard = document.querySelectorAll(".player-hidden")

    function showScoreBoard() {
        for (let i = 0; i < scoreBoard.length; i++) {
            scoreBoard[i].classList.add("player-shown")
            scoreBoard[i].classList.remove("player-hidden")
        }
    }

    function showBoard() {
        let grid = board.querySelectorAll(".cell-hidden");
        for (i = 0; i < grid.length; i++) {
            grid[i].classList.add("cell-shown");
            grid[i].classList.remove("cell-hidden");
        }
    }

    function hideStartScreen() {
        startDiv.classList.add("new-game-form-hidden")
        startDiv.classList.remove("new-game-form-shown")
        const startDivHidden = document.querySelector(".new-game-form-hidden");
        removeStart(startDivHidden);
    }

    const promiseTransition = (div, property, value) =>
        new Promise(resolve => {
            div.style[property] = value;
            const transitionEnded = e => {
                if (e.propertyName !== property) return;
                div.removeEventListener('transitionend', transitionEnded);
                resolve();
            }
            div.addEventListener('transitionend', transitionEnded);
        });

    async function removeStart(startDivHidden) {
        await promiseTransition(startDivHidden, "opacity", "0");
        startDivHidden.remove();
        GameDOM.populate();
        setTimeout(showBoard, 1);
    }

    startButton.onclick = function () {
        let p1text = document.querySelector(`[name="player1-name"]`).value;
        let p2text = document.querySelector(`[name="player2-name"]`).value;
        if (p1text != "") {
            player1 = Player(p1text)
        } else if (p1text == "") {
            player1 = Player("Player 1")
        };
        if (p2text != "") {
            player2 = Player(p2text)
        } else if (p2text == "") {
            player2 = Player("Player 2")
        };
        p1name = player1.getName();
        p2name = player2.getName();
        p1nameDisplay.innerHTML = `<h2>${player1.getName()}</h2>`
        p2nameDisplay.innerHTML = `<h2>${player2.getName()}</h2>`
        hideStartScreen();
        showScoreBoard();
        randomPiece();
        whoStarts();
        activeTurn();
        return;
    }


    const randomPiece = () => {

        let coinFlip = Math.round(Math.random());
        if (coinFlip === 0) {
            p1piece = player1.setPiece("X");
            p2piece = player2.setPiece("O");
            displayPlayerPiece(p1piece, p2piece);
            return;
        } else {
            p1piece = player1.setPiece("O");
            p2piece = player2.setPiece("X");
            displayPlayerPiece(p1piece, p2piece);
            return;
        }
    }

    const displayPlayerPiece = (p1, p2) => {
        const p1pieceDiv = document.querySelector(".player1-piece")
        const p2pieceDiv = document.querySelector(".player2-piece")
        p1pieceDiv.innerHTML = `<button class="${p1}" role="radio" type="button">${p1}</button>`
        p2pieceDiv.innerHTML = `<button class="${p2}" role="radio" type="button">${p2}</button>`
    }

    const whoStarts = () => {

        let coinFlip = Math.round(Math.random());
        if (coinFlip === 0) return turn = p1name
        else return turn = p2name;

    };

    const nextTurn = () => {

        if (turn == p1name) {
            turn = p2name
            turnTally++
            turn = p2name;
        }
        else if (turn == p2name) {
            turn = p1name
            turnTally++
            turn = p1name;
        }
        activeTurn();
        return turn;
    }

    board.onmouseover = function (e) {
        if (e.target.className == "cell-shown") {

            if (turn == p1name) {
                if (player1.getPiece() == "X") {
                    e.target.classList.add('cell-hover-pink')
                } else e.target.classList.add('cell-hover-green')
            }
            else if (turn == p2name) {
                if (player2.getPiece() == "X") {
                    e.target.classList.add('cell-hover-pink')
                } else e.target.classList.add('cell-hover-green')
            }
        }
        else return;
    }

    board.onmouseout = function (e) {
        e.target.classList.remove('cell-hover-pink');
        e.target.classList.remove('cell-hover-green')
        return;
    };

    board.onclick = function (e) {
        if ((e.target.className == "cell-shown cell-hover-pink") || (e.target.className == "cell-shown cell-hover-green")) {
            if (!e.target.innerHTML) {
                if (turn == p1name) {
                    placePiece(e, p1piece);
                }
                else placePiece(e, p2piece)
            }
        }
        else return;
    }

    function placePiece(e, piece) {
        gameArrayIndex = e.target.attributes.id.value;
        splitIndexValue = gameArrayIndex.split("");
        splitValueX = gameArrayIndex[0];
        splitValueY = gameArrayIndex[1];
        GameBoard.arr[splitValueX][splitValueY] = piece;
        e.target.innerHTML = piece;
        if (turnTally > 3) {
            winCondition();

        }
        nextTurn();
    }

    function winCondition() {
        if (diagUpEqual() || diagDownEqual() || rowEqual() || columnEqual()) {
            if (turn == p1name) {
                player1.addPoint();
                updateScore('player1', player1.getScore());
                turnTally = 0;
                GameDOM.populate();
            }
            else {
                player2.addPoint();
                updateScore('player2', player2.getScore())
                turnTally = 0;
                GameDOM.populate();
            }

            return;
        }
        else if (turnTally > 7) {
            GameDOM.populate();
            turnTally = 0;
            return;
        }
        return;
    };

    const diagUpEqual = () => ((GameBoard.arr[0][0] === GameBoard.arr[1][1]) && (GameBoard.arr[0][0] === GameBoard.arr[2][2]))

    const diagDownEqual = () => ((GameBoard.arr[0][2] === GameBoard.arr[1][1]) && (GameBoard.arr[0][2] === GameBoard.arr[2][0]))

    const rowEqual = function () {
        for (i = 0; i < GameBoard.arr.length; i++) {
            if (xCheck(GameBoard.arr[i])) {
                return true;
            }
        }
        return false;
    }

    const columnEqual = function () {
        for (i = 0; i < GameBoard.arr[0].length; i++) {
            if ((GameBoard.arr[0][i] === GameBoard.arr[1][i]) && (GameBoard.arr[0][i] === GameBoard.arr[2][i])) {
                return true;
            }
        }
        return false;
    }

    const xCheck = arr => arr.every(val => val === arr[0]);

    const updateScore = (player, score) => {
        const scoreDiv = document.querySelector(`.${player}-score`)
        scoreDiv.innerText = score;
        return;
    }

    const activeTurn = () => {
        const p1board = document.querySelector(".player1-info")
        const p2board = document.querySelector(".player2-info")
        if (turn == p1name) {
            p1board.classList.remove("inactive")
            p2board.classList.add("inactive")
        } else {
            p2board.classList.remove("inactive")
            p1board.classList.add("inactive")
        }
    }

})();



//testing AI:

let origBoard = [
    [00, 01, 02],
    [10, "O", 12],
    [20, 21, 22],
]

let huPlayer = "O";
let aiPlayer = "X";

//creates 2D array of available spaces to play
function emptySpace(arr) {
    const freeSpaceArray = [];
    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr[i].length; j++) {
            if ((arr[i][j] != "X") && (arr[i][j] != "O")) {
                freeSpaceArray.push(arr[i][j]);
            }
        }
    }
    return freeSpaceArray;
}


//checks 3D array for a winner
function checkWinner(board, player) {

    const diagUpEqual = (player, board) => ((board[0][0] === player) && (board[0][0] === board[1][1]) && (board[0][0] === board[2][2]));

    const diagDownEqual = (player, board) => ((board[0][2] === player) && (board[0][2] === board[1][1]) && (board[0][2] === board[2][0]));

    const rowEqual = function (player, board) {
        for (i = 0; i < board.length; i++) {
            if (xCheck(board[i], player)) {
                return true;
            }
        }
        return false;
    }

    const xCheck = (board, player) => board.every(val => val === player);

    const columnEqual = function (player, board) {
        for (i = 0; i < board[0].length; i++) {
            if ((board[0][i] === player) && (board[0][i] === board[1][i]) && (board[0][i] === board[2][i])) {
                return true;
            }
        }
        return false;
    }

    if ((diagUpEqual(player, board)) || (diagDownEqual(player, board)) || (rowEqual(player, board)) || (columnEqual(player, board))) {
        return true
    }
    else return false;

}

let bestSpot = minimax(origBoard, aiPlayer)
console.log("index:" + bestSpot.index)




//minimax function
function minimax(newBoard, player, depth = 0) {

    let availSpots = emptySpace(origBoard);

    if (checkWinner(newBoard, huPlayer)) {
        return { score: depth - 100 };
    } else if (checkWinner(newBoard, aiPlayer)) {
        return { score: 100 - depth };
    } else if (availSpots.length == 0) {
        return { score: 0 };
    }

    let moves = [];

    for (let i = 0; i < availSpots.length; i++) {

        let move = {};

        //check co-ordinates of board 
        if (availSpots[i] < 4) {
            move.index = newBoard[0][availSpots[i]]
            newBoard[0][availSpots[i]] = player
        } else {
            splitCoOrds = availSpots[i].toString().split("");
            let xCoOrd = splitCoOrds[0]
            let yCoOrd = splitCoOrds[1]
            move.index = newBoard[xCoOrd][yCoOrd]
            newBoard[xCoOrd][yCoOrd] = player
        };

        //recursive function call
        if (player == aiPlayer) {
            result = minimax(newBoard, huPlayer, depth + 1);
            move.score = result.score;
        } else {
            result = minimax(newBoard, aiPlayer, depth + 1);
            move.score = result.score;
        };

        //test to reset the board position to empty depending on coordinates
        if (availSpots[i] < 4) {
            newBoard[0][availSpots[i]] = move.index
        }
        else {
            let splitCoOrds2 = availSpots[i].toString().split("");
            let xCoOrd = splitCoOrds2[0];
            let yCoOrd = splitCoOrds2[1];
            newBoard[xCoOrd][yCoOrd] = move.index
        };

        moves.push(move);


    }
    let bestMove;
    if (player === aiPlayer) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {

        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];

}

