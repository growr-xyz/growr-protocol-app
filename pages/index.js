/* eslint-disable no-unused-vars */
import Image from "next/image";

import { BigNumber, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import useEthers from "@/hooks/useEthers";
import useWallet, { useAccount, useDispatch, useEthereum } from "@/store/store";

import Button from "@/components/Button/Button";

import mockAbi from "../abi/xUSDMocked.json";
import pondFactoryPond from "../abi/PondFactory.json";
import pondAbi from "../abi/Pond.json";
import Balances from "@/components/Balances/Balances";

const networksConfig = {
  rskMainNet: {
    chainId: `0x${Number(30).toString(16)}`, // A 0x-prefixed hexadecimal string
    chainName: "RSK Mainnet",
    nativeCurrency: { name: "RSK Mainnet Ether", symbol: "RBTC", decimals: 18 },
    rpcUrls: ["https://public-node.rsk.co", "https://mycrypto.rsk.co"],
    blockExplorerUrls: ["https://explorer.rsk.co"],
  },
  rskTestNet: {
    chainId: `0x${Number(31).toString(16)}`, // A 0x-prefixed hexadecimal string
    chainName: "RSK Testnet",
    nativeCurrency: {
      name: "RSK Testnet Ether",
      symbol: "tRBTC",
      decimals: 18,
    },
    rpcUrls: [
      "https://public-node.testnet.rsk.co",
      "https://mycrypto.testnet.rsk.co",
    ],
  },
};

const xUSDaddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const pondFactoryAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

const defaultParams = {
  name: "Pond 1",
  token: null,
  minLoanAmount: 100,
  maxLoanAmount: 500,
  minLoanDuration: 1,
  maxLoanDuration: 12,
  annualInterestRate: 20,
  disbursmentFee: 5,
  cashBackRate: 5,
};
const defaultCriteria = {
  names: ["citizenship"],
  types: ["string"],
  contents: ["SV"],
  operations: ["="],
};

export default function Home() {
  const [currentNetwork, setCurrentNetwork] = useState("");
  const [contract, setContract] = useState(null);
  const [pondContract, setPondContract] = useState(null);
  const [createdPond, setCreatedPond] = useState(null);
  const dispatch = useDispatch();

  const { connected } = useWallet();

  const walletProvider = useEthereum();
  const account = useAccount();

  // useEffect(() => {
  //   console.log("mockAbi", mockAbi);
  //   if (walletProvider && account) {
  //     let singer = walletProvider.getSigner();
  //     console.log("singer", singer);
  //     let contractInstance = new ethers.Contract(xUSDaddress, mockAbi, singer);
  //     setContract(contractInstance);
  //     console.log("contractInstance", contractInstance);
  //   }
  // }, [walletProvider, account]);

  // useEffect(() => {
  //   console.log("mockAbi", mockAbi);
  //   if (walletProvider && account) {
  //     let singer = walletProvider.getSigner();
  //     console.log("singer", singer);
  //     let contractInstance = new ethers.Contract(
  //       pondFactoryAddress,
  //       pondFactoryPond,
  //       singer
  //     );
  //     setPondContract(contractInstance);
  //     console.log("Pond contractInstance", contractInstance);
  //   }
  // }, [walletProvider, account]);

  const createPond = async () => {
    if (pondContract) {
      try {
        defaultParams.token = xUSDaddress;

        const details = await pondContract.createPond(
          defaultParams,
          defaultCriteria
        );
        setCreatedPond(details);
        console.log("createPond", details);
      } catch (err) {
        console.log("createPond error: ", err);
      }
    }
  };

  const getBalance = async () => {
    if (contract) {
      try {
        const balance = await contract.balanceOf(account);
        console.log(ethers.utils.formatUnits(balance));
      } catch (err) {
        console.log("getBalance error: ", err);
      }
    }
  };

  const getUserPonds = async () => {
    if (pondContract) {
      try {
        const userPonds = await pondContract.getUserPonds(account);
        console.log("userPonds", userPonds);
      } catch (err) {
        console.log("getBalance error: ", err);
      }
    }
  };

  // const getPondDetails = async () => {
  //   try {
  //     let singer = walletProvider.getSigner();
  //     let contractInstance = new ethers.Contract(
  //       createPond.data,
  //       pondAbi,
  //       singer
  //     );

  //     let details = await contractInstance.getDetails();

  //     console.log("details", details);
  //   } catch (err) {
  //     console.log("getPondDetails err:", err);
  //   }
  // };

  // eslint-disable-next-line no-unused-vars
  const changeNetwork = async (network) => {
    const selectedNetworkConfig = networksConfig[network];
    try {
      // eslint-disable-next-line no-undef
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [selectedNetworkConfig],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const connect = () => {
    dispatch({ method: "connect" });
  };

  return (
    <div className={styles.container}>
      {connected ? (
        <Balances />
      ) : (
        <div className={styles.connectWallet}>
          <Button label="Connect Wallet" onClick={connect} />
        </div>
      )}
    </div>
  );
}
