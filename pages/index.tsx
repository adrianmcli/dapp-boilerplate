import { FC, useState } from "react";
import { ethers } from "ethers";
import { Erc20__factory } from "../contracts/types";

const Index: FC = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [account, setAccount] = useState<string>();
  const [tokenBalance, setTokenBalance] = useState<string>();

  const connect = async () => {
    if (!window.ethereum?.request) {
      alert("MetaMask is not installed!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setProvider(provider);
    setAccount(accounts[0]);
  };

  const getTokenBalance = async () => {
    if (provider && account) {
      const TOKEN_ADDR = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
      const token = Erc20__factory.connect(TOKEN_ADDR, provider.getSigner());

      const rawBalance = await token.balanceOf(account);
      const decimals = await token.decimals();

      const balance = ethers.utils.formatUnits(rawBalance, decimals);
      setTokenBalance(balance);
    }
  };

  return (
    <>
      <button onClick={connect}>Connect</button>
      <p>Account: {account}</p>
      <button onClick={getTokenBalance}>Get Token Balance</button>
      <p>Token Balance: {tokenBalance}</p>
    </>
  );
};

export default Index;
