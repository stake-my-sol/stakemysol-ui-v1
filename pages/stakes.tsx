import { NextPage } from "next";
import Head from "next/head";
import _ from "lodash";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { StakeProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect } from "react";
import { Box, Button, Grid, Typography, Paper, Container } from "@mui/material";
import {
  IRawParsedStakeAccount,
  IUIStakeAccount,
  IPotentialSMSPubkeys,
} from "../@types";
import CurrentStakesTable from "../Components/StakesPage/CurrentStakesTable";
import getStakeAccounts from "../utils/getStakeAccounts";
import processRawStakeAccounts from "../utils/processRawStakeAccounts";

const Stakes: NextPage = () => {
  const { connection } = useConnection();
  const { programId: stakeProgramId } = StakeProgram;
  const { publicKey, sendTransaction } = useWallet();
  const [seed, setSeed] = useState<string>("0");
  const [currentStakeAccounts, setCurrentStakeAccounts] = useState<
    IUIStakeAccount[]
  >([]);

  useEffect(() => {
    const fetchCurrentStakeAccounts = async () => {
      if (_.isNil(publicKey)) {
        return setCurrentStakeAccounts([]);
      }

      const rawStakeAccounts = await getStakeAccounts(connection, publicKey);

      if (_.isNil(rawStakeAccounts)) {
        return setCurrentStakeAccounts([]);
      }

      let parsedStakeAccounts = await processRawStakeAccounts(
        rawStakeAccounts,
        connection,
      );

      if (_.isNil(parsedStakeAccounts)) {
        parsedStakeAccounts = [];
      }

      setCurrentStakeAccounts(parsedStakeAccounts);
      setSeed(parsedStakeAccounts.length.toString());
    };
    fetchCurrentStakeAccounts();
  }, [publicKey, connection, stakeProgramId, seed]);

  let accounts = null;

  return (
    <>
      <Head>
        <title>Stakes</title>
      </Head>

      <Paper
        sx={{
          mt: 4,
          minWidth: "15rem",
          width: "75%",
          maxWidth: "55rem",
          mx: "auto",
        }}
      >
        <Box>
          {_.isNil(publicKey) && (
            <Box sx={{ textAlign: "center", p: 2 }}>
              Connect with your wallet
            </Box>
          )}
          {publicKey && (
            <CurrentStakesTable uiStakeAccounts={currentStakeAccounts} />
          )}
        </Box>
      </Paper>
    </>
  );
};

export default Stakes;
