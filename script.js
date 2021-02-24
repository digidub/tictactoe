//Module to produce the game board array
const MakeGame = (() => {

    let board = [];

    function boardFunc() {
        board = new Array(3);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(3);
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = `${i}${j}`;
            };
        };
        return this.board = board;
    };

    return {

        board,
        boardFunc

    };
})();

//uses the MakeGame module to produce the HTML elements using the game board array
const GameBoard = (() => {

    let _cell;
    let board = "";
    let _gameBoard;

    const populate = () => {

        if (board == "") {
            board = MakeGame.boardFunc();
            _gameBoard = document.querySelector('.board')
            populateLoop("cell-hidden");
        }
        else {
            _gameBoard.innerHTML = "";
            board = MakeGame.boardFunc();
            populateLoop("cell-shown");
        }
    }

    const populateLoop = (gameState) => {
        for (let x = 0; x < board.length; x++) {

            for (let y = 0; y < board[x].length; y++) {
                _cell = document.createElement("div");
                _cell.setAttribute('class', `${gameState}`);
                _cell.setAttribute('id', `${board[x][y]}`);
                _gameBoard.appendChild(_cell);
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
                    console.log(freeSpaceArray);
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
        GameBoard.populate();
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
        MakeGame.board[splitValueX][splitValueY] = piece;
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
                GameBoard.populate();
            }
            else {
                player2.addPoint();
                updateScore('player2', player2.getScore())
                turnTally = 0;
                GameBoard.populate();
            }

            return;
        }
        else if (turnTally > 7) {
            GameBoard.populate();
            turnTally = 0;
            return;
        }
        return;
    };

    const diagUpEqual = () => ((MakeGame.board[0][0] === MakeGame.board[1][1]) && (MakeGame.board[0][0] === MakeGame.board[2][2]))

    const diagDownEqual = () => ((MakeGame.board[0][2] === MakeGame.board[1][1]) && (MakeGame.board[0][2] === MakeGame.board[2][0]))

    const rowEqual = function () {
        for (i = 0; i < MakeGame.board.length; i++) {
            if (xCheck(MakeGame.board[i])) {
                return true;
            }
        }
        return false;
    }

    const columnEqual = function () {
        for (i = 0; i < MakeGame.board[0].length; i++) {
            if ((MakeGame.board[0][i] === MakeGame.board[1][i]) && (MakeGame.board[0][i] === MakeGame.board[2][i])) {
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

