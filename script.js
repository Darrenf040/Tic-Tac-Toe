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
    let i = 1;
    const empty = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const create = empty.forEach((row, rowIndex)=> {
        row.forEach((cell, cellIndex) => {
            const boardCell = document.createElement("div");
            boardCell.className = `cell`;
            boardCell.id = i;
            i++;
            board.appendChild(boardCell);
            boardCell.addEventListener("click", e => {
                if(e.target.textContent == ""){
                    e.target.textContent = playerMarker;
                    e.target.classList.add(playerMarker);
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

function aiPlaceMarker(){
        let randomCell;
        do{
            const randomID = Math.floor(1 + Math.random() * 9);   
            randomCell = document.getElementById(randomID);
        }while(randomCell.textContent != "")
        randomCell.classList.add(gameBoard.aiMarker);
        randomCell.textContent = gameBoard.aiMarker;
}

const playerTurn = (() => {
    const chooseTurn = [true, false];
    const playerTurn = chooseTurn[Math.floor(Math.random() * 2)];
    if(playerTurn){
        return;
    }
    else{
        aiPlaceMarker();
    }
})();

function winner(){
    const winningCombo = [
        [1,2,3], [4,5,6], [7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,9], [3,5,7]
    ];
}
