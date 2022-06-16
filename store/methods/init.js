import { ethers } from "ethers";
import pondFactory from "../../abi/PondFactory.json";
import Pond from "../../abi/Pond.json";
import ERC20 from "../../abi/ERC20.json";

import tokens from "../../tokens.json";

// import protocolContracts from "../../contracts.json";
// const pondFactoryAddress = protocolContracts.factory.address;
// Better approach for the contract
const pondFactoryAddress = process.env.NEXT_PUBLIC_POND_FACTORY_ADDRESS;

const init = async ({ set, get, ethereum, selectedAddress }) => {
  const state = get();

  // collect metamask data
  try {
    const chainId = await ethereum.request({ method: "eth_chainId" });

    const parsedChainId = ethers.utils.formatUnits(chainId);

    const nativeBalance = await ethereum.request({
      method: "eth_getBalance",
      params: [selectedAddress, "latest"],
    });

    const provider = new ethers.providers.Web3Provider(ethereum, "any");

    const signer = provider.getSigner();

    // test

    // const testProvider = new ethers.providers.JsonRpcProvider(
    //   "https://public-node.testnet.rsk.co"
    // );

    // const testPondFactoryContract = new ethers.Contract(
    //   pondFactoryAddress,
    //   pondFactory,
    //   testProvider.getSigner()
    // );
    // console.log("testPondFactoryContract", testPondFactoryContract);

    // // test
    // const filter = {
    //   address: pondFactoryAddress,
    //   topics: [utils.id("PondCreated(address,address,uint256)")],
    // };

    // testPondFactoryContract.on(filter, (args) => {
    //   console.log("cb arguments: ", args);
    // });

    // provider.on(filter, (...args) => {
    //   console.log("cb arguments: ", args);
    // });

    const pondFactoryContract = new ethers.Contract(
      pondFactoryAddress,
      pondFactory,
      signer
    );

    // pondFactoryContract.on(
    //   {
    //     address: pondFactoryAddress,
    //     topics: [utils.id("PondCreated(address,address,uint256)")],
    //   },
    //   (address, owner, timestamp) => {
    //     console.log("Event PondCreated:", address, owner, timestamp);
    //   }
    // );

    // create instance of all contracts to set to state
    const contracts = tokens.reduce((acc, { symbol, address }) => {
      acc[symbol] = new ethers.Contract(address, ERC20, signer);
      return acc;
    }, {});
    console.log("contracts", contracts);

    const userPonds = await pondFactoryContract.functions.getUserPonds(
      selectedAddress
    );

    const pondContracts = userPonds[0].map(
      (pondAddress) => new ethers.Contract(pondAddress, Pond, signer)
    );

    const pondDetailPromises = pondContracts.map((pondContract) =>
      pondContract.getDetails()
    );

    const pondDetails = await Promise.all(pondDetailPromises);

    const allPonds = pondDetails.map((details, index) => ({
      index,
      ref: pondContracts[index],
      details,
    }));

    set({
      ...state,
      ethereum,
      account: selectedAddress,
      balance: ethers.utils.formatUnits(nativeBalance),
      connected: true,
      provider,
      contracts: {
        pondFactory: pondFactoryContract,
        // pond: pondContract,
        ...contracts,
        // rDOC: RDOCContract,
      },
      ponds: allPonds,
      chainId: parsedChainId,
    });
  } catch (error) {
    console.error("init error: ", error);
  }
};

export default init;
