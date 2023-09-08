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
    const empty = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    const create = empty.forEach(row => row.forEach(cell =>{
        boardCell = document.createElement("div")
        boardCell.className = "cell";
        body.appendChild(boardCell);
    }))
    return {empty, create};
})();
