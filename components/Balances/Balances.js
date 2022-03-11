import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, useContracts } from "@/store/store";
import styles from "./Balances.module.css";
import Balance from "./components/Balance";

import tokensConfig from "../../tokens.json";

function Balances() {
  // const nativeBalance = useBalance();
  const account = useAccount();
  const contracts = useContracts();

  const [tokens, setTokens] = useState();

  useEffect(() => {
    (async () => {
      const tokensDetailsPromises = tokensConfig.map(
        async ({ symbol, address }) => {
          const balance = await contracts[symbol].balanceOf(account);

          return {
            symbol,
            balance: ethers.utils.formatUnits(balance),
            address,
          };
        }
      );
      const tokensDetails = await Promise.all(tokensDetailsPromises);
      setTokens(tokensDetails);
    })();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Balances</h1>
      <div className={styles.balances}>
        {/* <Balance {...{ label: "RBTC", value: nativeBalance }} /> */}
        {tokens &&
          tokens.map(({ symbol, balance, address }) => (
            <Balance {...{ label: symbol, value: balance, token: address }} />
          ))}
      </div>
    </div>
  );
}

export default Balances;
