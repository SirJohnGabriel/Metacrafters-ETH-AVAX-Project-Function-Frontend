import { useState, useEffect } from "react";
import { ethers } from "ethers";
import tttAbi from "../artifacts/contracts/SinglePlayerTicTacToe.sol/SinglePlayerTicTacToe.json";

export default function TicTacToe() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [board, setBoard] = useState([]);
  const [currentSymbol, setCurrentSymbol] = useState("");
  const [gameActive, setGameActive] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const tttABI = tttAbi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      console.log("Connected account:", accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
    setupContract();
  };

  const setupContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const tttContract = new ethers.Contract(contractAddress, tttABI, signer);
    setContract(tttContract);
  };

  const startGame = async () => {
    if (contract) {
      try {
        const tx = await contract.startGame();
        await tx.wait();
        fetchGameState();
        alert("Game started!");
      } catch (error) {
        console.error("Failed to start game:", error);
      }
    }
  };

  const fetchGameState = async () => {
    if (contract) {
      try {
        const gameBoard = await contract.getBoard();
        setBoard(gameBoard.map((cell) => (cell === 0 ? "" : cell === 1 ? "X" : "O")));
        setCurrentSymbol((await contract.currentSymbol()) === 1 ? "X" : "O");

        const active = await contract.gameActive();
        setGameActive(active);

        const gameWinner = await contract.winner();
        if (gameWinner !== "0x0000000000000000000000000000000000000000") {
          const winnerSymbol = gameWinner === account ? currentSymbol : currentSymbol === "O" ? "O" : "X";
          alert(`The winner is: ${winnerSymbol}`);
          setGameActive(false);
        }
      } catch (error) {
        console.error("Failed to fetch game state:", error);
      }
    }
  };

  const makeMove = async (index) => {
    if (contract) {
      try {
        const tx = await contract.makeMove(index);
        await tx.wait();
        fetchGameState();
        alert(`Move made at position ${index}`);
      } catch (error) {
        console.error("Failed to make move:", error);
      }
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to play the game.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect MetaMask</button>;
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        {gameActive ? (
          <>
            <p>Current Symbol: {currentSymbol}</p>
            <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 4em)",
                    gridTemplateRows: "repeat(3, 4em)",
                    gap: "5px",
                    justifyContent: "center",
                    margin: "20px auto",
                    marginLeft: "6em",
                    marginRight: "6em",
                    backgroundColor: "#212529",
                    padding: "1.5em",
                    borderRadius: "1em",
                }}
            >
              {board.map((cell, index) => (
                <button
                  key={index}
                  style={{
                    width: "2em",
                    height: "2em",
                    fontSize: "2em",
                    textAlign: "center",
                    lineHeight: "2em",
                    border: !!cell || !gameActive ? "2px solid #fff" : "2px solid #fff",
                    backgroundColor: !!cell || !gameActive ? "#540b0e" : "#184e77",
                    cursor: cell || !gameActive ? "not-allowed" : "pointer",
                    borderRadius: "15px",
                    color: !!cell || !gameActive ? "#fff" : "#000",
                  }}
                  onClick={() => makeMove(index)}
                  disabled={!!cell || !gameActive}
                >
                  {cell}
                </button>
              ))}
            </div>
          </>
        ) : (
          <button onClick={startGame}>Start Game</button>
        )}
      </div>
    );
  };

  useEffect(() => {
    getWallet();
    if (contract) {
      fetchGameState();
    }
  }, [contract]);

  return (
    <main className="container">
      <header>
        <h1 style={{ color: "#000" }}>Single Player Tic Tac Toe</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
            text-align: center;
            font-family: Arial, sans-serif;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
      `}</style>
    </main>
  );
  
}
