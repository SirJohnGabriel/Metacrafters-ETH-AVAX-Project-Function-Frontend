# Starter Next/Hardhat Project

This project is a starter template combining the Next.js framework for front-end development with Hardhat for Ethereum-based smart contract development.

## Description

The project sets up an environment for developing and deploying smart contracts alongside a user-friendly web interface. It integrates Hardhat for blockchain testing and deployment and Next.js for the client-side interface. This structure is ideal for decentralized applications (dApps) development.

## Getting Started

### Prerequisites

Before starting, ensure the following are installed on your machine:

1. **Node.js**: Download and install from [Node.js Official Website](https://nodejs.org).
2. **npm or yarn**: Comes with Node.js installation. Check if it's installed using `npm -v`.
3. **VS Code**: Recommended for development ([Download here](https://code.visualstudio.com/)).

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

   This will deploy your smart contracts to the local blockchain.

4. **Run the Front-end**: In the first terminal, start the Next.js development server:

   ```bash
   npm run dev
   ```

   Open your browser and navigate to [http://localhost:3000/](http://localhost:3000/) to view the application.

## Project Structure

- **contracts/**: Solidity smart contracts.
- **scripts/**: Deployment scripts for Hardhat.
- **pages/**: Front-end application files for Next.js.
- **hardhat.config.js**: Hardhat configuration for blockchain development.
- **package.json**: Dependencies and project scripts.

## Features

- **Smart Contract Development**: Built with Hardhat, allowing contract deployment and testing.
- **Next.js Integration**: Front-end built with Next.js for a modern, responsive interface.
- **Local Blockchain Testing**: Includes a Hardhat node for simulating Ethereum blockchain locally.

## Authors

John Gabriel T. Pagtlaunan  
- Personal Email: j.g.pagtalunan14@gmail.com
- School Email: 202120016@fit.edu.ph
- GitHub: [@SirJohnGabriel](https://github.com/SirJohnGabriel)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.