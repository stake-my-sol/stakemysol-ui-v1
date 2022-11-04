import { Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import styles from "../styles/WalletConnection.module.css";

function WalletConnection() {
  const { publicKey } = useWallet();

  return publicKey ? (
    <WalletDisconnectButton className={styles.customBtn}>
      <Typography variant="h6" sx={{ color: "black" }}>
        {publicKey.toBase58().slice(0, 3) +
          "..." +
          publicKey.toBase58().slice(-3)}
      </Typography>
    </WalletDisconnectButton>
  ) : (
    <WalletMultiButton className={styles.customBtn}>
      <Typography variant="h6" sx={{ color: "black" }}>
        CONNECT
      </Typography>
    </WalletMultiButton>
  );
}

export default WalletConnection;
