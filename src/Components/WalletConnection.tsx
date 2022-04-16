import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";

function WalletConnection() {
  const { publicKey } = useWallet();

  return publicKey ? (
    <WalletDisconnectButton>Disconnect</WalletDisconnectButton>
  ) : (
    <WalletMultiButton>Connect</WalletMultiButton>
  );
}

export default WalletConnection;
