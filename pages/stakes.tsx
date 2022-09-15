import { NextPage } from "next";
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
import { Box, Button, Typography } from "@mui/material";
import { STAKE_ACCOUNT_SEED_PREFIX } from "../Constants";
import { IUIStakeAccount, IPotentialSMSPubkeys } from "../@types";

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
      if (!publicKey) return;

      const res = await connection.getParsedProgramAccounts(stakeProgramId, {
        filters: [
          {
            memcmp: {
              offset: 12,
              bytes: publicKey.toBase58(),
            },
          },
        ],
      });
      console.log(
        "🚀 ~ file: stakes.tsx ~ line 41 ~ fetchCurrentStakeAccounts ~ res",
        res,
      );

      let parsedStakeAccounts: IUIStakeAccount[] = [];
      for (let i = 0; i < res.length; i++) {
        const parsedData = res[i].account.data as ParsedAccountData;

        const parsedStakeAccount: IUIStakeAccount = {
          publicKey: new PublicKey(res[i].pubkey),
          balance:
            res[i].account.lamports -
            parsedData.parsed.info.meta.rentExemptReserve,
          status: parsedData.parsed.info.type,
          withdrawAuthority: new PublicKey(
            parsedData.parsed.info.meta.authorized.withdrawer,
          ),
          stakeAuthority: new PublicKey(
            parsedData.parsed.info.meta.authorized.staker,
          ),
        };

        parsedStakeAccounts.push(parsedStakeAccount);
      }

      setCurrentStakeAccounts(parsedStakeAccounts);
      setSeed(res.length.toString());
    };
    fetchCurrentStakeAccounts();
  }, [publicKey, connection, stakeProgramId, seed]);

  const onClick = async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    // Create a keypair for our stake account
    const stakeAccount = await PublicKey.createWithSeed(
      publicKey,
      seed,
      stakeProgramId,
    );

    // Calculate how much we want to stake
    const minimumRent = await connection.getMinimumBalanceForRentExemption(
      StakeProgram.space,
    );
    const amountUserWantsToStake = LAMPORTS_PER_SOL * 0.5; // This is can be user input. For now, we'll hardcode to 0.5 SOL
    const amountToStake = minimumRent + amountUserWantsToStake;

    // Setup a transaction to create our stake account
    // Note: `StakeProgram.createAccount` returns a `Transaction` preconfigured with the necessary `TransactionInstruction`s
    const createStakeAccountTx = StakeProgram.createAccountWithSeed({
      fromPubkey: publicKey,
      stakePubkey: stakeAccount,
      basePubkey: publicKey,
      seed: seed,
      authorized: new Authorized(publicKey, publicKey), // Here we set two authorities: Stake Authority and Withdrawal Authority. Both are set to our
      lamports: amountToStake,
    });

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(createStakeAccountTx, connection, {
      minContextSlot,
    });

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    });

    // Check our newly created stake account balance. This should be 0.5 SOL.
    let stakeBalance = await connection.getBalance(stakeAccount);
    console.log(
      `Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} SOL`,
    );

    // Verify the status of our stake account. This will start as inactive and will take some time to activate.
    let stakeStatus = await connection.getStakeActivation(stakeAccount);
    console.log(`Stake account status: ${stakeStatus.state}`);

    setSeed((Number(seed) + 1).toString());
  };

  return (
    <Box>
      <Typography>
        You have {currentStakeAccounts.length} at the moment
      </Typography>
    </Box>
  );
};

export default Stakes;
