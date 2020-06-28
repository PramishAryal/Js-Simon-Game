const buttonR = document.querySelector('.buttonR');
const buttonG = document.querySelector('.buttonG');
const buttonB = document.querySelector('.buttonB');
const buttonY = document.querySelector('.buttonY');
const buttons = document.querySelectorAll('button');
const gameHeading = document.querySelector('#gameHeading');
const playAgain = document.createElement('button');
playAgain.classList.add('playAgain');
playAgain.innerText = 'Play Again?';
let redSound = new Audio('sounds/red.mp3');
let greenSound = new Audio('sounds/green.mp3');
let blueSound = new Audio('sounds/blue.mp3');
let yellowSound = new Audio('sounds/yellow.mp3');
let wrong = new Audio('sounds/wrong.mp3');

let level = 0;
let lastColor = -1;

let sounds = [ redSound, greenSound, blueSound, yellowSound, wrong ];
//RGBY 0123
const red = 0;
const green = 1;
const blue = 2;
const yellow = 3;

let gameArray = [];
let userSelected = [];

let gameRunning = false;

function removal() {
	buttons[red].removeEventListener('click', redListener);
	buttons[green].removeEventListener('click', greenListener);
	buttons[blue].removeEventListener('click', blueListener);
	buttons[yellow].removeEventListener('click', yellowListener);

	gameHeading.innerHTML = `<h1>Game Over</h1><h6>You scored: ${level}</h6>`;
	document.body.append(playAgain);
}

buttons[red].addEventListener('click', redListener);

buttons[green].addEventListener('click', greenListener);

buttons[blue].addEventListener('click', blueListener);

buttons[yellow].addEventListener('click', yellowListener);

playAgain.addEventListener('click', () => {
	location.reload();
});

function nextLevel() {
	userSelected = [];
	level++;
	gameHeading.innerText = `Level ${level}`;
	let color = Math.floor(Math.random() * 4);
	gameArray.push(color);
	lastColor = gameArray.Length - 1;
	clickedFlash(color);
}

window.addEventListener('keydown', () => {
	if (!gameRunning)
		setTimeout(beginGame,500);
});

function beginGame() {
	gameRunning = true;
	level = 1;
	gameHeading.innerText = `Level ${level}`;
	let color = Math.floor(Math.random() * 4);
	gameArray.push(color);
	lastColor = gameArray.Length - 1;
	clickedFlash(color);
}

function clickedFlash(color) {
	switch (color) {
		case red:
			buttons[red].classList.toggle(`buttonR`);
			setTimeout(() => buttons[red].classList.toggle(`buttonR`), 100);
			break;
		case green:
			buttons[green].classList.toggle(`buttonG`);
			setTimeout(() => buttons[green].classList.toggle(`buttonG`), 100);
			break;
		case blue:
			buttons[blue].classList.toggle(`buttonB`);
			setTimeout(() => buttons[blue].classList.toggle(`buttonB`), 100);
			break;
		case yellow:
			buttons[yellow].classList.toggle(`buttonY`);
			setTimeout(() => buttons[yellow].classList.toggle(`buttonY`), 100);
			break;
	}
	sounds[color].play();
}

function checker() {
	for (let i = 0; i < userSelected.length; i++) {
		if (gameArray[i] !== userSelected[i]) return false;
	}
	return true;
}

const timeDelay = 400;

function redListener() {
	if (gameRunning) {
		userSelected.push(red);
		if (!checker()) {
			wrong.play();
			removal();
			return;
		}
		clickedFlash(red);
		if (userSelected.length === level) setTimeout(nextLevel, timeDelay);
	}
}

function greenListener() {
	if (gameRunning) {
		userSelected.push(green);
		if (!checker()) {
			wrong.play();
			removal();
			return;
		}
		clickedFlash(green);
		if (userSelected.length === level) setTimeout(nextLevel, timeDelay);
	}
}
function blueListener() {
	if (gameRunning) {
		userSelected.push(blue);
		if (!checker()) {
			wrong.play();
			removal();
			return;
		}
		clickedFlash(blue);
		if (userSelected.length === level) setTimeout(nextLevel, timeDelay);
	}
}
function yellowListener() {
	if (gameRunning) {
		userSelected.push(yellow);
		if (!checker()) {
			wrong.play();
			removal();
			return;
		}
		clickedFlash(yellow);
		if (userSelected.length === level) setTimeout(nextLevel, timeDelay);
	}
}
