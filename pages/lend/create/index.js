import { useFormik } from "formik";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/Button/Button";
import { useContracts } from "@/store/store";
import styles from "./Create.module.css";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown/Dropdown";

import tokens from "../../../tokens.json";
import criteria from "../../../eligibilityCriteria.json";

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

// const defaultCriteria = {
//  names: ["citizenship"],
//  types: ["string"],
//  contents: ["SV"],
//  operations: ["="],
// };

const dropdownOptions = () =>
  tokens.map(({ symbol, address }) => ({ value: address, label: symbol }));

const vcOptions = () =>
  criteria.map(({ name, label }) => ({ value: name, label: label }));

const operatorOptions = () => [
  { value: "=", label: "=" },
  { value: ">", label: ">" },
  { value: "<", label: "<" },
  { value: "!=", label: "!=" }
];

const typeOptions = () => [
  {
    value: "string",
    label: "Text"
  },
  {
    value: "uint",
    label: "Number"
  },
  {
    value: "bool",
    label: "Boolean"
  }
];

export default function Create() {
  const contracts = useContracts();
  const history = useRouter();

  const [criteria2, setCriteria2] = useState(false);

  const handleCriteria2Change = () => {
    setCriteria2(!criteria2);
  };

  const [criteria3, setCriteria3] = useState(false);

  const handleCriteria3Change = () => {
    setCriteria3(!criteria3);
  };

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
      vc1: vcOptions()[0].value,
      type1: typeOptions()[0].value,
      operator1: operatorOptions()[0].value,
      value1: "",
      vc2: vcOptions()[1].value,
      type2: typeOptions()[0].value,
      operator2: operatorOptions()[0].value,
      value2: "",
      vc3: vcOptions()[2].value,
      type3: typeOptions()[0].value,
      operator3: operatorOptions()[0].value,
      value3: ""
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

        let names = [values.vc1];
        let types = [values.type1];
        let contents = [values.value1];
        let operations = [values.operator1];

        if (criteria2) {
          names.push(values.vc2);
          types.push(values.type2);
          contents.push(values.value2);
          operations.push(values.operator2);
        }

        if (criteria2 && criteria3) {
          names.push(values.vc3);
          types.push(values.type3);
          contents.push(values.value3);
          operations.push(values.operator3);
        }

        const eligibilityCriteria = {
          names: names,
          types: types,
          contents: contents,
          operations: operations
        }

        console.log("Eligibility criteria: ");
        console.log(eligibilityCriteria);

        await contracts.pondFactory.createPond(
          transformedValues,
          eligibilityCriteria
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
            placeholder: "Token Symbol",
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
        <div className={styles.label}>Criteria:</div>
        <div className={styles.criteriaContainer}>
          <Dropdown
            {...{
              id: "vc1",
              value: formik.values.vc1 || vcOptions()[0].value,
              placeholder: "VC 1",
              options: vcOptions(),
              onChange: formik.handleChange,
            }}
          />
          <Dropdown
            {...{
              id: "operator1",
              value: formik.values.operator1 || operatorOptions()[0].value,
              placeholder: "Operator 1",
              options: operatorOptions(),
              onChange: formik.handleChange,
            }}
          />
          <Input
            {...{
              id: "value1",
              placeholder: "Value 1",
              onChange: formik.handleChange,
              value: formik.values.value1,
            }}
          />
          <Dropdown
            {...{
              id: "type1",
              value: formik.values.type1 || typeOptions()[0].value,
              placeholder: "Type 1",
              options: typeOptions(),
              onChange: formik.handleChange,
            }}
          />
        </div>
        <div className={styles.label}>
          <input
            id="inputCriteria2"
            type="checkbox"
            checked={criteria2}
            onChange={handleCriteria2Change}
            value={formik.values.criteria2} />
          <label htmlFor="inputCriteria2">AND</label>
        </div>

        {criteria2 && (<div className={styles.criteriaContainer}>
          <Dropdown
            {...{
              id: "vc2",
              value: formik.values.vc2 || vcOptions()[1].value,
              placeholder: "VC 2",
              options: vcOptions(),
              onChange: formik.handleChange,
            }}
          />
          <Dropdown
            {...{
              id: "operator2",
              value: formik.values.operator2 || operatorOptions()[0].value,
              placeholder: "Operator 2",
              options: operatorOptions(),
              onChange: formik.handleChange,
            }}
          />
          <Input
            {...{
              id: "value2",
              placeholder: "Value 2",
              onChange: formik.handleChange,
              value: formik.values.value2,
            }}
          />
          <Dropdown
            {...{
              id: "type2",
              value: formik.values.type2 || typeOptions()[0].value,
              placeholder: "Type 2",
              options: typeOptions(),
              onChange: formik.handleChange,
            }}
          />
        </div>
        )}

        {criteria2 && (<div className={styles.label}>
          <input
            id="inputCriteria3"
            type="checkbox"
            checked={criteria3}
            onChange={handleCriteria3Change}
            value={formik.values.criteria3} />
          <label htmlFor="inputCriteria3">AND</label>
        </div>
        )}

        {criteria3 && (<div className={styles.criteriaContainer}>
          <Dropdown
            {...{
              id: "vc3",
              value: formik.values.vc3 || vcOptions()[2].value,
              placeholder: "VC 3",
              options: vcOptions(),
              onChange: formik.handleChange,
            }}
          />
          <Dropdown
            {...{
              id: "operator3",
              value: formik.values.operator3 || operatorOptions()[0].value,
              placeholder: "Operator 3",
              options: operatorOptions(),
              onChange: formik.handleChange,
            }}
          />
          <Input
            {...{
              id: "value3",
              placeholder: "Value 3",
              onChange: formik.handleChange,
              value: formik.values.value3,
            }}
          />
          <Dropdown
            {...{
              id: "type3",
              value: formik.values.type3 || typeOptions()[0].value,
              placeholder: "Type 3",
              options: typeOptions(),
              onChange: formik.handleChange,
            }}
          />
        </div>
        )}

      </div>
      <Button label="Create" onClick={formik.handleSubmit} />
    </div>
  );

}
