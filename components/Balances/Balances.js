import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, useBalance, useContracts } from "@/store/store";
import styles from "./Balances.module.css";
import Balance from "./components/Balance";

import tokensConfig from "../../tokens.json";

function Balances() {
  // const nativeBalance = useBalance();
  const account = useAccount();
  const contracts = useContracts();
  const nativeTokenBalance = useBalance();
  const [tokens, setTokens] = useState();

  useEffect(() => {
    (async () => {
      const tokensDetailsPromises = tokensConfig.map(
        async ({ symbol, native }) => {
          let balance;
          if (native) {
            balance = nativeTokenBalance;
          } else {
            const _balance = await contracts[symbol].balanceOf(account);
            balance = ethers.utils.formatUnits(_balance);
          }
          console.log(
            "Token:",
            symbol,
            ", Address: ",
            contracts[symbol].address
          );
          return {
            symbol,
            balance,
            address: contracts[symbol].address,
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
            <Balance
              key={address}
              {...{ label: symbol, value: balance, token: address }}
            />
          ))}
      </div>
    </div>
  );
}

export default Balances;
