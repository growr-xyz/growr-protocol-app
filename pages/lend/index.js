import Button from "@/components/Button/Button";
import styles from "./Lend.module.css";

export default function Lend() {
  //  useEffect(() => {
  //   console.log("mockAbi", mockAbi);
  //   if (walletProvider && account) {
  //     let singer = walletProvider.getSigner();
  //     console.log("singer", singer);
  //     let contractInstance = new ethers.Contract(
  //       pondFactoryAddress,
  //       pondFactoryPond,
  //       singer
  //     );
  //     setPondContract(contractInstance);
  //     console.log("Pond contractInstance", contractInstance);
  //   }
  // }, [walletProvider, account]);

  const createPond = async () => {
    // if (pondContract) {
    //   try {
    //     defaultParams.token = xUSDaddress;
    //     const details = await pondContract.createPond(
    //       defaultParams,
    //       defaultCriteria
    //     );
    //     setCreatedPond(details);
    //     console.log("createPond", details);
    //   } catch (err) {
    //     console.log("createPond error: ", err);
    //   }
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.connectWallet}>
        <Button label="Create Pond" onClick={createPond} />
      </div>
    </div>
  );
}
