function playGame() {
	let app = document.querySelector('.app');
	let board = [1,2,3,4,5,6,7,8,9];

	let rows = document.querySelectorAll('.row');
	// console.log(rows);

	// Popup to restart the game and declare the winner
	function popup(player) {
		const popupWindow = document.querySelector('.popup');
		// Update the winner paragraph
		document.querySelector('.winner').textContent = `Winner: ${player}`;
		popupWindow.style.visibility = 'visible';
		document.querySelector('.app').style.visibility = 'hidden';
	}

	// The function to update the board during the game
	function updateBoard() {
		let board_index = 0;

		rows.forEach((row) => {
			// console.log(board_index);
			while(row.firstChild) {
				row.removeChild(row.firstChild);
			}
			for(i=0; i<3; i++) {
				let box = document.createElement('div');
				box.textContent = board[board_index];
				box.className = `box-${board[board_index]}`;
				row.appendChild(box);
				board_index++;
				// console.log(row.textContent);
			}
		});
	}

	// Define the checkWin function
	function checkWin(turn) {
		if (
		    board[0] === board[1] && board[0] === board[2] ||
		    board[0] === board[3] && board[0] === board[6] ||
		    board[0] === board[4] && board[0] === board[8] ||
		    board[1] === board[4] && board[1] === board[7] ||
		    board[2] === board[4] && board[2] === board[6] ||
		    board[2] === board[5] && board[2] === board[8] ||
		    board[3] === board[4] && board[3] === board[5] ||
		    board[6] === board[7] && board[2] === board[8]
		    ) {
			updateBoard();
			board = [1,2,3,4,5,6,7,8,9];
			turnNumber = 1;
			playerTurn = true;
			player = turn ? 'Player "X"': 'Player "O"';
			console.log(player + 'won');
			updateBoard();
			popup(player);
		}
	}

	let playerTurn = true;
	let turnNumber = 1;
	window.addEventListener('keydown', (e) => {
		// Update the game status
		if (turnNumber > 9) {
			console.log("DRAW");
		}
		if (typeof(board[Number(e.key) - 1]) === "number") {
			if (playerTurn) {
				board[Number(e.key) - 1] = 'X';
			}
			else {
				board[Number(e.key) - 1] = 'O';
			}
			updateBoard();
			playerTurn = !playerTurn;
			turnNumber++;
			let player = playerTurn ? 'Player "X"': 'Player "O"';
			document.querySelector('.status').textContent = `Next ${player}`
		}
		else {
			console.log("Choice is taken")
		}

		// Check the winner
		checkWin(!playerTurn);
	})

	updateBoard();
}

playGame();

const button = document.querySelector('.restart');
button.addEventListener('click', () => {
	document.querySelector('.popup').style.visibility = 'hidden';
	document.querySelector('.app').style.visibility = 'visible';
	playGame();
})