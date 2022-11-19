import { useMemo, ReactNode, useState, useReducer, useContext } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { NetworkContext } from "./NetworkProvider";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

interface WalletProps {
  children: ReactNode | ReactNode[];
}

function Wallet({ children }: WalletProps) {
  // const [network, setNetwork] = useState<WalletAdapterNetwork>(DEFAULT_NETWORK);

  const { network } = useContext(NetworkContext)!;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network: network }),
    ],
    [network],
  );

  return (
    <ConnectionProvider
      endpoint={process.env.NEXT_PUBLIC_CUSTOM_MAINNET_ENDPOINT || endpoint}
    >
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default Wallet;
