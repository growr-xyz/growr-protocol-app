const increaseGasLimit = (expectedGasLimit, multiplier) => {
  // let parsedGasLimit = ethers.utils.formatUnits(expectedGasLimit, "gwei");
  let parsedGasLimit = expectedGasLimit.toNumber();

  let incrasedGasLimit = parsedGasLimit * multiplier;

  return Math.round(incrasedGasLimit);
};

export default increaseGasLimit;
