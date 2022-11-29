import { Connection } from "@solana/web3.js";
import _ from "lodash";
import { IUIStakeAccount, IRawParsedStakeAccount } from "../@types";

export default async function processRawStakeAccounts(
  rawAccounts: IRawParsedStakeAccount[],
  connection: Connection,
) {
  try {
    const stakeAccounts: IUIStakeAccount[] = [];
    const pubKeys = rawAccounts
      .filter((rawAcc) => !_.isNil(rawAcc.delegatedStake))
      .map((rawAcc) => rawAcc.publicKey);

    const pubkeyToRewardsMap = new Map();

    const inflationRewardsRes = await connection.getInflationReward(pubKeys);

    for (let i = 0; i < pubKeys.length; i++) {
      pubkeyToRewardsMap.set(pubKeys[i].toBase58(), inflationRewardsRes[i]);
    }

    for (let i = 0; i < rawAccounts.length; i++) {
      const rawAccount = rawAccounts[i];
      const { publicKey, balance, status } = rawAccount;

      let uiStakeAccount: IUIStakeAccount = {
        publicKey,
        value: balance,
        profit: 0,
        status,
      };

      if (
        pubkeyToRewardsMap.has(publicKey.toBase58()) &&
        !_.isNil(pubkeyToRewardsMap.get(publicKey.toBase58()))
      ) {
        uiStakeAccount.profit = pubkeyToRewardsMap.get(
          publicKey.toBase58(),
        ).amount;
      }

      stakeAccounts.push(uiStakeAccount);
    }
    return stakeAccounts;
  } catch (err) {
    console.log(err);
  }
}
