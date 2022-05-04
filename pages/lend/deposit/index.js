import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import Button from "@/components/Button/Button";
import useStore from "@/store/store";
import styles from "./Deposit.module.css";
import Input from "@/components/Input/Input";

import tokens from "../../../tokens.json";
import incraseGasLimit from "@/helpers/incraseGasLimit";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const history = useRouter();
  const { ponds, contracts } = useStore((state) => ({
    ponds: state.ponds,
    contracts: state.contracts,
    provider: state.provider,
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

  const onDeposit = async () => {
    try {
      // let gasPriceBN = await provider.getGasPrice();

      // let providerGasPrice = ethers.utils.formatUnits(gasPriceBN, "gwei");

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

      let approveExpectedGasLimit = await tokenContract.estimateGas.approve(
        pondAddress,
        parsedAmount
      );

      let incrasedApproveGasLimit = incraseGasLimit(
        approveExpectedGasLimit,
        1.2
      );

      await tokenContract.approve(pondAddress, parsedAmount, {
        // gasPrice: ethers.utils.parseUnits(String(providerGasPrice * 2), "gwei"),
        gasLimit: incrasedApproveGasLimit,
      });

      let expectedDepositGasLimit = await currentPond.ref.estimateGas.deposit(
        parsedAmount
      );
      let incrasedDepositGasLimit = incraseGasLimit(
        expectedDepositGasLimit,
        1.2
      );

      await currentPond.ref.deposit(parsedAmount, {
        gasLimit: incrasedDepositGasLimit,
      });

      // history.replace("/");
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
        <h1>{`Deposit ${
          tokens.find(
            (element) => element.address === currentPond.details._params.token
          ).symbol
        } in ${currentPond.details._params.name}`}</h1>
      )}
      <Input {...{ value: amount, onChange, placeholder: "Amount" }} />
      <Button {...{ label: "Deposit", onClick: onDeposit }} />
    </div>
  );
}
