import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import Logo from "../Icons/Logo";

const navConfig = [
  {
    label: "My Dashboard",
    href: "/",
  },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "Lend",
    href: "/lend",
  },
  {
    label: "Borrow",
    href: "/borrow",
  },
];

export default function Navbar() {
  const router = useRouter();
  console.log("router", router);
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.navContainer}>
        {navConfig.map(({ href, label }) => {
          let className = [styles.navItem];

          if (router.pathname === href) {
            className.push(styles.activeNavItem);
          }

          return (
            <span className={className.join(" ")} key={href}>
              <Link href={href}>
                <a>{label}</a>
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
