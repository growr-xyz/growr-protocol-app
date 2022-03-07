import { useBalance } from "@/store/store";
import styles from "./Balances.module.css";
import Balance from "./components/Balance";

function Balances() {
  const nativeBalance = useBalance();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Balances</h1>
      <div className={styles.balances}>
        <Balance {...{ label: "RBTC", value: nativeBalance }} />
        {/* <Balance {...{ label: "RBTC", value: 0.051204 }} /> */}
      </div>
    </div>
  );
}

export default Balances;
