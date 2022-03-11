import { useRouter } from "next/router";
import truncateText from "@/helpers/truncateAccount";
import { useAccount } from "@/store/store";
import styles from "./Header.module.css";

const titleMap = {
  // "/": "My Dashboard",
  "/marketplace": "Marketplace",
  "/lend": "Lend",
  "/lend/create": "Lend",
  "/lend/deposit": "Lend",
  "/borrow": "Borrow",
};

function Header() {
  const { asPath } = useRouter();
  const account = useAccount();
  let title;
  if (asPath !== "/") {
    const result = Object.entries(titleMap).find(([path]) =>
      asPath.startsWith(path)
    );
    // eslint-disable-next-line prefer-destructuring
    if (result) title = result[1];
  } else if (asPath === "/") {
    title = "My Dashboard";
  } else {
    title = "Title not available for this page";
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {account ? (
        <div className={styles.accountContainer}>
          <div className={styles.accountCircle} />
          <span className={styles.account}>{truncateText(account)}</span>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
