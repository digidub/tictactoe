//Gameboard object - module
const Game = (() => {

    const x = new Array(3);

    const board = () => {

        for (let i = 0; i < x.length; i++) {
            x[i] = new Array(3);

        };
        console.log(x);
    };

    return {

        board

    };

})();

//Player Object
const Player = (name) => {

    const sayName = () => console.log(`my name is ${name}`)

    return { sayName };
}


const populateBoard = (() => {

    const testy = () => {
        console.log(this)
    }

    const _gameBoard = document.querySelector('.board')
    let _cell = ""; 
       

    const populate = () => {
        for (let i = 0; i < 9; i++) {
            _cell = document.createElement("div")
            _cell.setAttribute('class', 'cell'); 
            _gameBoard.appendChild(_cell);
        }
    }

    return {
        populate,
        testy
    }

})();

