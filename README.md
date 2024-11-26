# Project: Single Player Tic Tac Toe - Smart Contract dApp  - Function Frontend

This project sets up a decentralized application (dApp) for playing a single-player Tic Tac Toe game on the Ethereum blockchain. The smart contract is built using Solidity, and the front-end interface is developed with React and Next.js. This project demonstrates how to integrate a blockchain game using Hardhat, Ethereum, and a user-friendly web interface.

## Description

This application allows a user to connect their MetaMask wallet, start a Tic Tac Toe game, and make moves on the board. The game logic is implemented in a smart contract deployed on the Ethereum blockchain, and the front-end communicates with this contract using Ethers.js.

- **Smart Contract**: A Solidity contract deployed on Ethereum that handles game state, board management, and player actions.
- **Frontend**: A React/Next.js interface where users can interact with the game and make moves.
- **Blockchain Integration**: Uses Ethereum and Ethers.js for interaction with the smart contract.

## Getting Started

### Prerequisites

Before starting, ensure the following are installed on your machine:

1. **Node.js**: Download and install from [Node.js Official Website](https://nodejs.org).
2. **npm or yarn**: Comes with Node.js installation. Check if it's installed using `npm -v`.
3. **MetaMask**: Install the MetaMask browser extension to interact with the Ethereum blockchain.
4. **VS Code**: Recommended for development ([Download here](https://code.visualstudio.com/)).

### Installing

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

### Running the Project

1. **Terminal Setup**: Open three terminals in your project directory.

2. **Start Hardhat Node**: In the second terminal, run:

   ```bash
   npx hardhat node
   ```

   This will launch a local Ethereum blockchain.

3. **Deploy Contracts**: In the third terminal, run:

   ```bash
   npx hardhat run --network localhost scripts/deploy.js
   ```

   This will deploy your Tic Tac Toe smart contract to the local blockchain.

4. **Run the Front-end**: In the first terminal, start the Next.js development server:

   ```bash
   npm run dev
   ```

   Open your browser and navigate to [http://localhost:3000/](http://localhost:3000/) to view the application.

## Project Structure

- **contracts/**: Contains the Solidity smart contract `SinglePlayerTicTacToe.sol`.
- **scripts/**: Contains deployment scripts for Hardhat `deploy.js`.
- **pages/**: Contains front-end application files for Next.js `index.js`.
- **hardhat.config.js**: Hardhat configuration for blockchain development.
- **package.json**: Dependencies and project scripts.
- **artifacts/**: Contains the compiled smart contract ABI and bytecode.

## Smart Contract

The `SinglePlayerTicTacToe.sol` contract implements a Tic Tac Toe game where:

- **startGame**: Initializes the game and sets the first player.
- **makeMove**: Allows the player to make a move on the board.
- **getBoard**: Returns the current state of the board.
- **gameActive**: Indicates whether the game is currently active.
- **currentSymbol**: Tracks the current player's symbol (X or O).
- **winner**: The address of the winner once the game ends.

### Smart Contract Functions:

- **startGame**: Starts a new game by setting up an empty board and assigning the first player.
- **makeMove**: Allows the player to make a move at a specific position on the board.
- **checkWinner**: Checks if there is a winner based on the current board state.
- **isBoardFull**: Checks if the board is full and the game is over.
- **getBoard**: Returns the current board state.

## Front-end Functionality

The front-end application is built using Next.js and allows users to:

1. **Connect to MetaMask**: Users connect their wallet to the dApp using MetaMask.
2. **Start the Game**: The user can start a new game by calling the `startGame` function.
3. **Make Moves**: The user can make moves on the Tic Tac Toe board.
4. **Game State**: Displays the current board, the player's symbol, and the winner once the game ends.

## Features

- **Smart Contract Integration**: The Tic Tac Toe game logic is entirely managed on-chain, ensuring transparency and immutability.
- **MetaMask Wallet Integration**: Users must connect their MetaMask wallet to interact with the game.
- **Real-time Game State**: The front-end fetches the current game state directly from the smart contract.
- **Player Actions**: Users can make moves, start a new game, and see the winner once the game concludes.

## Authors

John Gabriel T. Pagtlaunan  
- Personal Email: j.g.pagtalunan14@gmail.com
- School Email: 202120016@fit.edu.ph
- GitHub: [@SirJohnGabriel](https://github.com/SirJohnGabriel)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
