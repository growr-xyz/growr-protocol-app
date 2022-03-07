import truncateText from "@/helpers/truncateAccount";
import { useAccount } from "@/store/store";
import { useRouter } from "next/router";
import styles from "./Header.module.css";

const titleMap = {
  "/": "My Dashboard",
  "/marketplace": "Marketplace",
  "/lend": "Lend",
  "/borrow": "Borrow",
};

const Header = () => {
  let { asPath } = useRouter();
  let account = useAccount();

  const title = titleMap[asPath] || "Title now available for this page";
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {account ? (
        <div className={styles.accountContainer}>
          <div className={styles.accountCircle}></div>
          <span className={styles.account}>{truncateText(account)}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
