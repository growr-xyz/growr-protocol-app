import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import Button from "@/components/Button/Button";
import useStore from "@/store/store";
import styles from "./Withdraw.module.css";
import Input from "@/components/Input/Input";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const history = useRouter();
  const { ponds } = useStore((state) => ({
    ponds: state.ponds,
  }));

  const [currentPond, setCurrentPond] = useState(null);

  useEffect(() => {
    if (history.query.pondIndex) {
      const pond = ponds.find(
        ({ index }) => index === Number(history.query.pondIndex)
      );
      setCurrentPond(pond);
    }
  }, [history.query.pondIndex]);

  const onChange = (e) => {
    setAmount(e.target.value);
  };

  const onWithdraw = async () => {
    try {
      const parsedAmount = ethers.utils.parseUnits(amount, "ether");

      await currentPond.ref.withdraw(parsedAmount);

      history.replace("/");
    } catch (err) {
      console.log("Withdraw error: ", JSON.stringify(err, undefined, 2));

      if (err.data) {
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      {currentPond && (
        <h1>{`Withdraw from ${currentPond.details._params.name}`}</h1>
      )}
      <Input {...{ value: amount, onChange, placeholder: "Amount" }} />
      <Button {...{ label: "Withdraw", onClick: onWithdraw }} />
    </div>
  );
}
