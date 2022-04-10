import { useMemo, createContext, ReactNode } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { INetworkContext } from "../@types/types";

interface NetworkContextProviderProps {
  network: WalletAdapterNetwork;
  setNetwork: (target: WalletAdapterNetwork) => void;
  children: ReactNode | ReactNode[];
}

export const NetworkContext = createContext<INetworkContext | null>(null);

function NetworkContextProvider({
  network,
  setNetwork,
  children,
}: NetworkContextProviderProps) {
  const contextValue = useMemo(
    () => ({
      network,
      changeNetwork(target: WalletAdapterNetwork) {
        setNetwork(target);
      },
    }),
    [network, setNetwork],
  );

  return (
    <NetworkContext.Provider value={contextValue}>
      {children}
    </NetworkContext.Provider>
  );
}

export default NetworkContextProvider;
