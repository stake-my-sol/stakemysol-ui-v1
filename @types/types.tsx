import { Dispatch } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export type SelectedValidatorsActions =
  | {
      type: "addValidator";
      payload: {
        validator: Validator;
      };
    }
  | {
      type: "removeValidator";
      payload: {
        validator: Validator;
      };
    }
  | {
      type: "changeNetwork";
      payload: {
        network: WalletAdapterNetwork;
      };
    }
  | {
      type: "reset";
    };

export type SelectedValidator = {
  network: WalletAdapterNetwork;
  validator: Validator;
};

export type SelectedValidatorsState = SelectedValidator[] | null;

export interface INetworkContext {
  network: WalletAdapterNetwork;
  changeNetwork: (target: WalletAdapterNetwork) => void;
}

export interface Commission {
  commission: number | null | undefined; // 0;
  epoch: number | null | undefined; // 290
}

export interface VotePerformance {
  epoch: number | null | undefined; // 280
  performance: number | null | undefined; // 0.85
}

export interface Validator {
  account: string; // "Frog1Fks1AVN8ywFH3HTFeYojq6LQqoEPzgQFx2Kz5Ch"
  active_stake: number | null; // 361328504195019
  admin_warning: string | null; // null
  apy: number | null | undefined; // 0.07131
  authorized_withdrawer_score: number | null; // 0
  autonomous_system_number: number | null | undefined; // 23470
  avatar_url: string | null; // "https://s3.amazonaws.com/keybase_processed_uploads/9cecd4f7d75eb3acc397c983a332fc05_360_360.jpg"
  commission: number | null; // 0
  commissions: Commission[] | null; // (4) [{…}, {…}, {…}, {…}]
  created_at: string; // "2021-10-24T19:00:19.577Z"
  data_center_concentration_score: number | null; // 0
  data_center_host: string | null; // ex9k2.dc6.hel1.hetzner.com
  data_center_key: string | null; // "23470-US-Piscataway"
  delinquent: boolean | null; // false
  details: string | null; // "Reliable independent professional high-end validator. Enterprise hardware with redundancy, set in secure Tier 4/3 datacentres. Focused on Solana. No fees unless our size threatens decentralisation of the network, then low fee. See our site for details."
  epoch: number | null | undefined; // 287
  epoch_credits: number | null | undefined; // 208782
  keybase_id: string | null; // "leapfrog_systems"
  latitude: string | null | undefined; // "40.5511"
  longitude: string | null | undefined; // "-74.4606"
  name: string | null | undefined; // "Leapfrog Systems 🚀 No Fees ❤️◎"
  network: string; // "mainnet"
  ping_time: number | null | undefined; // 2
  published_information_score: number | null | undefined; // 2
  received_stake_from_stake_pools: boolean | null | undefined; // true
  root_distance_score: number | null | undefined; // 2
  security_report_score: number | null | undefined; // 1
  skipped_slot_percent: number | null | undefined; // 0.0636
  skipped_slot_score: number | null | undefined; // 1
  skipped_slots: number | null | undefined; // 14
  software_version: string | null | undefined; // "1.9.9"
  software_version_score: number | null | undefined; // 2
  stake_concentration_score: number | null | undefined; // 0
  total_score: number | null | undefined; // 10
  updated_at: string | null | undefined; // "2022-03-08T06:00:04.655Z"
  url: string | null | undefined; // "https://www.validators.app/api/v1/validators/mainnet/Frog1Fks1AVN8ywFH3HTFeYojq6LQqoEPzgQFx2Kz5Ch"
  vote_account: string; // "Pond1QyT1sQtiru3fi9G5LGaLRGeUpJKR1a2gdbq2u4"
  vote_distance_score: number | null | undefined; // 2
  vote_performances: VotePerformance[] | null; // (4) [{…}, {…}, {…}, {…}]
  www_url: string | null | undefined; // "https://leapfrog.systems"
  _id: string; // "621d5d623ad2cd6807636201
}

export interface ScoreChartLabel {
  criteria: string;
  score: number;
}

export interface ISelectedValidatorsContext {
  selectedValidators: SelectedValidatorsState;
  addValidator: (validator: Validator) => void;
  removeValidator: (validator: Validator) => void;
  reset: () => void;
}

export interface SoftwareVersion {
  _id: string;
  count: number;
}

export interface SearchFormSelectOption {
  label: string;
  value: string | number;
}
export interface GeneralNetworkData {
  count: number | null;
  names: string[] | null;
  maxActiveStake: number | null;
  asns: number[] | null;
  softwareVersions: SoftwareVersion[] | null;
  dataCenters: string[] | null;
}
export interface GeneralNetworkDataState extends GeneralNetworkData {
  updatedAt: string | null;
}

export interface IGeneralNetworkDataContext {
  testnet: GeneralNetworkDataState;
  mainnet: GeneralNetworkDataState;
}

export interface NetworkState {
  network: WalletAdapterNetwork;
}

export interface NetworkReducerAction {
  type: string;
  payload?: {
    network: WalletAdapterNetwork;
  };
}
