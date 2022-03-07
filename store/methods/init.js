import { ethers } from "ethers";
import pondFactoryPond from "../../abi/PondFactory.json";

const pondFactoryAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

const init = (set) => async (ethereum) => {
  try {
    if (!ethereum) {
      throw new Error("metamask not presend");
    }
    let newState = {
      ethereum,
    };
    console.log("ethereum", ethereum);
    console.log("ethereum.selectedAddress", ethereum.selectedAddress);
    // check if Metamask is already connected
    if (ethereum.selectedAddress) {
      // let accounts = await ethereum.send("eth_accounts", []);

      const chainId = await ethereum.request({ method: "eth_chainId" });

      const parsedChainId = ethers.utils.formatUnits(chainId);

      const nativeBalance = await ethereum.request({
        method: "eth_getBalance",
        params: [ethereum.selectedAddress, "latest"],
      });

      const provider = new ethers.providers.Web3Provider(ethereum, "any");

      const signer = provider.getSigner();

      const pondFactory = new ethers.Contract(
        pondFactoryAddress,
        pondFactoryPond,
        signer
      );

      newState = {
        ...newState,
        account: ethereum.selectedAddress,
        balance: ethers.utils.formatUnits(nativeBalance),
        connected: true,
        provider,
        contracts: {
          pondFactory,
        },
        chainId: parsedChainId,
      };
    }

    set(newState);
  } catch (err) {
    console.log("init error", err);
    set({ error: err });
  }
};

export default init;
