//Module to produce the game board array
const MakeGame = (() => {

    const x = new Array(3);
    const board = () => {
        for (let i = 0; i < x.length; i++) {
            x[i] = new Array(3);
            for (let j = 0; j < x[i].length; j++) {
                x[i][j] = "" + i + j;
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

//Player Object factory - name of player, type (human/AI), color, and piece (O or X)
const Player = (name, piece) => {

    const getName = () => name;
    let getPiece = () => piece;

    return {
        getName,
        getPiece
    };
}

GameBoard.populate();
