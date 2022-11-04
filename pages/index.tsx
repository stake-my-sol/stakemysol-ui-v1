import type { NextPage } from "next";
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import AtmMachineSvg from "../public/handy_atm_machine.svg";

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
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "80%",
                  backgroundColor: "white",
                  textAlign: "center",
                  p: 2,
                  mt: 6,
                  mb: 2,
                  ml: 15,
                  borderRadius: "50px",
                  fontSize: "2rem",
                }}
              >
                NFTs + Games + Staking = SmS
              </Box>

              <Box
                sx={{
                  width: "80%",
                  backgroundColor: "white",
                  textAlign: "center",
                  // p: 2,
                  mt: 6,
                  mb: 2,
                  ml: 15,
                  borderRadius: "50px",
                }}
              >
                <Image
                  src="/sms_lunar_system.gif"
                  alt="SMS lunar system"
                  width={500}
                  height={500}
                />
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
