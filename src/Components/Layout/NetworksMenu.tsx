import { useContext } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { NetworkContext } from "../../Contexts/NetworkProvider";

function NetworksMenu() {
  const { network, changeNetwork } = useContext(NetworkContext)!;

  const handleChange = (event: SelectChangeEvent) => {
    const selectedNetwork = event.target.value;

    if (selectedNetwork === WalletAdapterNetwork.Testnet) {
      changeNetwork(WalletAdapterNetwork.Testnet);
    } else if (selectedNetwork === WalletAdapterNetwork.Mainnet) {
      changeNetwork(WalletAdapterNetwork.Mainnet);
    }
  };

  return (
    <Box
      sx={(theme) => ({
        width: 80,
        height: "3rem",
        backgroundColor: "white",
        borderRadius: "5px",

        [theme.breakpoints.up(425)]: {
          width: 120,
        },
      })}
    >
      <FormControl
        sx={{
          "& .MuiInputBase-formControl": {
            height: "3rem",
          },
        }}
        fullWidth
      >
        <Select
          id="networks-menu-select"
          value={network}
          sx={(theme) => ({
            textAlign: "center",
            "& .MuiFilledInput-input": {
              paddingX: "0.2rem",
              paddingY: 1.5,
            },
            fontSize: "0.78rem",

            [theme.breakpoints.up(425)]: {
              fontSize: "1rem",
            },
          })}
          onChange={handleChange}
          variant="filled"
          IconComponent="span"
        >
          <MenuItem value={WalletAdapterNetwork.Mainnet}>Mainnet-beta</MenuItem>
          <MenuItem value={WalletAdapterNetwork.Testnet}>Testnet</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default NetworksMenu;
