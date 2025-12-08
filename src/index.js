import './style.css';

const changePlayer = document.querySelector('.vs');
const player2 = document.querySelector('#player2');
const aiPlayer = document.querySelector('#AI');

changePlayer.addEventListener('click', () => {
    const player2Display = window.getComputedStyle(player2).display;
    const aiDisplay = window.getComputedStyle(aiPlayer).display;

    if (player2Display === 'flex') {
        player2.style.display = 'none';
        aiPlayer.style.display = 'flex';
    } else if (aiDisplay === 'flex'){
        player2.style.display = 'flex';
        aiPlayer.style.display = 'none';
    }
});

const name1 = document.querySelector('#player1Name');
const name2 = document.querySelector('#player2Name');
const btnStart = document.querySelector('.btnStart');
const startPage = document.querySelector('.startPage');

btnStart.addEventListener('click', () => {
    startPage.style.display = "none";
    const player1Name = name1.value;
    const player2Name = name2.value;


    
})