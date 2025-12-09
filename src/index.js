import './style.css';
import { newPlayer } from './gameFunctions.js';
import { AIplayer } from './gameFunctions.js';
import { Gameboard } from './gameFunctions.js';

const changePlayer = document.querySelector('.vs');
const player2 = document.querySelector('#player2');
const aiPlayer = document.querySelector('#AI');

changePlayer.addEventListener('click', () => {
    if (window.getComputedStyle(player2).display === 'flex') {
        player2.style.display = 'none';
        aiPlayer.style.display = 'flex';
    } else {
        player2.style.display = 'flex';
        aiPlayer.style.display = 'none';
    }
});

function createBoard() {
    const container = document.createElement('div');
    container.className = 'container';
    const size = 10;

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            container.appendChild(cell);
        }
    }
    return container;
}

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

    const name1El = document.createElement('h1');
    if(name1.value === ''){
        name1El.textContent = 'Player1';
    }else{
    name1El.textContent = name1.value;
    }
    divPlayer1.appendChild(name1El);

    const Player1 = newPlayer(name1.value);
    Player1.gameboard = Gameboard();

    const board1 = createBoard();
    divPlayer1.appendChild(board1);

    const ready1 = document.createElement('button');
    ready1.className = 'ready';
    ready1.textContent = 'START';
    divPlayer1.appendChild(ready1);

    if (window.getComputedStyle(player2).display === 'flex') {
        const name2El = document.createElement('h1');
        if(name2.value === ''){
            name2El.textContent = 'Player2';
        }else{
        name2El.textContent = name2.value;
        }
        divPlayer2.appendChild(name2El);

        const Player2 = newPlayer(name2.value);
        Player2.gameboard = Gameboard();

        const board2 = createBoard();
        divPlayer2.appendChild(board2);

        const ready2 = document.createElement('button');
        ready2.className = 'ready';
        ready2.textContent = 'START';
        divPlayer2.appendChild(ready2);

    } else {
        const nameAI = document.createElement('h1');
        nameAI.textContent = "AI PLAYER";
        divPlayer2.appendChild(nameAI);

        const Computer = AIplayer();
        Computer.gameboard = Gameboard();

        const board2 = createBoard();
        divPlayer2.appendChild(board2);
    }
});
