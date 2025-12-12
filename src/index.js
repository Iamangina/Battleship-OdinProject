import './style.css';
import { newPlayer, AIplayer, Gameboard } from './gameFunctions.js';

const changePlayer = document.querySelector('.vs');
const player2 = document.querySelector('#player2');
const aiPlayer = document.querySelector('#AI');
const shipList = document.querySelector('.shipList');
const direction = document.querySelector('.direction');
const winnerName = document.querySelector('.winnerName');
const winnerPage = document.querySelector('.winnerPage');

let Player1;
let Player2;

let Playername;

let currentPlayer;

let board1;
let board2;

let gameOver = false;

let currentDirection = direction.value;
let currentShipLength = 4;

const placedShips1 = [];
const placedShips2 = [];

direction.addEventListener('change', () => {
    currentDirection = direction.value;
});

shipList.addEventListener('change', () => {
    shipList.querySelectorAll('option').forEach(option => {
        if (placedShips1.includes(option.value) || placedShips2.includes(option.value)) {
            option.disabled = true;
        } else {
            option.disabled = false;
        }
    });

    switch (shipList.value) {
        case 'Carrier': currentShipLength = 4; break;
        case 'Battleship': currentShipLength = 3; break;
        case 'Cruiser': currentShipLength = 3; break;
        case 'Destroyer': currentShipLength = 2; break;
        case 'Submarine': currentShipLength = 1; break;
    }
});

changePlayer.addEventListener('click', () => {
    if (window.getComputedStyle(player2).display === 'flex') {
        player2.style.display = 'none';
        aiPlayer.style.display = 'flex';
    } else {
        player2.style.display = 'flex';
        aiPlayer.style.display = 'none';
    }
});

let phasePlayer1 = "placement";
let phasePlayer2 = "";

function createBoard(gameboard, isPlayer1 = true) {
    const container = document.createElement('div');
    container.className = 'container';
    const size = 10;

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            container.appendChild(cell);

            cell.addEventListener('click', () => {
                // Player 1 placement
                if (isPlayer1 && phasePlayer1 === 'placement') {
                    placeShip(cell, gameboard, placedShips1, 'ship');
                }

                // Player 2 placement
                if (!isPlayer1 && phasePlayer2 === 'placement') {
                    placeShip(cell, gameboard, placedShips2, 'ship1');
                }

                // Player 1 attack
                if (isPlayer1 && phasePlayer1 === 'battle' && currentPlayer === Player1) {
                    attackShip(cell, Player2.gameboard);
                }

                // Player 2 attack
                if (!isPlayer1 && phasePlayer2 === 'battle' && currentPlayer === Player2) {
                    attackShip(cell, Player1.gameboard);
                }
            });
        }
    }

    return container;
}
//Place Ship function

function placeShip(cell, gameboard, placedShips, shipClass) {
    if (placedShips.includes(shipList.value)) return;

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const result = gameboard.placeShip(currentShipLength, [row, col], currentDirection);

    if (!result) {
        cell.classList.add('invalid');
        setTimeout(() => cell.classList.remove('invalid'), 250);
        return;
    }

    placedShips.push(shipList.value);
    const lastShip = gameboard.ships[gameboard.ships.length - 1];
    lastShip.position.forEach(([r, c]) => {
        const selector = `.cell[data-row="${r}"][data-col="${c}"]`;
        cell.parentNode.querySelector(selector).classList.add(shipClass);
    });

    shipList.querySelectorAll('option').forEach(option => {
        option.disabled = placedShips.includes(option.value);
    });
}
function allSunk(board) {
    return board.ships.every(s => s.ship.isSunk());
}

// Attack function
function attackShip(cell, gameboard){
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const ship = `.cell[data-row="${row}"][data-col="${col}"]`;

    const result = gameboard.receiveAttack(row, col);
    if(result.hit){
        cell.parentNode.querySelector(ship).classList.add('hit');
        if(result.sunk){

            result.shipObj.position.forEach(([r, c]) => {
                const s = `.cell[data-row="${r}"][data-col="${c}"]`;
                cell.parentNode.querySelector(s).classList.add('sunk');
            });
            if (allSunk(gameboard)) {
                gameOver = true;

                const winner = currentPlayer;
                winnerPage.style.display = 'flex';
                winnerName.textContent = `The winner is ${winner.name}`;

                return result;
            }
        }
    } else {
        cell.parentNode.querySelector(ship).classList.add('miss');
    }

    if (gameOver) return;

    if (!gameOver) {
    currentPlayer = currentPlayer === Player1 ? Player2 : Player1;

    if (currentPlayer.type === 'computer') {
        setTimeout(aiMove, 400); 
    }
}
    return result;
}

