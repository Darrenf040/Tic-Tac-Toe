// const gameBoard = [
//     ['', '', ''],
//     ['', '', ''],
//     ['', '', '']
// ];
// console.log(gameBoard);

// const fillBoard = gameBoard.map((row) => {
//     return row.map(cell => {
//         return cell = "x";
//     });
// });
// console.log(fillBoard);

const body = document.querySelector("body");


const gameBoard = (() => {
const board = document.querySelector(".board");
    const empty = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const create = empty.forEach((row, rowIndex)=> {
        row.forEach((cell, cellIndex) => {
            const boardCell = document.createElement("div");
            boardCell.className = `cell row${rowIndex + 1} col${cellIndex + 1}`;
            board.appendChild(boardCell);
            boardCell.addEventListener("click", e => {
                if(e.target.textContent == ""){
                    e.target.textContent = playerMarker;
                    aiPlaceMarker();
                }
            })
        })
    })

    const playerMarker = prompt("x or o");

    let aiMarker;
    playerMarker == 'x' ? aiMarker = 'o': aiMarker = 'x';

    return {create, playerMarker, aiMarker};
})();
const player = (name="player") => {
    return {name};
}
function aiPlaceMarker(){
        let randomCell;
        do{
            const rowNumber = Math.floor(1 + Math.random () * 3);
            const colNumber = Math.floor(1 + Math.random () * 3);    
            randomCell = document.querySelector(`.row${rowNumber}.col${colNumber}`)
        }while(randomCell.textContent != "" || gameBoard.i > 4)
        console.log(gameBoard.i);
        randomCell.textContent = gameBoard.aiMarker;
}

const playerTurn = (() => {
    const chooseTurn = [true, false];
    const odd = gameBoard.i % 2 == 1;
    const playerTurn = chooseTurn[Math.floor(Math.random() * 2)];
    console.log(playerTurn);
    if(playerTurn){
        return;
    }
    else{
        aiPlaceMarker();
    }
})();