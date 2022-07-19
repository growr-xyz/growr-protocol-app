import Link from "next/link";
import styles from "./Balance.module.css";

function Balance({ label, value, token }) {
  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{Math.round(value * 100) / 100}</div>
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