//ai attack
function aiMove() {
    if (gameOver) return;

    const board = board2;
    const availableCells = board.querySelectorAll('.cell:not(.hit):not(.miss)');
    if (availableCells.length === 0) return;

    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];

    attackShip(randomCell, Player1.gameboard);
}

// DOM Elements
const name1 = document.querySelector('#player1Name');
const name2 = document.querySelector('#player2Name');
const btnStart = document.querySelector('.btnStart');
const startPage = document.querySelector('.startPage');
const mainPage = document.querySelector('.mainPage');
const divPlayer1 = document.querySelector('.player1');
const divPlayer2 = document.querySelector('.player2');

btnStart.addEventListener('click', () => {
    startPage.style.display = "none";
    mainPage.style.display = "flex";

    // Player 1 setup
    const name1El = document.createElement('h1');
    name1El.textContent = name1.value || 'Player1';

    divPlayer1.appendChild(name1El);

    Playername = name1.value || 'Player1';
    Player1 = newPlayer(Playername);
    currentPlayer = Player1;
    Player1.gameboard = Gameboard();
    board1 = createBoard(Player1.gameboard, true);
    divPlayer1.appendChild(board1);

    const ready1 = document.createElement('button');
    ready1.className = 'ready';
    ready1.id = 'ready1';
    ready1.textContent = 'START';
    divPlayer1.appendChild(ready1);

    ready1.addEventListener('click', () => {
        if (placedShips1.length === 5) {
            divPlayer1.querySelectorAll('.ship').forEach(ship => {
                ship.classList.remove('ship');
                ship.classList.add('hidden');
            });
            phasePlayer1 = 'battle';
            phasePlayer2 = 'placement';
        }
        ready1.style.display = 'none';
    });

    // Player 2 setup
    if (window.getComputedStyle(player2).display === 'flex') {
        const name2El = document.createElement('h1');
        name2El.textContent = name2.value || 'Player2';
        divPlayer2.appendChild(name2El);

        Playername = name2.value || 'Player2';
        Player2 = newPlayer(Playername);
        Player2.gameboard = Gameboard();
        board2 = createBoard(Player2.gameboard, false);
        divPlayer2.appendChild(board2);

        const ready2 = document.createElement('button');
        ready2.className = 'ready';
        ready2.id = 'ready2';
        ready2.textContent = 'START';
        divPlayer2.appendChild(ready2);

        ready2.addEventListener('click', () => {
            if (placedShips2.length === 5) {
                divPlayer2.querySelectorAll('.ship1').forEach(ship => {
                    ship.classList.remove('ship1');
                    ship.classList.add('hidden1');
                });
                phasePlayer2 = 'battle';
            }
            ready2.style.display = 'none';
        });
    } else {
        // AI setup
        const nameAI = document.createElement('h1');
        nameAI.textContent = "AI PLAYER";
        divPlayer2.appendChild(nameAI);

        Playername = "AI Player";
        Player2 = AIplayer();
        Player2.gameboard = Gameboard();
        board2 = createBoard(Player2.gameboard, false);
        divPlayer2.appendChild(board2);

        const shipsToPlace = [
            { name: 'Carrier', length: 4 },
            { name: 'Battleship', length: 3 },
            { name: 'Cruiser', length: 3 },
            { name: 'Destroyer', length: 2 },
            { name: 'Submarine', length: 1 },
        ];

        for (const ship of shipsToPlace) {
            let placed = false;
            while (!placed) {
                const row = Math.floor(Math.random() * 10);
                const col = Math.floor(Math.random() * 10);
                const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                const result = Player2.gameboard.placeShip(ship.length, [row, col], direction);
                if (result) {
                    placed = true;
                    const lastShip = Player2.gameboard.ships[Player2.gameboard.ships.length - 1];
                    lastShip.position.forEach(([r, c]) => {
                        const selector = `.cell[data-row="${r}"][data-col="${c}"]`;
                        board2.querySelector(selector).classList.add('ship1');
                    });
                }
            }
        }
        phasePlayer2 = 'battle';
    }
});
