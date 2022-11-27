import {
  Connection,
  PublicKey,
  ParsedAccountData,
  StakeProgram,
} from "@solana/web3.js";
import _ from "lodash";
import { IRawParsedStakeAccount } from "../@types";

const { programId: stakeProgramId } = StakeProgram;

const fetchCurrentStakeAccounts = async (
  connection: Connection,
  publicKey: PublicKey,
) => {
  if (!publicKey) return;
  try {
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

    let parsedStakeAccounts: IRawParsedStakeAccount[] = [];
    for (let i = 0; i < res.length; i++) {
      const parsedData = res[i].account.data as ParsedAccountData;
      const stakeData = parsedData.parsed.info.stake;

      let parsedStakeAccount: IRawParsedStakeAccount = {
        publicKey: new PublicKey(res[i].pubkey),
        balance: res[i].account.lamports,
        status: parsedData.parsed.type,
        withdrawAuthority: new PublicKey(
          parsedData.parsed.info.meta.authorized.withdrawer,
        ),
        stakeAuthority: new PublicKey(
          parsedData.parsed.info.meta.authorized.staker,
        ),
      };

      if (!_.isNil(stakeData)) {
        parsedStakeAccount = {
          ...parsedStakeAccount,
          activationEpoch: Number(stakeData.delegation.activationEpoch),
          deactivationEpoch: Number(stakeData.delegation.deactivationEpoch),
          delegatedStake: Number(stakeData.delegation.stake),
          // delegatedVoteAccount: new PublicKey(stakeData.delegation.voterPubkey),
          creditsObserved: stakeData.creditsObserved,
        };
      }

      parsedStakeAccounts.push(parsedStakeAccount);
    }

    console.log(
      "🚀 ~ file: getStakeAccounts.ts ~ line 65 ~ parsedStakeAccounts",
      parsedStakeAccounts,
    );
    return parsedStakeAccounts;
  } catch (error) {
    console.error(error);
    // custom logic
  }
};

export default fetchCurrentStakeAccounts;
