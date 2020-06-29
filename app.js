const buttons = document.querySelectorAll('button');
const gameHeading = document.querySelector('#gameHeading');
//Play again button
const playAgain = document.createElement('button');
playAgain.classList.add('playAgain');
playAgain.innerText = 'Play Again?';
playAgain.addEventListener('click', () => {
	location.reload();
});
//Sounds
let sounds = [new Audio('sounds/red.mp3'), new Audio('sounds/green.mp3'), new Audio('sounds/blue.mp3'), new Audio('sounds/yellow.mp3'), new Audio('sounds/wrong.mp3')];
//RGBYW 01234
const red = 0;
const green = 1;
const blue = 2;
const yellow = 3;
const wrong = 4;
//Game variables
let gameArray = [];
let userSelected = [];
let gameRunning = false;
let level = 1;
const timeDelay = 500;
//Function declerations
function checker() {
	for (let i = 0; i < userSelected.length; i++) {
		if (gameArray[i] !== userSelected[i]) return false;
	}
	return true;
}

function over() {
	gameHeading.innerHTML = `<h1>Game Over</h1><h6>You scored: ${level}</h6>`;
	document.body.append(playAgain);
}

function levelLogic() {
	if (!gameRunning) {
		gameRunning = true;
	} else {
		userSelected = [];
		level++;
	}
	gameHeading.innerText = `Level ${level}`;
	let color = Math.floor(Math.random() * 4);
	gameArray.push(color);
	clickedFlash(color);
}

window.addEventListener('keydown', () => {
	if (!gameRunning) setTimeout(levelLogic, 300);
});

function clickedFlash(color) {
	buttons[color].classList.toggle('clicked');
	setTimeout(() => buttons[color].classList.toggle('clicked'), 100);
	sounds[color].play();
}

function listener(event, color) {
	if (gameRunning) {
		userSelected.push(color);
		if (!checker()) {
			sounds[wrong].play();
			over();
			return;
		}
		clickedFlash(color);
		if (userSelected.length === level) setTimeout(levelLogic, timeDelay);
	}
}
buttons[red].addEventListener('click', listener.bind(null, event, red));
buttons[green].addEventListener('click', listener.bind(null, event, green));
buttons[blue].addEventListener('click', listener.bind(null, event, blue));
buttons[yellow].addEventListener('click', listener.bind(null, event, yellow));