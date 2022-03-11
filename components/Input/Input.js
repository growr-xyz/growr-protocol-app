import styles from "./Input.module.css";

function Input({
  id,
  error,
  name,
  value,
  type,
  placeholder,
  onChange,
  disabled,
}) {
  return (
    <input
      {...{
        id,
        className: `${styles.input} ${error && styles.error} ${
          disabled && styles.disabled
        }`,
        name,
        value,
        type,
        placeholder,
        onChange,
        disabled,
      }}
    />
  );
}

export default Input;
