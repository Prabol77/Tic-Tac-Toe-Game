const board = document.getElementById('board'); // Get the board element from the DOM
const resetButton = document.getElementById('reset'); // Get the reset button element
let currentPlayer = 'X'; // Initialize the current player as 'X'
let gameState = Array(9).fill(null); // Create an array to represent the game state (9 cells)

// Function to render the game board
const renderBoard = () => {
    board.innerHTML = ''; // Clear the board before rendering
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div'); // Create a new div for each cell
        cellElement.className = 'cell'; // Set the class for styling
        cellElement.textContent = cell; // Set the cell's text to its value
        cellElement.addEventListener('click', () => handleCellClick(index)); // Add click event to the cell
        board.appendChild(cellElement); // Append the cell to the board
    });
};

// Function to handle cell clicks
const handleCellClick = (index) => {
    // If the cell is already occupied or there is a winner, exit the function
    if (gameState[index] || checkWinner()) return;
    gameState[index] = currentPlayer; // Set the cell to the current player's symbol
    renderBoard(); // Re-render the board to reflect the new state
    // Check for a winner
    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 10); // Alert the winner
    } else if (gameState.every(cell => cell)) {
        setTimeout(() => alert("It's a draw!"), 10); // Alert if the game is a draw
    } else {
        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

// Function to check for a winner
const checkWinner = () => {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Winning combinations for rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Winning combinations for columns
        [0, 4, 8], [2, 4, 6]             // Winning combinations for diagonals
    ];
    
    // Check if any winning combination has the same player's symbol
    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
};

// Event listener for the reset button to restart the game
resetButton.addEventListener('click', () => {
    gameState = Array(9).fill(null); // Reset the game state
    currentPlayer = 'X'; // Reset the current player to 'X'
    renderBoard(); // Re-render the board
});

// Initial rendering of the board
renderBoard();

