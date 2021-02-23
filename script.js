//Module to produce the game board array
const MakeGame = (() => {

    const board = new Array(3);

    const boardFunc = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(3);
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = `${i}${j}`;
            };
        };
        return board;
    };

    return {

        board,
        boardFunc

    };
})();

//uses the MakeGame module to produce the HTML elements for the gameboard
const GameBoard = (() => {

    const board = MakeGame.boardFunc();
    const _gameBoard = document.querySelector('.board')
    let _cell;

    const populate = () => {

        let _grid = document.createElement("div");
        _grid.setAttribute('class', 'grid');
        _gameBoard.appendChild(_grid)

        for (let x = 0; x < board.length; x++) {

            for (let y = 0; y < board[x].length; y++) {
                _cell = document.createElement("div");
                _cell.setAttribute('class', 'cell-hidden');
                _cell.setAttribute('id', `${board[x][y]}`)
                _grid.appendChild(_cell);
            }
        }

    }

    return {
        populate,
    }
})();

const Player = (playerName) => {

    const getName = () => playerName;
    const getPiece = () => piece;

    function setPiece(piece) {
        this.piece = piece;
        return this.piece;
    }

    function setName(playerName) {
        this.name = playerName;
        return this.name;
    }

    return {

        setName,
        setPiece,
        getName,
        getPiece

    };
}

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
        return;
    }


    const randomPiece = () => {

        let coinFlip = Math.round(Math.random());
        if (coinFlip === 0) {
            p1piece = player1.setPiece("X");
            p2piece = player2.setPiece("O");
            return;
        } else {
            p1piece = player1.setPiece("O");
            p2piece = player2.setPiece("X");
            return;
        }
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
            return turn = p2name;
        }
        else if (turn == p2name) {
            turn = p1name
            turnTally++
            return turn = p1name;
        }

    }

    board.onclick = function (e) {

        if (e.target.className == "cell-shown") {
            if (turn == p1name) {
                if (!e.target.innerHTML) {
                    gameArrayIndex = e.target.attributes.id.value;
                    splitIndexValue = gameArrayIndex.split("");
                    splitValueX = gameArrayIndex[0];
                    splitValueY = gameArrayIndex[1];
                    MakeGame.board[splitValueX][splitValueY] = p1piece;
                    e.target.innerHTML = p1piece;
                    nextTurn();
                    if (winCondition() == true) { console.log("woo") };
                } else return;
            } else {
                if (!e.target.innerHTML) {
                    gameArrayIndex = e.target.attributes.id.value;
                    splitIndexValue = gameArrayIndex.split("");
                    splitValueX = gameArrayIndex[0];
                    splitValueY = gameArrayIndex[1];
                    MakeGame.board[splitValueX][splitValueY] = p2piece;
                    e.target.innerHTML = p2piece;
                    nextTurn();
                    if (turnTally > 3) winCondition();
                } else return;
            };
        }
        else return;
    }

    function winCondition() {
        if (diagUpEqual() || diagDownEqual() || rowEqual() || columnEqual()) {
            console.log(`${turn} wins!`)
            return;
        }
        else if (turnTally > 7) {
            console.log(`draw`)
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

    //randomPiece();
    //whoStarts();

    return {

        nextTurn,
        Player,
        winCondition,

    }



})();