/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { ethers } from "ethers";
import { useEffect } from "react";
import { useChainId, useDispatch, useEthereum } from "@/store/store";

const allowedChains = [
  "0.00000000000000003",
  "0.000000000000031337",
  "0.000000000000000031",
];

const useEthers = () => {
  const ethereum = useEthereum();
  const chainId = useChainId();
  const dispatch = useDispatch();

  // initialize the store passing the provider
  useEffect(() => {
    // window.ethereum
    //   .request({ method: "eth_accounts" })
    //   .then((accounts) => {
    //     window.ethereum
    //       .request({
    //         method: "eth_getBalance",
    //         params: [accounts[0], "latest"],
    //       })
    //       .then((balance) => {
    //         console.log("balance", ethers.utils.formatUnits(balance));
    //       })
    //       .catch((err) => {
    //         // Some unexpected error.
    //         // For backwards compatibility reasons, if no accounts are available,
    //         // eth_accounts will return an empty array.
    //         console.error(err);
    //       });
    //   })
    //   .catch((err) => {
    //     // Some unexpected error.
    //     // For backwards compatibility reasons, if no accounts are available,
    //     // eth_accounts will return an empty array.
    //     console.error(err);
    //   });

    // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // let provider = new ethers.providers.JsonRpcProvider(
    //   "https://mainnet.infura.io/v3/46bd9dab08c44bc59f4db12a18ed7f25"
    // );

    // console.log("provider", provider.getNetwork().then(console.log));

    // provider.on("accountsChanged", (accounts) => {
    //   console.log("accounts", accounts);
    // });
    dispatch({ method: "attemptToConnect", params: [window.ethereum] });
  }, []);

  // detect network change
  useEffect(() => {
    if (ethereum && chainId) {
      if (!allowedChains.includes(chainId)) {
        dispatch({ method: "toggleOverlay", params: ["wrongChain"] });
      }
      ethereum.on("chainChanged", (newChainId) => {
        const parsedChainId = ethers.utils.formatUnits(newChainId);
        if (!allowedChains.includes(parsedChainId)) {
          dispatch({ method: "toggleOverlay", params: ["wrongChain"] });
          return;
        }
        dispatch({ method: "toggleOverlay" });
      });
    }
  }, [ethereum, chainId]);

  useEffect(() => {
    if (ethereum) {
      ethereum.on("accountsChanged", (accounts) => {
        dispatch({ method: "changeAccount", params: [accounts[0]] });
      });
    }
  }, [dispatch, ethereum]);
};

export default useEthers;
