import { useFormik } from "formik";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Button from "@/components/Button/Button";
import { useContracts } from "@/store/store";
import styles from "./Create.module.css";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown/Dropdown";

import tokens from "../../../tokens.json";

// const defaultParams = {
//   name: "Pond 1",
//   token: null,
//   minLoanAmount: 100,
//   maxLoanAmount: 500,
//   minLoanDuration: 1,
//   maxLoanDuration: 12,
//   annualInterestRate: 20,
//   disbursmentFee: 5,
//   cashBackRate: 5,
// };

const defaultCriteria = {
  names: ["citizenship"],
  types: ["string"],
  contents: ["SV"],
  operations: ["="],
};

const dropdownOptions = () =>
  tokens.map(({ symbol, address }) => ({ value: address, label: symbol }));

export default function Create() {
  const contracts = useContracts();
  const history = useRouter();
  const formikRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      token: "",
      minLoanAmount: "",
      maxLoanAmount: "",
      minLoanDuration: "",
      maxLoanDuration: "",
      annualInterestRate: "",
      disbursmentFee: "",
      cashBackRate: "",
    },
    onSubmit: async (values) => {
      try {
        const transformedValues = {
          ...values,
          minLoanAmount: ethers.utils.parseUnits(values.minLoanAmount, "ether"),
          maxLoanAmount: ethers.utils.parseUnits(values.maxLoanAmount, "ether"),
          minLoanDuration: Number(values.minLoanDuration),
          maxLoanDuration: Number(values.maxLoanDuration),
          annualInterestRate: Number(values.annualInterestRate),
          disbursmentFee: Number(values.disbursmentFee),
          cashBackRate: Number(values.cashBackRate),
        };

        await contracts.pondFactory.createPond(
          transformedValues,
          defaultCriteria
        );

        history.replace("/");

        // setCreatedPond(details);
      } catch (err) {
        console.log("createPond error: ", JSON.stringify(err, undefined, 2));
        if (err.data) {
          toast.error(err.data.message);
        }
      }
    },
  });

  formikRef.current = formik;

  // we pass in formik to set the token value as a ref to avoid rerendering the component
  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setFieldValue("token", history.query.token);
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1>New lending pond</h1>
      <div className={styles.form}>
        <Input
          {...{
            id: "name",
            placeholder: "Name",
            onChange: formik.handleChange,
            value: formik.values.name,
          }}
        />
        <Dropdown
          {...{
            id: "token",
            value: formik.values.token,
            placeholder: "Token Address",
            options: dropdownOptions(),
            onChange: formik.handleChange,
          }}
        />
        <Input
          {...{
            id: "minLoanAmount",
            placeholder: "Min. loan amount",
            onChange: formik.handleChange,
            value: formik.values.minLoanAmount,
          }}
        />
        <Input
          {...{
            id: "maxLoanAmount",
            placeholder: "Max. loan amount",
            onChange: formik.handleChange,
            value: formik.values.maxLoanAmount,
          }}
        />
        <Input
          {...{
            id: "minLoanDuration",
            placeholder: "Min. loan duration",
            onChange: formik.handleChange,
            value: formik.values.minLoanDuration,
          }}
        />
        <Input
          {...{
            id: "maxLoanDuration",
            placeholder: "Max. loan duration",
            onChange: formik.handleChange,
            value: formik.values.maxLoanDuration,
          }}
        />
        <Input
          {...{
            id: "annualInterestRate",
            placeholder: "Annual interest rate",
            onChange: formik.handleChange,
            value: formik.values.annualInterestRate,
          }}
        />
        <Input
          {...{
            id: "disbursmentFee",
            placeholder: "Disbursement fee",
            onChange: formik.handleChange,
            value: formik.values.disbursmentFee,
          }}
        />
        <Input
          {...{
            id: "cashBackRate",
            placeholder: "Cashback rate",
            onChange: formik.handleChange,
            value: formik.values.cashBackRate,
          }}
        />
      </div>
      <Button label="Create" onClick={formik.handleSubmit} />
    </div>
  );
}
