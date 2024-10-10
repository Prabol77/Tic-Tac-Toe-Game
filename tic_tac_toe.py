def print_board(board):
    # Print the current state of the board
    for row in board:
        print(" | ".join(row))  # Join each row's cells with '|' separator
        print("-" * 9)           # Print a separator line

def check_winner(board):
    # Check rows and columns for a winning combination
    for i in range(3):
        if board[i][0] == board[i][1] == board[i][2] != " ":
            return board[i][0]  # Return the winner (X or O)
        if board[0][i] == board[1][i] == board[2][i] != " ":
            return board[0][i]  # Return the winner (X or O)

    # Check diagonals for a winning combination
    if board[0][0] == board[1][1] == board[2][2] != " ":
        return board[0][0]      # Return the winner (X or O)
    if board[0][2] == board[1][1] == board[2][0] != " ":
        return board[0][2]      # Return the winner (X or O)

    return None  # No winner found

def is_board_full(board):
    # Check if the board is full (no empty cells)
    return all(cell != " " for row in board for cell in row)

def play_game():
    # Initialize the game board and set the starting player
    board = [[" " for _ in range(3)] for _ in range(3)]  # Create a 3x3 board filled with spaces
    current_player = "X"  # Starting player

    while True:
        print_board(board)  # Print the current board
        # Get input from the current player
        row = int(input(f"Player {current_player}, enter row (0-2): "))
        col = int(input(f"Player {current_player}, enter column (0-2): "))

        # Check if the chosen cell is empty
        if board[row][col] == " ":
            board[row][col] = current_player  # Place the player's mark on the board
            winner = check_winner(board)       # Check for a winner
            if winner:
                print_board(board)             # Print the final board
                print(f"Player {winner} wins!")  # Announce the winner
                break
            if is_board_full(board):
                print_board(board)             # Print the final board
                print("It's a draw!")          # Announce the draw
                break
            # Switch players
            current_player = "O" if current_player == "X" else "X"
        else:
            print("Cell is already taken. Try again.")  # Prompt to try again if the cell is occupied

if __name__ == "__main__":
    play_game()  # Start the game

