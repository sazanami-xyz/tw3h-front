import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/SbtToken.json";


const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();

    /*
     * First make sure we have access to the Ethereum object.
     */
    if (!ethereum) {
      console.error("Make sure you have Metamask!");
      return null;
    }

    console.log("We have the Ethereum object", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0x5bF56Ed81643817c2218756aDae229BEa1D10bE7";
  
  const contractABI = abi.abi;
  
  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const mint = async() => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const stbContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log(currentAccount);
        await stbContract.safeMint(currentAccount);
        console.log("sbt mint!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(async () => {
    const account = await findMetaMaskAccount();
    if (account !== null) {
      setCurrentAccount(account);
    }
  }, []);
  
  return (

    <div class="v2_16">
      <div class="v13_51">
        <div class="v13_52"></div>
        <div class="v13_53"><a href="./study.html"><span class="v13_54">学習</span></a><div class="v13_55"></div>
        </div>
        <div class="v13_56"><span class="v13_57">設定</span><div class="v13_58"></div>
        </div>
        <div class="v13_59"><a href="./history.html"><span class="v13_60">学習履歴</span></a><div class="v13_61"></div>
        </div>
        <div class="v13_62"><a href="./home.html"><span class="v13_63">HOME</span></a><div class="v13_64"></div>
        </div>
      </div>
      <div class="v13_48"><div class="v13_49"><span class="v13_50">ぼくイキ！</span></div></div>

      {currentAccount && (
      <div class="v13_111" onClick={mint}><div class="v13_102"></div><span class="v13_110">トークンを取得</span></div>
      )}
      {!currentAccount && (
      <div class="v13_111" onClick={connectWallet}><div class="v13_102"></div><span class="v13_110">ウォレット登録</span></div>
      )}
      
      <div class="v13_112"><div class="v13_100"></div><span class="v13_103">ユーザー情報</span></div>
    </div>
  );
}
