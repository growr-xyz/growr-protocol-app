import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import useStore from "@/store/store";
import styles from "./Details.module.css";
import PondDetails from "./components/PondDetails";

import tokens from "../../../tokens.json";

export default function Details() {
    const history = useRouter();
    const { ponds, contracts } = useStore((state) => ({
        ponds: state.ponds,
        contracts: state.contracts,
    }));
    const [currentPond, setCurrentPond] = useState(null);
    const [currentPondParams, setCurrentPondParams] = useState();

    console.log(currentPond);

    useEffect(() => {
        if (history.query.pondIndex) {
            const pond = ponds.find(
                ({ index }) => index === Number(history.query.pondIndex)
            );
            setCurrentPond(pond);
            setCurrentPondParams(pond.details._params);
        }
    }, [history.query.pondIndex]);

    return (
        <div className={styles.container}>
            {currentPond && (
                <h1>{`${currentPondParams.name}`}</h1>
            )}
            {currentPond && (
                <PondDetails {...{
                    name: currentPondParams.name,
                    token: tokens.find(element => element.address === currentPondParams.token).symbol,
                    apr: Number(currentPondParams.annualInterestRate),
                    disb: Number(currentPondParams.disbursmentFee),
                    cashback: Number(currentPondParams.cashBackRate),
                    maxAmount: ethers.utils.formatUnits(currentPondParams.maxLoanAmount),
                    minAmount: ethers.utils.formatUnits(currentPondParams.minLoanAmount),
                    maxDuration: Number(currentPondParams.maxLoanDuration),
                    minDuration: Number(currentPondParams.minLoanDuration),
                    eligibilityCriteria: Object.keys(currentPond.details._criteria).reduce(function (arr, key) {
                        return arr.concat(
                            "'",
                            currentPond.details._criteria[key]._name, " ",
                            currentPond.details._criteria[key]._operator, " ",
                            currentPond.details._criteria[key]._content, "' "
                        );
                    }, []),
                    total: ethers.utils.formatUnits(currentPond.details._totalDeposited),
                    utilized: ethers.utils.formatUnits(currentPond.details._totalUtilized),
                    interest: ethers.utils.formatUnits(currentPond.details._totalInterest)
                }} />
            )}

        </div>
    );
}
