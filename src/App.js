import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import { ethers } from 'ethers';


function App() {
  const [walletAccount, setWalletAccount] = useState("");

  const checkIfMetaMaskIsConnected = async () => {
    try {
      console.log("cargando ...")
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Check if Metamask is installed.");
    } else {
      console.log("you have metamask");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    if (accounts.length != 0) {
      setWalletAccount(accounts[0]);
    } else {
      console.log("No authorized account");
    }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    checkIfMetaMaskIsConnected();
  }, []);

  const connectMetamask = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setWalletAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <button onClick={connectMetamask}>{walletAccount ?walletAccount :"conectate"}</button>
        {/* {wallet} */}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
