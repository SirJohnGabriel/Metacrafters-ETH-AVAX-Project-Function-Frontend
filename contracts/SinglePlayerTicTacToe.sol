// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SinglePlayerTicTacToe {
    address public player;
    uint8[9] public board; // 0 = empty, 1 = X, 2 = O
    bool public gameActive;
    uint8 public currentSymbol; // 1 = X, 2 = O
    address public winner;

    modifier onlyPlayer() {
        require(msg.sender == player, "You are not the player.");
        _;
    }

    modifier gameIsActive() {
        require(gameActive, "Game is not active.");
        _;
    }

    function startGame() external {
        require(!gameActive, "A game is already active.");
        player = msg.sender;
        gameActive = true;
        currentSymbol = 1;
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        winner = address(0);
    }

    function makeMove(uint8 pos) external onlyPlayer gameIsActive {
        require(pos < 9, "Position out of bounds.");
        require(board[pos] == 0, "Position already taken.");

        board[pos] = currentSymbol;

        if (checkWinner()) {
            gameActive = false;
            winner = player;
        } else if (isBoardFull()) {
            gameActive = false;
        } else {
            currentSymbol = (currentSymbol == 1) ? 2 : 1;
        }
    }

    function isBoardFull() internal view returns (bool) {
        for (uint8 i = 0; i < 9; i++) {
            if (board[i] == 0) return false;
        }
        return true;
    }

    function checkWinner() internal view returns (bool) {
        uint8[3][8] memory winningPositions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (uint8 i = 0; i < 8; i++) {
            if (
                board[winningPositions[i][0]] == currentSymbol &&
                board[winningPositions[i][1]] == currentSymbol &&
                board[winningPositions[i][2]] == currentSymbol
            ) {
                return true;
            }
        }
        return false;
    }

    function getBoard() external view returns (uint8[9] memory) {
        return board;
    }
}
