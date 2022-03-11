import Link from "next/link";
import Button from "@/components/Button/Button";
import Ponds from "@/components/Ponds/Ponds";
import styles from "./Lend.module.css";

export default function Lend() {
  return (
    <div className={styles.container}>
      <Ponds />
      <Link href="/lend/create">
        <Button label="Create Pond" />
      </Link>
    </div>
  );
}
