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

const gameBoard = (() => {
    const empty = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    const add = empty.map(row => {
        return row.map(cell => {
            return cell = "x";
        })
    })
    return {empty,add};
})();
console.log(gameBoard.empty)
console.log(gameBoard.add);