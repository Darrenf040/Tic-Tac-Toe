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
                    //add text to board & update array with player/ai markers
                    let id = e.target.id;
                    gameBoard.boardArray[id] = playerMarker;
                    e.target.textContent = playerMarker;
                    e.target.classList.add(playerMarker);

                    const win = winner();
                    //after user places marker, ai places 
                    if(!win.isWinner && !win.tie){
                        aiPlaceMarker();
                    }
                    
                }
                
                const win = winner();
                //if there is a winner or the board is full 
                if(win.isWinner || win.tie){
                    if(win.tie && !win.isWinner){
                        win.msgContainer.textContent = 'Tie';
                    }
                    boardArray.fill("")
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

function aiPlaceMarker(){

    let randomCell;
    let randomID;
    do{
        randomID = Math.floor(Math.random() * 9); 
        randomCell = document.getElementById(randomID);
    }while(randomCell.textContent != "" && !winner().tie)
    gameBoard.boardArray[randomID] = gameBoard.aiMarker;
    randomCell.classList.add(gameBoard.aiMarker);
    randomCell.textContent = gameBoard.aiMarker;
}

function playerTurn (){
    const chooseTurn = [true, false];
    const turn = chooseTurn[Math.floor(Math.random() * 2)];
    if(turn){
        return;
    }
    else{
        return aiPlaceMarker();
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
                if(playerMarker == board[a]){
                    msgContainer.textContent = "You Win";
                    return true;
                }
                //ai wins
                else {
                    msgContainer.textContent = 'AI Wins'
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

const winningCombo = [
    ["0","1","2"], 
    ["3","4","5"], 
    ["6","7","8"],
    ["0","3","6"], 
    ["1","4","7"], 
    ["2","5","8"],
    ["0","4","8"], 
    ["2","4","6"]
];
function win(){
    let k = 0;
    let a = 0;
    for(let i = 0; i < winningCombo.length; i++){
        //reset when exiting a winning combo array
        a = 0;
        k = 0;
        for(let j = 0; j < 3; j++){
            //get the cell in a winningCombo value 
            const cell = document.getElementById(winningCombo[i][j]);
            console.log(winningCombo[i][j], k, a, cell);
            //if the cells inside of one of the arrays all have a x class,
            //return iterate k until it reaches 3 (a valid combo with the same markers)
            if(winningCombo[i][j] == cell.id && cell.classList.contains("x")){
                k++;
                if(k >= 3){
                    return true;
                }
            }
            else if(winningCombo[i][j] == cell.id && cell.classList.contains("o")){
                a++;
                if(a >= 3){
                    return true;
                }
            } 
        }
    }
    return false;
}