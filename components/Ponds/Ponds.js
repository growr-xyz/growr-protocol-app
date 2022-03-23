import { ethers } from "ethers";
import useStore from "@/store/store";
import styles from "./Ponds.module.css";
import Pond from "./componetns/Pond";

import tokensConfig from "../../tokens.json";

function Ponds({ label }) {
  const ponds = useStore((state) => state.ponds);
  console.log("ponds", ponds);
  // useEffect(() => {
  //   (async () => {
  //     if (account) {
  //       try {
  //         console.log("rDOC", rDOC);
  //         const balance = await contracts.rDOC.balanceOf(account);

  //         setRDOC(ethers.utils.formatUnits(balance));
  //       } catch (error) {
  //         console.log("rDOC balance error: ", error);
  //       }
  //     }
  //   })();
  // }, [account]);

  return (
    <div className={styles.container}>
      {label && <h1 className={styles.title}>{label}</h1>}
      <div className={styles.ponds}>
        {ponds.length ? (
          ponds.map(({ details, index }) => {
            const { name, token } = details._params;
            const tokenSymbol = tokensConfig.find(element => element.address === token).symbol;
            const value = ethers.utils.formatUnits(details._totalDeposited);
            return <Pond key={token} {...{ label: name, tokenSymbol, value, index }} />;
          })
        ) : (
          <div className={styles.dryPonds}>
            (You do not have any loans yet.)
          </div>
        )}
      </div>
    </div>
  );
}

export default Ponds;
