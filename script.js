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
    let i = 0;
    const boardArray = ['', '', '', '', '', '','', '', ''];

    const create = boardArray.forEach(element => {
            const boardCell = document.createElement("div");
            boardCell.className = `cell`;
            boardCell.id = i;
            i++;
            board.appendChild(boardCell);
            boardCell.addEventListener("click", e => {
                if(e.target.textContent == ""){
                    let id = e.target.id;
                    gameBoard.boardArray[id] = playerMarker;
                    e.target.textContent = playerMarker;
                    e.target.classList.add(playerMarker);
                    aiPlaceMarker();
                    winner();
                }
            })
    })

    // const playerMarker = prompt("x or o");
    const playerMarker = 'x';

    let aiMarker;
    playerMarker == 'x' ? aiMarker = 'o': aiMarker = 'x';

    return {boardArray, create, playerMarker, aiMarker};
})();

function aiPlaceMarker(){
        let randomCell;
        let randomID;
        do{
            randomID = Math.floor(Math.random() * 9); 
            randomCell = document.getElementById(randomID);
        }while(randomCell.textContent != "")
        gameBoard.boardArray[randomID] = gameBoard.aiMarker;
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
        [0,1,2], 
        [3,4,5], 
        [6,7,8],
        [0,3,6], 
        [1,4,7], 
        [2,5,8],
        [0,4,8], 
        [2,4,6]
    ];
    //go through each array in winningCombo
    //once a value is added on the left column (a), 
    //check if marker values are the same while using winner indexes on the last 2 columns
    for (const arrays of winningCombo) {
        let [a,b,c] = arrays; //each letter corosponds to each arrays index
                              //a being index 0 of each array
        let board = gameBoard.boardArray;
        //if one of the board[a] indexes has a value 
        //check if the other columns with winning indexes text match
        if(board[a] && board[a] == board[b] && board[a] == board[c]){
            console.log('win');
        }
    }
}
