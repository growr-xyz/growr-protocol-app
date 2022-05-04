import { ethers } from "ethers";

const incraseGasLimit = (expectedGasLimit, multiplier) => {
  let parsedGasLimit = ethers.utils.formatUnits(expectedGasLimit, "gwei");

  let numberOfDecimals = parsedGasLimit.split(".")[1].length;

  let gasLimitWholeNumber = parsedGasLimit * 10 ** numberOfDecimals;

  let incrasedGasLimit = gasLimitWholeNumber * multiplier;

  return Math.round(incrasedGasLimit);
};

export default incraseGasLimit;
