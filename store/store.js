import create from "zustand";
import { devtools } from "zustand/middleware";
import * as methods from "./methods";

const dispatch =
  (set, get) =>
  ({ method, params = [] }) => {
    try {
      methods[method](set, get)(...params);
    } catch (err) {
      console.error(`Method ${method} is not registered`, err);
    }
  };

const useStore = create(
  devtools((set, get) => ({
    connected: false,
    ethereum: null,
    error: null,
    account: null,
    balance: 0,
    provider: null,
    contracts: {
      pondFactory: null,
      pond: null,
    },
    ponds: [],
    overlay: {
      active: false,
      type: "",
    },
    chainId: "",
    dispatch: dispatch(set, get),
  }),
  {
    name: "growr-protocol-app-storage", // unique name
  })
);

export const useAccount = () => useStore((state) => state.account);
export const useBalance = () => useStore((state) => state.balance);
export const useConnected = () => useStore((state) => state.connected);
export const useEthereum = () => useStore((state) => state.ethereum);
export const useOverlay = () => useStore((state) => state.overlay);
export const useChainId = () => useStore((state) => state.chainId);
export const useDispatch = () => useStore((state) => state.dispatch);
export const useContracts = () => useStore((state) => state.contracts);

export default useStore;
