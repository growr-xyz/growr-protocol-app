import styles from "./Button.module.css";

const Button = ({ label, onClick, disabled = false, loading, style }) => {
  if (loading) {
    return (
      <button className={`${styles.button} ${styles.loading}`}>
        <div className={styles.loader}></div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${style ?? style} ${styles.button}`}
    >
      {label}
    </button>
  );
};

export default Button;
