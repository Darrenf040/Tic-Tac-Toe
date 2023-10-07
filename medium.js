const body = document.querySelector("body");


const gameBoard = (() => {
    let unbeatable = true;
    const board = document.querySelector(".board");
    let i = 0;
    //array with values 0 - 8 to represent board placement
    const boardArray = [0, 1, 2, 3, 4, 5,6,7,8]

    const create = boardArray.forEach(element => {
            const boardCell = document.createElement("div");
            boardCell.className = `cell`;
            boardCell.id = i;
            i++;
            board.appendChild(boardCell);
            boardCell.addEventListener("click", e => {
                if(e.target.textContent == ""){
                    //add text to board & update array with player/ai markers
                    let id = e.target.id;
                    gameBoard.boardArray[id] = playerMarker;
                    e.target.textContent = playerMarker;
                    e.target.classList.add(playerMarker, 'transition-text');

                    const win = winner();
                    //after user places marker, ai places 
                    console.log(unbeatable);
                    if(!win.isWinner && !win.tie){
                        if(unbeatable){
                            placeAiMarker();
                            unbeatable = false;
                        }
                        else {
                            aiRandomPlaceMarker();
                            unbeatable = true
                        }
                    }
                }
                
                //Reset board and dispaly Tie/win message
                const win = winner();
                if(win.isWinner || win.tie){
                    if(win.tie && !win.isWinner){
                        win.msgContainer.textContent = 'Tie';
                    }
                    else if(win.playerWin() == false){
                        win.msgContainer.textContent = 'You Lose';
                    }
                    const res = reset();
                    res.popup.showModal();
                    res.playAgain();
                    res.quit();
                }
            })
    })

    // const playerMarker = prompt("x or o");

    let playerMarker = 'x';
    let aiMarker;
    playerMarker == 'x' ? aiMarker = 'o': aiMarker = 'x';

    return {boardArray, create, playerMarker, aiMarker};
})();

function playerTurn (){
    const chooseTurn = [true, false];
    // const turn = chooseTurn[Math.floor(Math.random() * 2)];
    let turn = true;
    if(turn){
        return;
    }
    else{
        //return minimax function
    }
};
playerTurn()

const winner = () => {
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
    
    const msgContainer = document.querySelector(".winner-msg");
    //go through each array in winningCombo
    //once a value is added on the left column (a), 
    //check if marker values are the same while using winner indexes on the last 2 columns
    const playerWin = () => {
        for (const arrays of winningCombo) {
        let [a,b,c] = arrays; //each letter corosponds to each arrays index
                              //a being index 0 of each array
        let board = gameBoard.boardArray;
        let playerMarker = gameBoard.playerMarker;
        //if one of the board[a] indexes has a value 
        //check if the other columns with winning indexes text match
            if(board[a] && board[a] == board[b] && board[a] == board[c]){
                //if player marker matches with the winning markers then player wins
                const winningCells = document.querySelectorAll(`#\\3${a} ,#\\3${b} ,#\\3${c} `);
                if(playerMarker == board[a]){
                    msgContainer.textContent = "You Win";
                    winningCells.forEach(element => {element.classList.add("win")})
                    return true;
                }
                //ai wins
                else {
                    winningCells.forEach(element => {element.classList.add("lose")})
                    return false;
                }
            }
        }
    }

    let isWinner;
    //returns true if ai or player wins
    if(playerWin() || playerWin() == false){
        isWinner = true;
    }
    const allCells = Array.from(document.querySelectorAll(".cell"));
    //returns true if each board cell has text
    const tie = allCells.every(cell => {
        return cell.textContent != '';
    })            

    return {isWinner, playerWin, tie, msgContainer};
};
function emptyBoardCells (){
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    })
}
const reset = () => {
    const popup = document.querySelector(".button-container");
    const playAgainBtn = document.createElement('button');
    playAgainBtn.className = 'play-again';
    playAgainBtn.textContent = 'Play Again';

    const quitBtn = document.createElement("button");
    quitBtn.className = 'quit';
    quitBtn.textContent = 'Quit';
    popup.append(playAgainBtn, quitBtn);

    const playAgain = () => {
        playAgainBtn.addEventListener("click", () => {
            winner().msgContainer.textContent = '';
            emptyBoardCells();
            gameBoard.boardArray = Array.from(Array(9).keys());
            popup.removeChild(playAgainBtn);
            popup.removeChild(popup.lastChild);
            popup.close();
            playerTurn();
        })
    }
    const quit = () => {
        const home = document.createElement("a");
        home.href = 'index.html';
        popup.appendChild(home);    
        home.appendChild(quitBtn);
    }
    return{playAgain, quit,popup}
}
function aiRandomPlaceMarker(){

    let randomCell;
    let randomID;
    do{
        randomID = Math.floor(Math.random() * 9); 
        randomCell = document.getElementById(randomID);
    }while(randomCell.textContent != "" && !winner().tie)
    gameBoard.boardArray[randomID] = gameBoard.aiMarker;
    randomCell.classList.add(gameBoard.aiMarker, 'transition-text');
    randomCell.textContent = gameBoard.aiMarker;
}


