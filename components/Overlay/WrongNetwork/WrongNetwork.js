import Button from "@/components/Button/Button";
import styles from "./WrongNetwork.module.css";

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

function WrongNetwork() {
  const connect = async (network) => {
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

  return (
    <div className={styles.container}>
      <h2 className={styles.label}>Wrong chain</h2>
      <Button
        label="Connect ot RSK network"
        onClick={() => connect("rskMainNet")}
      />
      <Button
        label="Connect ot RSK Test network"
        onClick={() => connect("rskTestNet")}
      />
    </div>
  );
}

export default WrongNetwork;
