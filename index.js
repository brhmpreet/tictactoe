const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const resetBtn = document.querySelector("#reset");

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let options = ["","","","","","","","",""];
let running = false;
let currentPlayer = "X";
initializeGame();
function initializeGame(){
    cells.forEach(cell => {
        cell.addEventListener("click",cellClicked);
    });
    resetBtn.addEventListener("click",restartGame);
    statusText.textContent = `${currentPlayer}'s Turn`
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex]!=""||!running)return;

    updateCell(this,cellIndex);
    checkWinner();
}
function updateCell(cell,index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer=="X")?"O":"X";
    statusText.textContent = `${currentPlayer}'s Turn`;
}
function checkWinner(){
    let roundone = false;
    for(let i = 0;i<winConditions.length;i++){
        let arr = winConditions[i];
        let a = options[arr[0]];
        let b = options[arr[1]];
        let c= options[arr[2]];
        if(a==""||b==""||c=="")continue;
        if(a==b&&b==c){
            roundone = true;
            break;
        }
    }
    if(roundone){
        statusText.textContent = `${currentPlayer} Wins`
        running = false;
    }else if(!options.includes("")){
        running = false;
        statusText = `Draw`;
    }else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    running = true;
    cells.forEach(cell=>cell.textContent = "");
    statusText.textContent =`${currentPlayer}'s Turn`
}
