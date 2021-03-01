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
    };

    return {
        arr,
        buildArr,
        resetArr
    };
})();

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