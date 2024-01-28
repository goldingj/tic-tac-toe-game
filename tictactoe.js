let playerTurn = true;
let computerMoveTimeout = 0;


const gameStatus = {
	MORE_MOVES_LEFT: 1,
	HUMAN_WINS: 2,
	COMPUTER_WINS: 3,
	DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
	// Setup the click event for the "New game" button
	const newBtn = document.getElementById("newGameButton");
	newBtn.addEventListener("click", newGame);

	// Create click-event handlers for each game board button
	const buttons = getGameBoardButtons();
	for (let button of buttons) {
		button.addEventListener("click", function () { boardButtonClicked(button); });
	}

	// Clear the board
	newGame();
}

// Returns an array of 9 <button> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoardButtons() {
	return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {
	
	const buttons = getGameBoardButtons();

	// Ways to win
	const possibilities = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
		[0, 4, 8], [2, 4, 6] // diagonals
	];

	// Check for a winner first
	for (let indices of possibilities) {
		if (buttons[indices[0]].innerHTML !== "" &&
			buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
			buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {
			
			// Found a winner
			if (buttons[indices[0]].innerHTML === "X") {
				return gameStatus.HUMAN_WINS;

			}
			else {
				return gameStatus.COMPUTER_WINS;
			}
		}
	}

	// See if any more moves are left
	let foundEmpty = false;
	for (let button of buttons) {
		if (button.innerHTML !== "X" && button.innerHTML !== "O") {
			return gameStatus.MORE_MOVES_LEFT;
		}
	}

	// If no winner and no moves left, then it's a draw
	return gameStatus.DRAW_GAME;
}

function newGame() {
	// TODO: Complete the function
	let turnInfo = document.getElementById("turnInfo");
	turnInfo.innerHTML = "";
	clearTimeout();
	computerMoveTimeout = 0;
	let newButtons = getGameBoardButtons();
	for (let i = 0; i < newButtons.length; i++){
		newButtons[i].innerHTML = "";
		newButtons[i].classList.remove("button");
		newButtons[i].removeAttribute("disabled");
		newButtons[i].classList.remove('x');
		newButtons[i].classList.remove('o');
	}
	playerTurn = true;
	
	let message = document.createTextNode("Your turn");
	turnInfo.appendChild(message);
}

function boardButtonClicked(button) {
	// TODO: Complete the function
	if(playerTurn){
		button.innerHTML = "X";
		button.classList.add("x");
		button.setAttribute("disabled", true);
		switchTurn();
	}
}

function switchTurn() {
	// TODO: Complete the function
	let result = checkForWinner();
	turnInfo.innerHTML = "";
	if(result === gameStatus.HUMAN_WINS){
		let playerWinMessage = document.createTextNode("You win!");
		turnInfo.appendChild(playerWinMessage);
		playerTurn = false;
		return
	}

	if(result === gameStatus.COMPUTER_WINS){
		let computerWinMessage = document.createTextNode("Computer wins!");
		turnInfo.appendChild(computerWinMessage);
		playerTurn = false;
		return
	}
	
	if(result === gameStatus.DRAW_GAME){
		let drawMessage = document.createTextNode("Draw game");
		turnInfo.appendChild(drawMessage);
		playerTurn = false;
		return
	}


	if(playerTurn){
		let computerMoveTimeout = setTimeout(makeComputerMove, 1000);
	}

	playerTurn = !playerTurn;

	if (playerTurn){
		let message = document.createTextNode("Your turn");
		turnInfo.appendChild(message);
	}
	 if(!playerTurn){
		let otherMessage = document.createTextNode("Computer's turn");
		turnInfo.appendChild(otherMessage);
	 }


	
}

function makeComputerMove() {
	// TODO: Complete the function
	let boardButtons = getGameBoardButtons();
	
	let availableButtons = Array.from(boardButtons).filter(button => button.innerHTML === "");
	if(availableButtons.length > 0){
		let randomChoice = Math.floor(Math.random() * availableButtons.length);
		let selectedButton = availableButtons[randomChoice];
		
		selectedButton.innerHTML = "O";
		selectedButton.classList.add("o");
		selectedButton.setAttribute("disabled", true);

		switchTurn();
	}
}