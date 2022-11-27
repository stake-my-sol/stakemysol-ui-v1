import { useMemo, createContext, ReactNode, useReducer } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { INetworkContext, NetworkReducerAction, NetworkState } from "../@types";
import { DEFAULT_NETWORK } from "../Constants";

interface NetworkContextProviderProps {
  children: ReactNode | ReactNode[];
}

export const NetworkContext = createContext<INetworkContext | null>(null);

function NetworkContextProvider({ children }: NetworkContextProviderProps) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.

  const networkReducer = (
    state: NetworkState,
    action: NetworkReducerAction,
  ) => {
    const { type, payload } = action;

    switch (type) {
      case "init_stored":
        return {
          ...state,
          network: DEFAULT_NETWORK,
        };
      case "set_network":
        if (payload) {
          return {
            ...state,
            network: payload.network,
          };
        }
      default:
        return state;
    }
  };

  const initialState: NetworkState = {
    network: DEFAULT_NETWORK,
  };

  const [state, dispatch] = useReducer(networkReducer, initialState);

  const contextValue = useMemo(
    () => ({
      network: state.network as WalletAdapterNetwork,
      changeNetwork(target: WalletAdapterNetwork) {
        dispatch({
          type: "set_network",
          payload: {
            network: target,
          },
        });
      },
    }),
    [state.network],
  );

  return (
    <NetworkContext.Provider value={contextValue}>
      {children}
    </NetworkContext.Provider>
  );
}

export default NetworkContextProvider;
