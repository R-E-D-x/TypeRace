let str = 'After removal from the oven, the pizza is sliced and plated quickly in a flat cardboard box, which is immediately closed and often taped shut. There is no physical separation after the slicing, so that edge can be ignored and we can treat the pizza, for thermal purposes, as an infinite plane.'
// let str = 'hello world'
let correctDOM = document.querySelector('.correct');
let remainingDOM = document.querySelector('.remaining');
let containerDOM = document.querySelector('.container');
let wrongDOM = document.querySelector('.wrong');
let startButton = document.querySelector('.start');
let gameOnButton = document.querySelector('.game-on');
let timerDOM = document.querySelector('.timer')
let speedDOM = document.querySelector('.speed')
remainingDOM.textContent = str;
let correctChars = '';
let wrongChar = [];
let remainingChars = str;
let currentIndex = 0;
let timer = 0;
let intervial;
let isRunning = false;
document.addEventListener('keydown', (event) => {
    // console.log(event)
    if (!isRunning) return
    if (event.key === str[currentIndex] && wrongChar.length <= 0 && remainingChars) {
        handleInput(1)
    } else if (event.key === 'Backspace') {
        if (wrongChar.length > 0) {
            currentIndex--;
            wrongChar.pop()
            wrongDOM.textContent = wrongChar.join('');
            remainingChars = str.slice(currentIndex, str.length);
            remainingDOM.textContent = remainingChars;
        } else {
            if (!correctChars) return
            handleInput(-1)
        }
    } else {
        if (!/^[a-zA-Z]$/.test(event.key) && event.key !== 'space') return;
        if (!remainingChars) return
        currentIndex++
        wrongChar.push(str[currentIndex - 1]);
        let wrongStr = wrongChar.join('');
        wrongDOM.textContent = wrongStr;
        // console.log(wrongChar.join(''))
        remainingChars = str.slice(currentIndex, str.length)
        remainingDOM.textContent = remainingChars;
    }
    if (correctChars.length === str.length) {
        stopGame()
        return;
    }
});

function handleInput(addition) {
    currentIndex += addition;
    correctChars = str.slice(0, currentIndex);
    remainingChars = str.slice(currentIndex, str.length)
    correctDOM.innerText = correctChars;
    remainingDOM.innerText = remainingChars;
    wrongDOM.textContent = wrongChar.join('')
}
function startGame() {
    isRunning = true;
    startButton.style.display = 'none';
    gameOnButton.style.display = 'block';
    intervial = setInterval(() => {
        timerDOM.textContent = timer
        timer++

    }, 1000);

}
function stopGame() {
    isRunning = false
    clearInterval(intervial)
    let WPM = correctChars.split(' ').length / (timer / 60)
    speedDOM.textContent = `${Math.round(WPM)} WPM`
    startButton.style.display = 'block';
    gameOnButton.style.display = 'none';
    correctChars = '';
    wrongChar = [];
    currentIndex = 0;
    timer = 0;
    remainingChars = str;
    remainingDOM.textContent = str;
    correctDOM.textContent = '';
    wrongDOM.textContent = '';
}
function changeText() {

    stopGame();
    str = prompt('what text ?');
    remainingChars = str;
    remainingDOM.textContent = str;
    containerDOM.focus()
}
// RED until its wiped.....