//Gameboard object
const GameBoard = () => {

    const x = new Array(3);

    const board = () => {
        
        for (let i = 0; i < x.length; i++) {
            x[i] = new Array(3);
            
        };
        console.log(x);
    };

    return {board};
}

//let game = gameBoard();


