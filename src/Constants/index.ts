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
