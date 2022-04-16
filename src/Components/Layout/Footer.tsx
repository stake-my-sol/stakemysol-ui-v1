import { Box, Typography } from "@mui/material";
import Image from "next/image";

function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        padding: 4,
        backgroundColor: "#000",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography color="#fff">Powered By:</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box>
          <Image
            src="/logo_solana.svg"
            alt="Solana logo"
            width="150"
            height="40"
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Image
            src="/validators_logo.png"
            alt="validators.app logo"
            width="150"
            height="40"
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Image
            src="/stakeview_logo.png"
            alt="validators.app logo"
            width="150"
            height="40"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
