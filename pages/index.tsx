import type { NextPage } from "next";
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import AtmMachineSvg from "../public/handy_atm_machine.svg";
import SmsLunarGif from "../Components/SmsLunarGif";

const HomePage: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Stake My SOL</title>
        <meta name="description" content="Stake my SOL homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Grid container spacing={2}>
          <Grid container item xs={6}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "80%",
                  backgroundColor: "white",
                  textAlign: "center",
                  p: 2,
                  my: 2,
                  borderRadius: "50px",
                  fontSize: "2rem",
                }}
              >
                NFTs + Games + Staking = SmS
              </Box>

              <Box
                sx={{
                  backgroundColor: "white",
                  width: "25rem",
                  height: "25rem",
                  my: 2,
                  borderRadius: "50px",
                }}
              >
                <SmsLunarGif />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                p: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AtmMachineSvg />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
