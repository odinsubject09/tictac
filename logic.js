function startGame() {
    const arr = new Array(9).fill(0); // Initialize the array

    const clickEvent = (counter, index) => {
        if (arr[index] === 0) { // Only allow if the cell is empty
            arr[index] = (counter % 2 === 0) ? 2 : 1;
        }
    };

    const logic = () => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            let start = 3 * i;
            let current = arr[start];
            let flag = true;
            for (let j = 0; j < 3; j++) {
                if (arr[start + j] !== current || current === 0) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                endGame(current === 1 ? "Player 1 wins!" : "Player 2 wins!");
                return true; // Game is over
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            let current = arr[i];
            let flag = true;
            for (let j = 0; j < 3; j++) {
                if (arr[i + 3 * j] !== current || current === 0) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                endGame(current === 1 ? "Player 1 wins!" : "Player 2 wins!");
                return true; // Game is over
            }
        }

        // Check diagonal (top-left to bottom-right)
        let current = arr[0];
        let flag = true;
        for (let i = 0; i < 3; i++) {
            if (arr[4 * i] !== current || current === 0) {
                flag = false;
                break;
            }
        }
        if (flag) {
            endGame(current === 1 ? "Player 1 wins!" : "Player 2 wins!");
            return true; // Game is over
        }

        // Check diagonal (top-right to bottom-left)
        current = arr[2];
        flag = true;
        for (let i = 0; i < 3; i++) {
            if (arr[2 + 2 * i] !== current || current === 0) {
                flag = false;
                break;
            }
        }
        if (flag) {
            endGame(current === 1 ? "Player 1 wins!" : "Player 2 wins!");
            return true; // Game is over
        }

        return false; // No winner yet
    };

    const filled = (index) => {
        return arr[index] !== 0;
    };

    const endGame = (message) => {
        const messageDiv = document.getElementById("message");
        messageDiv.textContent = message;
    };

    return { clickEvent, logic, filled };
}

const gameBoard = startGame();
const cells = document.querySelectorAll(".cell");
let counter = 0;
cells.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
        if (!gameBoard.filled(cell.id)) {
            cell.style.backgroundColor = 'lightgrey'; // Change the background color on hover
        }
    });

    cell.addEventListener("mouseleave", () => {
        if (!gameBoard.filled(cell.id)) {
            cell.style.backgroundColor = ''; // Reset the background color when not hovering
        }
    });
    cell.addEventListener("click", () => {
        const index = cell.id; // Get index from cell ID
        if (gameBoard.filled(index)) return; // If the game is over, stop clicks

        counter += 1;
        gameBoard.clickEvent(counter, index);
        cell.textContent = counter % 2 === 0 ? "O" : "X";

        if (gameBoard.logic()) return; // If the game ends, stop further moves

        // Tie condition: If all cells are filled and no winner
        if (counter === 9) {
            const messageDiv = document.getElementById("message");
            messageDiv.textContent = "It's a tie!";
            return;
        }
    });
});
