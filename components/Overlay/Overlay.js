import { useOverlay } from "@/store/store";
import styles from "./Overlay.module.css";
import WrongNetwork from "./WrongNetwork/WrongNetwork";

function Overlay() {
  const { active, type } = useOverlay();

  const renderWidget = () => {
    if (type) {
      switch (type) {
        case "wrongChain":
          return <WrongNetwork />;

        default:
          break;
      }
    }
    return null;
  };
  return active ? (
    <div className={styles.container}>{renderWidget()}</div>
  ) : null;
}

export default Overlay;
