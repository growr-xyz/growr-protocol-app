import init from "./init";

const connect = (set, get) => async (ethereum) => {
  if (ethereum) {
    try {
      const { result } = await ethereum.send("eth_requestAccounts", []);
      await init({ set, get, ethereum, selectedAddress: result[0] });
    } catch (error) {
      console.log("error", error);
      set({ error });
    }
  }
};

export default connect;
