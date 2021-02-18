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
    console.log(board);
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


const Player = (playerName, piece) => {

    const getName = () => playerName;
    //let getPiece = () => piece; IGNORE THIS FOR NOW

    return {
        getName,
        //getPiece
    };
}

const gameState = (() => {

    let turn;

    let player1 = Player("Alex");
    let player2 = Player("Bob");
              
    const whoStarts = () => {

        let coinFlip = Math.round(Math.random());
        if (coinFlip === 0) return turn = player1.getName()
        else return turn = player2.getName()
    };    

    let nextTurn = (turn) => {
        if (turn == player1.getName()) {
            turn = player2.getName()
        }
        else if (turn == player2.getName()) {
            turn = player1.getName()
        }
    }

    return {
        whoStarts,
        //whoseTurn,
        nextTurn,
        Player
    }

})();



GameBoard.populate();
