import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export const DEFAULT_NETWORK: WalletAdapterNetwork =
  WalletAdapterNetwork.Mainnet;

export const SELECTED_VALIDATORS_ACTIONS = {
  ADD_VALIDATOR: "ADD_VALIDATOR",
  REMOVE_VALIDATOR: "REMOVE_VALIDATOR",
  RESET: "RESET",
};

export const SELECTED_VALIDATORS_STATE = "selectedValidatorsState";
export const GENERAL_NETWORK_DATA_STATE_KEY = "general network data";

export const MAX_VALIDATORS_TO_DELEGATE_TO = 50;
export const MIN_VALIDATORS_TO_DELEGATE_TO = 0;

export const STAKE_ACCOUNT_SEED_PREFIX = "SmS-stake-account";
