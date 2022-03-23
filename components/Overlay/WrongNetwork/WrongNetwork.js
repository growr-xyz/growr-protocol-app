import Button from "@/components/Button/Button";
import styles from "./WrongNetwork.module.css";

import networksConfig from "../../../forcedNetworks.json";

function WrongNetwork() {
  const connect = async (network) => {
    let selectedNetworkConfig = networksConfig[network];
    selectedNetworkConfig.chainId = `0x${Number(selectedNetworkConfig.chainId).toString(16)}`; // A 0x-prefixed hexadecimal string
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
      <Button
        label="Connect ot Localhost"
        onClick={() => connect("localhost")}
      />
    </div>
  );
}

export default WrongNetwork;
