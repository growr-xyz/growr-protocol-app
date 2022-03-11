import Link from "next/link";
import styles from "./Balance.module.css";

function Balance({ label, value, token }) {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        {/* <div>icon</div> */}
        <div className={styles.label}>{label}</div>
      </div>
      <div className={styles.value}>{value}</div>
      <div className={styles.links}>
        <Link
          className={styles.link}
          href={{
            pathname: "/lend/create",
            query: { token },
          }}
        >
          Lend
        </Link>
      </div>
    </div>
  );
}

export default Balance;
