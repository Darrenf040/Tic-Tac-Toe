const gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
console.log(gameBoard);

const fillBoard = gameBoard.map((row) => {
    return row.map(cell => {
        return cell = "x";
    });
});
console.log(fillBoard);