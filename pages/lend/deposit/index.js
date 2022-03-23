import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import Button from "@/components/Button/Button";
import useStore from "@/store/store";
import styles from "./Deposit.module.css";
import Input from "@/components/Input/Input";

import tokens from "../../../tokens.json";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const history = useRouter();
  const { ponds, contracts } = useStore((state) => ({
    ponds: state.ponds,
    contracts: state.contracts,
  }));
  const [currentPond, setCurrentPond] = useState(null);

  console.log(currentPond);

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

  const onDeposit = async () => {
    try {
      const parsedAmount = ethers.utils.parseUnits(amount, "ether");

      const pondTokenAddress = currentPond.details._params.token;
      const tokenConfig = tokens.find(
        ({ address }) => address === pondTokenAddress
      );

      const pondAddress = currentPond.ref.address;
      if (!tokenConfig) {
        throw new Error(
          `Token with address: ${pondTokenAddress} has no configuration`
        );
      }

      const tokenContract = contracts[tokenConfig.symbol];
      await tokenContract.approve(pondAddress, parsedAmount);

      await currentPond.ref.deposit(parsedAmount);

      history.replace("/");
    } catch (err) {
      console.log("deposit error: ", JSON.stringify(err, undefined, 2));

      if (err.data) {
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      {currentPond && (
        <h1>{`Deposit ${tokens.find(element => element.address === currentPond.details._params.token).symbol} in ${currentPond.details._params.name}`}</h1>
      )}
      <Input {...{ value: amount, onChange, placeholder: "Amount" }} />
      <Button {...{ label: "Deposit", onClick: onDeposit }} />
    </div>
  );
}
