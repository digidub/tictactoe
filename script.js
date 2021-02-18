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


const Player = (playerName, piece) => {

    const getName = () => playerName;
    const getPiece = () => piece;

    return {

        getName,
        getPiece

    };
}

const gameState = (() => {

    GameBoard.populate();

    let turn;

    let player1 = Player("Alex");
    let player2 = Player("Bob");
    let p1name = player1.getName()
    let p2name = player2.getName()
              
    const whoStarts = () => {

        let coinFlip = Math.round(Math.random());
        if (coinFlip === 0) return turn = p1name
        else return turn = p2name;

    };    

    let nextTurn = () => {

        if (turn == p1name) {
            turn = p2name            
        }
        else if (turn == p2name) {
            turn = p1name            
        }

    }

    return {

        whoStarts,        
        nextTurn,
        Player

    }

})();



