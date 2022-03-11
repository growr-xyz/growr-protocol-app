import styles from "./Dropdown.module.css";

function Dropdown({ id, value, options, onChange, placeholder }) {
  return (
    <select
      className={styles.select}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    >
      <option value="" disabled selected hidden>
        {placeholder}
      </option>
      {options.map(({ label, value: optionValue }) => (
        <option value={optionValue}>{label}</option>
      ))}
    </select>
  );
}

export default Dropdown;
