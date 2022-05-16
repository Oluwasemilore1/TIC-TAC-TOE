const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('#restartBtn');
const print = document.querySelector('#print');

let currentPlayer = 'X';
let winConditions = [
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6]
];

let board = ['','','','','','','','',''];
let running = false;

initializeGame()

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    print.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');
    if (board[cellIndex] != '' || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    print.textContent = `${currentPlayer}'s turn`;
}



function updateCell(cell, cellIndex) {
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;    
}


function checkWinner() {
    let roundWon = false;
    for(i = 0; i < winConditions.length; i++){
        const conditions = winConditions[i];

        const cellA = board[conditions[0]]
        const cellB = board[conditions[1]]
        const cellC = board[conditions[2]]

        if (cellA == '' || cellB == '' || cellC == '') {
            continue;
        }
        else if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break
        }
        
    }
    if (roundWon) {
        print.textContent = `${currentPlayer} wins`;
        running = false;
    }
    else if (!board.includes('')) {
        print.textContent = `It is a Draw`;
        running = false;
    }
    else{
        changePlayer()
    }
}

function restartGame() {
    currentPlayer = `X`;
    print.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
}