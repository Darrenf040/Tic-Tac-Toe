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
    const board = document.createElement("div");
    board.className = "board";
    body.appendChild(board);
    let i = 0;
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
                    i++;
                }
            })
        })
    })
    const playerMarker = prompt("x or o");
    const c = document.querySelectorAll(".row2");
    const p = document.querySelectorAll(".row3");
    c.forEach(cell => {
        cell.textContent = "x";
    })
    p.forEach(cell => {
        cell.textContent = "x";
    })

    return {create, playerMarker, i};
})();
const player = (name="player") => {
    return {name};
}
function playGame(){
    const chooseTurn = [true, false];
    let playerTurn = false;
    if(playerTurn == false){
        let randomCell;
        do{
            const rowNumber = Math.floor(1 + Math.random () * 3);
            const colNumber = Math.floor(1 + Math.random () * 3);    
            randomCell = document.querySelector(`.row${rowNumber}.col${colNumber}`)
        }while(randomCell.textContent != "")
        if(gameBoard.playerMarker == "x"){
            randomCell.textContent = "o";
        }
        else{
            randomCell.textContent = "x";
        }
    }

}
playGame();