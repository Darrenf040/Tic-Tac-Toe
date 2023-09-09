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
        })
    })
    const add = board.addEventListener("click", e => {
        const p = document.createElement("p")
        p.className = "marker"
        p.textContent = playerMarker
        e.target.appendChild(p)
        // e.target.textContent = playerMarker;
    })
    const playerMarker = prompt("x or o");
    
    return {create, add, playerMarker};
})();
const player = (name="player") => {
    return {name};
}
function playGame(){
}