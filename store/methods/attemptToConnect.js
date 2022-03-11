import init from "./init";

const delay = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 250);
  });

const attemptToConnect = (set, get) => async (ethereum) => {
  try {
    if (!ethereum) {
      throw new Error("metamask not presend");
    }

    const isConnected = await ethereum.isConnected();

    // ethereum.selectedAddress sometime is not being updated yet, so we add a small delay
    if (!isConnected) {
      await delay();
    }

    // check if Metamask is already connected
    if (ethereum.selectedAddress) {
      await init({
        set,
        get,
        ethereum,
        selectedAddress: ethereum.selectedAddress,
      });
    }
  } catch (err) {
    console.log("attemptToConnect error", err);
    set({ error: err });
  }
};

export default attemptToConnect;
