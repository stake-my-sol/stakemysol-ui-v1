import { Connection } from "@solana/web3.js";
import _ from "lodash";
import { IUIStakeAccount, IRawParsedStakeAccount } from "../@types";

export default async function processRawStakeAccounts(
  rawAccounts: IRawParsedStakeAccount[],
  connection: Connection,
) {
  try {
    const stakeAccounts: IUIStakeAccount[] = [];
    for (let i = 0; i < rawAccounts.length; i++) {
      const rawAccount = rawAccounts[i];
      const { publicKey, balance, status } = rawAccount;

      let uiStakeAccount: IUIStakeAccount = {
        publicKey,
        value: balance,
        profit: 0,
        status,
      };

      if (!_.isNil(rawAccount.delegatedStake)) {
        const inflationRewardRes = await connection.getInflationReward([
          publicKey,
        ]);

        if (!_.isNil(inflationRewardRes[0])) {
          uiStakeAccount.profit = inflationRewardRes[0].amount;
        }
      }

      stakeAccounts.push(uiStakeAccount);
    }
    return stakeAccounts;
  } catch (err) {
    console.log(err);
  }
}
