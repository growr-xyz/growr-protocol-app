import styles from "./Balance.module.css";

function Balance({ label, value }) {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        {/* <div>icon</div> */}
        <div className={styles.label}>{label}</div>
      </div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

export default Balance;
