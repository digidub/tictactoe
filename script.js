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

//Player Object
const Player = (name) => {

    const sayName = () => console.log(`my name is ${name}`)
    return {sayName};    
}
