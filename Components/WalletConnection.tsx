import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import styles from "../styles/WalletConnection.module.css";

function WalletConnection() {
  const { publicKey } = useWallet();

  return publicKey ? (
    <WalletDisconnectButton className={styles.customBtn} />
  ) : (
    <WalletMultiButton className={styles.customBtn} />
  );
}

export default WalletConnection;
