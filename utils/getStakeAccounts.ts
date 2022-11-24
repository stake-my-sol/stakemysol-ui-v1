import {
  Connection,
  PublicKey,
  ParsedAccountData,
  StakeProgram,
} from "@solana/web3.js";
import { IUIStakeAccount } from "../@types";

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

    let parsedStakeAccounts: IUIStakeAccount[] = [];
    for (let i = 0; i < res.length; i++) {
      const parsedData = res[i].account.data as ParsedAccountData;

      const parsedStakeAccount: IUIStakeAccount = {
        publicKey: new PublicKey(res[i].pubkey),
        balance:
          res[i].account.lamports -
          parsedData.parsed.info.meta.rentExemptReserve,
        status: parsedData.parsed.type,
        withdrawAuthority: new PublicKey(
          parsedData.parsed.info.meta.authorized.withdrawer,
        ),
        stakeAuthority: new PublicKey(
          parsedData.parsed.info.meta.authorized.staker,
        ),
      };

      parsedStakeAccounts.push(parsedStakeAccount);
    }

    return parsedStakeAccounts;
  } catch (error) {
    console.error(error);
    // custom logic
  }
};

export default fetchCurrentStakeAccounts;
