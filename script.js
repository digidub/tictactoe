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

        for (let x = 0; x < board.length; x++) {

            for (let y = 0; y < board[x].length; y++) {
                _cell = document.createElement("div");
                _cell.setAttribute('class', 'cell');
                _cell.setAttribute('id', `${board[x][y]}`)
                //_cell.innerHTML = board[x][y];
                _gameBoard.appendChild(_cell);

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

    return {

        getName,
        getPiece,
        setPiece

    };
}



const gameState = (() => {

    GameBoard.populate();

    let turn;

    let player1 = Player("Player 1");
    let player2 = Player("Player 2");
    let p1name = player1.getName()
    let p2name = player2.getName()
    let p1piece, p2piece;

    const board = document.querySelector(".board");

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
            return turn = p2name;
        }
        else if (turn == p2name) {
            turn = p1name
            return turn = p1name;
        }

    }

    board.onclick = function (e) {

        if (e.target.className == "cell") {
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
                    winCondition();
                } else return;
            };
        }
        else return;
    }

    function winCondition() {
        if (diagUp() || diagDown() || allXequal(MakeGame.board) || allYequal()) {
            console.log(`${turn} wins!`)
            return;
        }
        else return;
    };

    const diagUp = function () {
        return ((MakeGame.board[0][0] == MakeGame.board[1][1]) && (MakeGame.board[0][0] == MakeGame.board[2][2]))
    }

    const diagDown = function () {
        return ((MakeGame.board[0][2] == MakeGame.board[1][1]) && (MakeGame.board[0][2] == MakeGame.board[2][0]))
    }

    const allXequal = array => array.every(value => value === array[0]);

    const allYequal = function () {
        for (i = 0; i < MakeGame.board[0].length; i++) {
            if (MakeGame.board[0][i] == MakeGame.board[1][i] && MakeGame.board[0][i] == MakeGame.board[2][j]) {
                return true;
            }
            else return false;
        }
    }

    randomPiece();
    whoStarts();

    return {

        nextTurn,
        Player,
        winCondition,

    }



})();



let myarr = [1, 1, 1]

const allEqual = arr => arr.every(val => val === arr[0]);
const result = allEqual(myarr);

