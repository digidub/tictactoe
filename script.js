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
        return this.arr = arr;
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
    let p1name, p2name, p1piece, p2piece, p2type
    let winner = "";

    const p1nameDisplay = document.querySelector(".player1-name");
    const p2nameDisplay = document.querySelector(".player2-name");
    const board = document.querySelector(".board");
    const startDiv = document.querySelector(".new-game-form-shown");

    const startButton = document.querySelector(".start");
    const scoreBoard = document.querySelectorAll(".player-hidden")

    startButton.onclick = function () {
        let p1text = document.querySelector(`[name="player1-name"]`).value;
        let p2text = document.querySelector(`[name="player2-name"]`).value;
        p2type = document.querySelector('input[name="type2"]:checked').value;
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
        player1.num = "player1";
        player2.num = "player2";
        p1nameDisplay.innerHTML = `<h2>${player1.getName()}</h2>`
        p2nameDisplay.innerHTML = `<h2>${player2.getName()}</h2>`
        hideStartScreen();
        showScoreBoard();
        randomPiece();
        setTimeout(whoStarts, 500);
        activeTurn();
        return;
    }

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

    const displayPlayerPiece = (p1, p2) => {
        const p1pieceDiv = document.querySelector(".player1-piece")
        const p2pieceDiv = document.querySelector(".player2-piece")
        p1pieceDiv.innerHTML = `<button class="${p1}" role="radio" type="button">${p1}</button>`
        p2pieceDiv.innerHTML = `<button class="${p2}" role="radio" type="button">${p2}</button>`
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

    const whoStarts = () => {
        let coinFlip = Math.round(Math.random());
        if (coinFlip === 0) {
            turn = p1name;
            activeTurn();
            return turn;
        }
        else if (p2type == "AI") {
            turn = p2name
            activeTurn();
            AImove();
        } else return turn = p2name;
    };

    const nextTurn = () => {
        if (turn == p1name) {
            turn = p2name
            if (p2type == "AI") AImove();
        }
        else if (turn == p2name) {
            turn = p1name
        }
        activeTurn();
        return turn;
    }

    board.onmouseover = function (e) {
        if (e.target.className == "cell-shown") {
            if (turn == p1name) {
                if (player1.getPiece() == "X") {
                    e.target.classList.add('cell-hover-X')
                } else e.target.classList.add('cell-hover-O')
            }
            else if ((turn == p2name) && (p2type == "human")) {
                if (player2.getPiece() == "X") {
                    e.target.classList.add('cell-hover-X')
                } else e.target.classList.add('cell-hover-O')
            }
        }
        else return;
    }

    board.onmouseout = function (e) {
        e.target.classList.remove('cell-hover-X');
        e.target.classList.remove('cell-hover-O')
        return;
    };

    board.onclick = function (e) {
        if ((winner == "") && ((e.target.className == "cell-shown cell-hover-X") || (e.target.className == "cell-shown cell-hover-O"))) {
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
        turnTally++
        if (turnTally > 4) {
            if (winCondition()) {
                whoStarts();
                return;
            };
        };
        nextTurn();
    }

    const AImove = () => {
        if (turnTally > 8) return;
        let AIbestMove = minimax(GameBoard.arr, p2piece);
        AImoveCoOrds = AIbestMove.index.toString().split("");
        let xMove = AImoveCoOrds[0]
        let yMove = AImoveCoOrds[1]
        GameBoard.arr[xMove][yMove] = p2piece
        let placeDOM = document.getElementById(`${xMove}${yMove}`)
        placeDOM.innerHTML = p2piece
        turnTally++
        if (turnTally > 4) {
            if (winCondition()) {
                whoStarts();
                return;
            };
        };
        nextTurn();
    }

    function announceWinner(player) {
        let announceCell = document.getElementById("11")
        announceCell.innerHTML = `${player} wins!`
        winner = player        
        announceCell.onclick = function () {
            winner = "";
            GameDOM.populate();
            turnTally = 0;
            whoStarts()            
        }

    }

    function announceDraw() {
        let announceCell = document.getElementById("11")
        announceCell.innerHTML = `Tie! Nobody wins.`
        winner = "none"        
        announceCell.onclick = function () {
            winner = "";            
            GameDOM.populate();
            turnTally = 0;
            whoStarts();            
        }

    }    

    function winnerFound(player) {
        player.addPoint()
        updateScore(player.num, player.getScore());        
        announceWinner(turn);
    }

    function winCondition() {
        if (checkWinner(GameBoard.arr, p1piece)) {
            winnerFound(player1)
            return;            
        }
        else if (checkWinner(GameBoard.arr, p2piece)) {
            winnerFound(player2)
            return;
        };
        if (turnTally > 8) { //evaluates draw
            announceDraw();            
            return;
        }
    };

    function checkWinner(board, player, theory) {

        const diagDownEqual = (board, player) => {
            if ((board[0][0] === player) && (board[0][0] === board[1][1]) && (board[0][0] === board[2][2])) {
                if (theory !== "yes") {
                    for (let i = 0; i < 3; i++) {
                        let cell = document.getElementById(`${i}${i}`)
                        cell.classList.add(`cell-win-${player}`)
                    }
                    return true;
                }
                return true;
            }
        }

        const diagUpEqual = (board, player) => {
            if ((board[0][2] === player) && (board[0][2] === board[1][1]) && (board[0][2] === board[2][0])) {
                if (theory !== "yes") {
                    let cells = [];
                    cells.push(document.getElementById(`02`))
                    cells.push(document.getElementById(`11`))
                    cells.push(document.getElementById(`20`))
                    for (let i = 0; i < 3; i++) {
                        cells[i].classList.add(`cell-win-${player}`)
                    }
                    return true;
                }
                return true;
            }
        }

        const rowEqual = function (board, player) {
            const xCheck = (board, player) => board.every(val => val === player);
            for (i = 0; i < board.length; i++) {
                if (xCheck(board[i], player)) {
                    if (theory !== "yes") {
                        for (j = 0; j < board[i].length; j++) {
                            let cell = document.getElementById(`${i}${j}`)
                            cell.classList.add(`cell-win-${player}`)
                        }
                        return true;
                    }
                    return true;
                }
            }
            return false;
        }

        const columnEqual = function (board, player) {
            for (let i = 0; i < board[0].length; i++) {
                if ((board[0][i] === player) && (board[0][i] === board[1][i]) && (board[0][i] === board[2][i])) {
                    if (theory !== "yes") {
                        for (let j = 0; j < board[0].length; j++) {
                            let cell = document.getElementById(`${j}${i}`)
                            cell.classList.add(`cell-win-${player}`)
                        }
                        return true;
                    }
                    return true;
                }
            }
            return false;
        }

        if ((diagUpEqual(board, player)) || (diagDownEqual(board, player)) || (rowEqual(board, player)) || (columnEqual(board, player))) {
            return true
        }
        else return false;
    }

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

    //minimax function
    function minimax(newBoard, player, depth = 0) {        

        let availSpots = emptySpace(GameBoard.arr); 
        
        if (checkWinner(newBoard, p1piece, "yes")) {
            return { score: depth - 100 };
        } else if (checkWinner(newBoard, p2piece, "yes")) {
            return { score: 100 - depth };
        } else if (availSpots.length == 0) {
            return { score: 0 };
        }
        let moves = [];
        for (let i = 0; i < availSpots.length; i++) {
            let move = {};
            splitCoOrds = availSpots[i].toString().split("");
            let xCoOrd = splitCoOrds[0]
            let yCoOrd = splitCoOrds[1]
            move.index = newBoard[xCoOrd][yCoOrd]
            newBoard[xCoOrd][yCoOrd] = player

            //recursive function call
            if (player == p2piece) {
                result = minimax(newBoard, p1piece, depth + 1);
                move.score = result.score;
            } else {
                result = minimax(newBoard, p2piece, depth + 1);
                move.score = result.score;
            };

            //test to reset the board position to empty depending on coordinates            
            let splitCoOrds2 = availSpots[i].toString().split("");
            let xCoOrd2 = splitCoOrds2[0];
            let yCoOrd2 = splitCoOrds2[1];
            newBoard[xCoOrd2][yCoOrd2] = move.index
            moves.push(move);
        }

        let bestMove;

        if (player === p2piece) {
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

})();