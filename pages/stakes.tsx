import { NextPage } from "next";
import Head from "next/head";
import _ from "lodash";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  ParsedAccountData,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  StakeProgram,
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  Authorized,
  Lockup,
} from "@solana/web3.js";
import { useState, useEffect } from "react";
import { Box, Button, Grid, Typography, Paper, Container } from "@mui/material";
import { STAKE_ACCOUNT_SEED_PREFIX } from "../Constants";
import { IUIStakeAccount, IPotentialSMSPubkeys } from "../@types";
import CurrentStakesTable from "../Components/StakesPage/CurrentStakesTable";
import getStakeAccounts from "../utils/getStakeAccounts";

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

      const parsedStakeAccounts = await getStakeAccounts(connection, publicKey);

      if (_.isNil(parsedStakeAccounts)) {
        return setCurrentStakeAccounts([]);
      }

      setCurrentStakeAccounts(parsedStakeAccounts);
      setSeed(parsedStakeAccounts.length.toString());
    };
    fetchCurrentStakeAccounts();
  }, [publicKey, connection, stakeProgramId, seed]);

  let accounts = null;

  if (currentStakeAccounts.length > 0) {
    accounts = (
      <Grid container>
        {currentStakeAccounts.map((stakeAccount, index) => {
          return (
            <Grid sx={{ my: 2 }} item xs={12} md={6} key={index}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6">#{index + 1}</Typography>
                {/* <Typography variant="h6">
                      Public Key: {stakeAccount.publicKey.toBase58()}
                    </Typography> 
                  */}
                <Typography>
                  Balance: {stakeAccount.balance / LAMPORTS_PER_SOL} SOL
                </Typography>
                <Typography>Status: {stakeAccount.status}</Typography>
                <Typography>
                  Withdraw Authority:{" "}
                  {stakeAccount.withdrawAuthority.toBase58() ===
                  publicKey!.toBase58()
                    ? "You"
                    : stakeAccount.withdrawAuthority.toBase58()}
                </Typography>
                <Typography>
                  Stake Authority:{" "}
                  {stakeAccount.stakeAuthority.toBase58() ===
                  publicKey!.toBase58()
                    ? "You"
                    : stakeAccount.stakeAuthority.toBase58()}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    );
  }

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
          {/* {accounts === null ? <Box>Nothing to show!</Box> : accounts} */}
          <CurrentStakesTable />
        </Box>
      </Paper>
    </>
  );
};

export default Stakes;
