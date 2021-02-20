//Module to produce the game board array
const MakeGame = (() => {

    const x = new Array(3);

    const board = () => {
        for (let i = 0; i < x.length; i++) {
            x[i] = new Array(3);
            for (let j = 0; j < x[i].length; j++) {
                x[i][j] = `${i}${j}`;
            };
        };
        return x;
    };

    return {

        board

    };
})();

//uses the MakeGame module to produce the HTML elements for the gameboard
const GameBoard = (() => {

    const board = MakeGame.board();
    const _gameBoard = document.querySelector('.board')
    let _cell;

    const populate = () => {

        for (let x = 0; x < board.length; x++) {

            for (let y = 0; y < board[x].length; y++) {
                _cell = document.createElement("div");
                _cell.setAttribute('class', 'cell');
                _cell.setAttribute('id', `${board[x][y]}`)
                _cell.innerHTML = board[x][y];
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

    const checkPiece = () => {
        return console.log(`${p1name}: ${p1piece}, ${p2name}: ${p2piece}`);
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
                e.target.innerHTML = p1piece;
                nextTurn()
            } else {
                e.target.innerHTML = p2piece;
                nextTurn()
            };
        }
        else return;        
    }

    return {

        whoStarts,
        nextTurn,
        Player,
        randomPiece,
        checkPiece,

    }

})();



