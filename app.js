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
let redSound = new Audio('sounds/red.mp3');
let greenSound = new Audio('sounds/green.mp3');
let blueSound = new Audio('sounds/blue.mp3');
let yellowSound = new Audio('sounds/yellow.mp3');
let wrong = new Audio('sounds/wrong.mp3');

let level = 0;

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

const timeDelay = 300;
function listener(event, color) {
	console.log('clicked');
	if (gameRunning) {
		userSelected.push(color);
		if (!checker()) {
			wrong.play();
			removal();
			return;
		}
		clickedFlash(color);
		if (userSelected.length === level) setTimeout(nextLevel, timeDelay);
	}
}

buttons[red].addEventListener('click', listener.bind(null, event, red));

buttons[green].addEventListener('click', listener.bind(null, event, green));

buttons[blue].addEventListener('click', listener.bind(null, event, blue));

buttons[yellow].addEventListener('click', listener.bind(null, event, yellow));

function levelLogic() {
	if (!gameRunning) {
		gameRunning = true;
		level = 1;
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
	if (!gameRunning) levelLogic();
});

function clickedFlash(color) {
	buttons[color].classList.toggle('clicked');
	setTimeout(() => buttons[color].classList.toggle('clicked'), 100);
	sounds[color].play();
}

function checker() {
	for (let i = 0; i < userSelected.length; i++) {
		if (gameArray[i] !== userSelected[i]) return false;
	}
	return true;
}
