import { useContext, useState, Dispatch, SetStateAction } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import TextField from "@mui/material/TextField";
import ValidatorsCountInput from "./ValidatorsCountInput";
import stakeMySolAxios from "../../../axios-instances";
import { NetworkContext } from "../../../Contexts/NetworkProvider";
import { GeneralNetworkDataContext } from "../../../Contexts/GeneralNetworkDataProvider";
import { MAX_VALIDATORS_TO_DELEGATE_TO } from "../../../Constants";

import {
  SearchFormSelectOption,
  SoftwareVersion,
  Validator,
} from "../../../@types/types";
import CustomSlider from "../../CustomSlider";

interface SearchPageProps {
  setFoundValidators: Dispatch<SetStateAction<Validator[]>>;
}

function SearchPage({ setFoundValidators }: SearchPageProps) {
  const { network } = useContext(NetworkContext)!;

  const generalNetworkData = useContext(GeneralNetworkDataContext);
  let nameSelectOptions: SearchFormSelectOption[] = [];
  let asnSelectOptions: SearchFormSelectOption[] = [];
  let dataCenterSelectOptions: SearchFormSelectOption[] = [];
  let softwareVersionSelectOptions: SearchFormSelectOption[] = [];
  let majorVersion: SoftwareVersion;

  if (generalNetworkData.names !== null) {
    const { names } = generalNetworkData;
    nameSelectOptions = names.map((name) => {
      return { label: name, value: name };
    });
  }

  if (generalNetworkData.asns !== null) {
    const { asns } = generalNetworkData;
    asnSelectOptions = asns.map((asn) => {
      return { label: asn.toString(), value: asn };
    });
  }

  if (generalNetworkData.dataCenters !== null) {
    const { dataCenters } = generalNetworkData;
    dataCenterSelectOptions = dataCenters.map((datacenter) => {
      return { label: datacenter, value: datacenter };
    });
  }

  if (generalNetworkData.softwareVersions !== null) {
    const { softwareVersions } = generalNetworkData;
    // majority version
    majorVersion = { ...softwareVersions[0] };

    softwareVersions.forEach((version) => {
      if (version.count > majorVersion.count) {
        majorVersion = { ...version };
      }
    });

    softwareVersionSelectOptions = softwareVersions.map((softwareVersion) => {
      if (softwareVersion._id === majorVersion._id) {
        return {
          label: `${softwareVersion._id} (majority)`,
          value: softwareVersion._id,
        };
      }
      return { label: softwareVersion._id, value: softwareVersion._id };
    });
  }

  const [validatorsCount, setValidatorsCount] = useState<number>(5);
  const [selectedNames, setSelectedNames] = useState();
  const [selectedApy, setSelectedApy] = useState<number[] | number>([6, 8]);
  const [selectedCommission, setSelectedCommission] = useState<
    number[] | number
  >([0, 10]);
  const [selectedVotePerformance, setSelectedVotePerformance] = useState<
    number[] | number
  >([0.9, 1]);
  const [selectedSkipRate, setSelectedSkipRate] = useState<number[] | number>([
    0, 0.01,
  ]);
  const [selectedAsns, setSelectedAsns] = useState();
  const [selectedDatacenters, setSelectedDatacenters] = useState();
  const [selectedSoftwareVersions, setSelectedSoftwareVersions] = useState();

  const nameSelectHandler = (event: React.SyntheticEvent, value: any) => {
    const mappedOptions = value.map((option: any) => option.value);
    setSelectedNames(mappedOptions);
  };

  const asnSelectHandler = (event: React.SyntheticEvent, value: any) => {
    const mappedOptions = value.map((option: any) => option.value);
    setSelectedAsns(mappedOptions);
  };

  const datacenterSelectHandler = (event: React.SyntheticEvent, value: any) => {
    const mappedOptions = value.map((option: any) => option.value);
    setSelectedDatacenters(mappedOptions);
  };

  const softwareVersionSelectHandler = (
    event: React.SyntheticEvent,
    value: any,
  ) => {
    const mappedOptions = value.map((option: any) => option.value);
    setSelectedSoftwareVersions(mappedOptions);
  };

  const searchHandler = async (e: any) => {
    e.preventDefault();
    const abortController = new AbortController();
    const reqNetwork =
      network === WalletAdapterNetwork.Mainnet ? "mainnet" : "testnet";

    const reqBody = {
      network: reqNetwork,
      query: {
        count: Number(validatorsCount),
        names: selectedNames,
        apy: (selectedApy as number[]).map((val) =>
          Number((val / 100).toFixed(4)),
        ),
        asns: selectedAsns,
        dataCenters: selectedDatacenters,
        softwareVersions: selectedSoftwareVersions,
        currentValidatorCommission: selectedCommission,
        // votingPerformance: selectedVotePerformance,
        skipRate: selectedSkipRate,
      },
    };
    console.log(
      "🚀 ~ file: SearchForm.tsx ~ line 135 ~ searchHandler ~ reqBody",
      reqBody,
    );

    const { data } = await stakeMySolAxios.post("/search/search-validators", {
      signal: abortController.signal,
      data: reqBody,
    });
    console.log(
      "🚀 ~ file: SearchForm.tsx ~ line 129 ~ searchHandler ~ data",
      data,
    );

    setFoundValidators(data);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={searchHandler}>
        <Typography>Count: </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mx: 1, fontSize: 20 }}
            onClick={() => {
              setValidatorsCount(validatorsCount - 1);
            }}
            disabled={validatorsCount === 0}
          >
            -
          </Button>
          <ValidatorsCountInput
            value={validatorsCount}
            setValue={setValidatorsCount}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mx: 1, fontSize: 20 }}
            onClick={() => {
              setValidatorsCount(validatorsCount + 1);
            }}
            disabled={validatorsCount === MAX_VALIDATORS_TO_DELEGATE_TO}
          >
            +
          </Button>
        </Box>

        <Typography>Name: </Typography>
        <Autocomplete
          multiple
          onChange={nameSelectHandler}
          options={nameSelectOptions}
          getOptionLabel={(option) => option.label}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} />}
        />

        <Typography>APY(%): </Typography>
        <CustomSlider
          min={0}
          max={10}
          step={0.01}
          value={selectedApy}
          setValue={setSelectedApy}
        />

        <Typography>Commission: </Typography>
        <CustomSlider
          min={0}
          max={100}
          step={1}
          value={selectedCommission}
          setValue={setSelectedCommission}
        />

        <Typography>ASN: </Typography>
        <Autocomplete
          multiple
          onChange={asnSelectHandler}
          options={asnSelectOptions}
          getOptionLabel={(option) => option.label}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} />}
        />

        <Typography>Vote Performance (Avg): </Typography>
        <CustomSlider
          min={0}
          max={1}
          step={0.01}
          value={selectedVotePerformance}
          setValue={setSelectedVotePerformance}
          disabled
        />

        <Typography>Skip Rate: </Typography>
        <CustomSlider
          min={0}
          max={1}
          step={0.01}
          value={selectedSkipRate}
          setValue={setSelectedSkipRate}
        />

        <Typography>DataCenter: </Typography>
        <Autocomplete
          multiple
          onChange={datacenterSelectHandler}
          options={dataCenterSelectOptions}
          getOptionLabel={(option) => option.label}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} />}
        />
        <Typography>Software Version: </Typography>
        <Autocomplete
          multiple
          onChange={softwareVersionSelectHandler}
          options={softwareVersionSelectOptions}
          getOptionLabel={(option) => option.label}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} />}
        />
        <Button
          sx={{ mt: 2 }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </form>
    </Container>
  );
}

export default SearchPage;
