import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";
import Logo from "../Icons/Logo";
import { useConnected } from "@/store/store";

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

  const connected = useConnected();

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.navContainer}>
        {navConfig.map(({ href, label }) => {
          const className = [styles.navItem];

          if (router.pathname === "/" && href === "/") {
            className.push(styles.activeNavItem);
          }

          if (router.pathname.startsWith(href) && href !== "/") {
            className.push(styles.activeNavItem);
          }

          if (!connected && href !== "/") {
            className.push(styles.disabled);

            return (
              <span className={className.join(" ")} key={href}>
                <a href={href}>{label}</a>
              </span>
            );
          }

          return (
            <span className={className.join(" ")} key={href}>
              <Link href={href}>
                <a href={href}>{label}</a>
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
