import { ethers } from "ethers";

const connect = (set, get) => async () => {
  const { ethereum } = get();

  if (ethereum) {
    try {
      const accounts = await ethereum.send("eth_requestAccounts", []);
      const balance = await ethereum.request({
        method: "eth_getBalance",
        params: [ethereum.selectedAddress, "latest"],
      });

      const parsedBalance = ethers.utils.formatUnits(balance);

      const chainId = await ethereum.request({ method: "eth_chainId" });
      const parsedChainId = ethers.utils.formatUnits(chainId);

      set({
        ethereum,
        account: accounts.result[0],
        balance: parsedBalance,
        connected: true,
        chainId: parsedChainId,
      });
    } catch (error) {
      console.log("error", error);
      set({ error });
    }
  }
};

export default connect;
