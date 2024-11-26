import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/SinglePlayerTicTacToe.sol/SinglePlayerTicTacToe.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [recipient, setRecipient] = useState("");
  const [sendAmount, setSendAmount] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  // const getBalance = async() => {
  //   if (atm) {
  //     setBalance((await atm.getBalance()).toNumber());
  //   }
  // }

  const getBalance = async() => {
    if (atm) {
      const balanceInWei = await atm.getBalance();

      setBalance(ethers.utils.formatEther(balanceInWei));
    }
  }

  // const deposit = async() => {
  //   if (atm) {
  //     let tx = await atm.deposit(1);
  //     await tx.wait()
  //     getBalance();
  //   }
  // }

  const deposit = async () => {
    if (atm) {
      try {
        const depositAmount = ethers.utils.parseEther("1");
        let tx = await atm.deposit(depositAmount);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Deposit failed:", error);
      }
    }
  }
  

  // const withdraw = async() => {
  //   if (atm) {
  //     let tx = await atm.withdraw(1);
  //     await tx.wait()
  //     getBalance();
  //   }
  // }

  const withdraw = async() => {
    if (atm) {
      try {
        const withdrawAmount = ethers.utils.parseEther("1");
        let tx = await atm.withdraw(withdrawAmount);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Withdraw failed:", error);
      }
    }
  }

  // const resetBal = async() => {
  //   if (atm) {
  //     let tx = await atm.resetBal();
  //     await tx.wait()
  //     getBalance();
  //   }
  // }

  const resetBal = async () => {
    if (atm) {
      try {
        let tx = await atm.resetBal();  
        await tx.wait(); 
        getBalance(); 
      } catch (error) {
        console.error("Reset failed:", error);
      }
    }
  };
  
  // const sendEth = async () => {
  //   if (atm) {
  //     try {

  //       if (!ethers.utils.isAddress(recipient)) {
  //         alert("Invalid recipient address");
  //         return;
  //       }

  //       const amountInWei = ethers.utils.parseEther(sendAmount);

  //       console.log(`Amount in Wei: ${amountInWei}, Send Amount: ${sendAmount}, Recipient: ${recipient}`);

  //       let tx = await atm.send(amountInWei, recipient, {
  //         gasLimit: 1000000
  //       });
  //       await tx.wait()

  //       getBalance();

  //       alert(`Successfuly sent ${sendAmount} ETH to ${recipient}`);
  //     }
  //     catch (error) {
  //       if (error.code === ethers.errors.UNPREDICTABLE_GAS_LIMIT) {
  //         alert("Gas estimation failed. Please check the transaction inputs.");
  //       } else {
  //         alert("Transaction failed. Please ensure inputs are correct.");
  //       }
  //       console.error("Send Failed: ", error);
  //     }
  //   }
  // };

  const sendEth = async () => {
    try {
      const amountInWei = ethers.utils.parseEther(sendAmount);
  
      if (!ethers.utils.isAddress(recipient)) {
        alert("Invalid recipient address");
        return;
      }
  
      const contractBalance = await provider.getBalance(atm.address);
      if (contractBalance.lt(amountInWei)) {
        alert("The contract has insufficient balance.");
        return;
      }
  
      // Use estimated gas
      const estimatedGas = await atm.estimateGas.send(amountInWei, recipient);
      console.log(`Estimated Gas: ${estimatedGas.toString()}`);
  
      const tx = await atm.send(amountInWei, recipient, {
        gasLimit: estimatedGas.add(ethers.BigNumber.from("10000")), // Add buffer
      });
  
      await tx.wait();
      alert(`Successfully sent ${sendAmount} ETH to ${recipient}. Tx: ${tx.hash}`);
    } catch (error) {
      console.error("Send Failed: ", error);
      alert(`Transaction failed: ${error.message}`);
    }
  };  
  
  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <button onClick={resetBal}>Reset Balance</button>
        <br />
        <input 
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount to send (ETH)"
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value)}
        />
        <button onClick={sendEth}>Send</button>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Chris' ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}