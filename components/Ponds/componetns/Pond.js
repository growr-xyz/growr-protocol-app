import Link from "next/link";
import styles from "./Pond.module.css";

function Pond({ label, tokenSymbol, value, index }) {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        {/* <div>icon</div> */}
        <div className={styles.label}>{label}</div>
      </div>
      <div className={styles.labelContainer}>
        <div className={styles.value}>{tokenSymbol}</div>
      </div>
      <div className={styles.value}>{value}</div>
      <div className={styles.links}>
        <Link
          className={styles.link}
          href={{
            pathname: "/lend/deposit",
            query: { pondIndex: index },
          }}
        >
          Deposit
        </Link>
        <Link
          className={styles.link}
          href={{
            pathname: "/lend/withdraw",
            query: { pondIndex: index },
          }}
        >
          Withdraw
        </Link>
      </div>
    </div>
  );
}

export default Pond;