function availableCellsArray(array){
    const newArr = array.filter(element => {
        //return array with integer element values
        return typeof element == 'number';
    })
    return newArr;
}



function minimax(boardClone, player, maximizer) {
    const availableCells = availableCellsArray(boardClone);

    if (checkIfWinnerFound(boardClone, 'x')) {
        return { score: -1 };
    } else if (checkIfWinnerFound(boardClone, 'o')) {
        return { score: 1 };
    } else if (availableCells.length == 0) {
        return { score: 0 };
    }

    let moves = [];
    if (maximizer) {
        let bestVal = -1000;
        let bestMove = null; // Store the best move
        for (let i = 0; i < availableCells.length; i++) {
            const move = availableCells[i];
            boardClone[move] = player;
            let result = minimax(boardClone, 'x', false);
            boardClone[move] = move; // Undo the move
            if (result.score > bestVal) {
                bestVal = result.score;
                bestMove = move; // Update the best move
            }
        }
        return { score: bestVal, move: bestMove };
    } else {
        let bestVal = 1000;
        for (let i = 0; i < availableCells.length; i++) {
            const move = availableCells[i];
            boardClone[move] = player;
            let result = minimax(boardClone, 'o', true);
            boardClone[move] = move; // Undo the move
            if (result.score < bestVal) {
                bestVal = result.score;
                moves.push(move); // Add the move to the list of best moves
            }
        }
        return { score: bestVal, moves: moves };
    }
}

function bestMove(){
    return minimax(gameBoard.boardArray, 'o', true).move;
}
function placeAiMarker(){
    const bestIndex = bestMove();
    gameBoard.boardArray[bestIndex] = gameBoard.aiMarker;
    const cell = document.getElementById(bestIndex);
    cell.textContent = 'o';
    cell.classList.add("o")
    cell.classList.add(gameBoard.aiMarker, 'transition-text');
}

function checkIfWinnerFound(boardState, currentMarker) {
    if (
        (boardState[0] === currentMarker && boardState[1] === currentMarker && boardState[2] === currentMarker) ||
        (boardState[3] === currentMarker && boardState[4] === currentMarker && boardState[5] === currentMarker) ||
        (boardState[6] === currentMarker && boardState[7] === currentMarker && boardState[8] === currentMarker) ||
        (boardState[0] === currentMarker && boardState[3] === currentMarker && boardState[6] === currentMarker) ||
        (boardState[1] === currentMarker && boardState[4] === currentMarker && boardState[7] === currentMarker) ||
        (boardState[2] === currentMarker && boardState[5] === currentMarker && boardState[8] === currentMarker) ||
        (boardState[0] === currentMarker && boardState[4] === currentMarker && boardState[8] === currentMarker) ||
        (boardState[2] === currentMarker && boardState[4] === currentMarker && boardState[6] === currentMarker)
    ) {
        return true;
    } else {
        return false;
    }
}