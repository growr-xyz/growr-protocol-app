/* eslint-disable no-unused-vars */
import Image from "next/image";

import { BigNumber, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import getConfig from "next/config";
import styles from "../styles/Home.module.css";
import useEthers from "@/hooks/useEthers";
import useWallet, { useContracts, useDispatch } from "@/store/store";

import Button from "@/components/Button/Button";

import Balances from "@/components/Balances/Balances";
import Ponds from "@/components/Ponds/Ponds";

import tokens from "../tokens.json";

export default function Home() {
  const dispatch = useDispatch();
  const { pondFactory } = useContracts();

  const { connected } = useWallet();

  useEffect(() => {
    console.log("pondFactory", pondFactory);
  }, [pondFactory]);

  const connect = () => {
    // eslint-disable-next-line no-undef
    dispatch({ method: "connect", params: [window.ethereum] });
  };

  return (
    <div className={styles.container}>
      {connected ? (
        <>
          <Balances />
          <Ponds label="Ponds" />
        </>
      ) : (
        <div className={styles.connectWallet}>
          <Button label="Connect Wallet" onClick={connect} />
        </div>
      )}
    </div>
  );
}
