import { useContext, useState, Dispatch, SetStateAction } from "react";
import _ from "lodash";
import {
  Container,
  Button,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Checkbox,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ValidatorsCountInput from "./ValidatorsCountInput";
import FieldWrapper from "./FieldWrapper";
import { NetworkContext } from "../../../Contexts/NetworkProvider";
import { GeneralNetworkDataContext } from "../../../Contexts/GeneralNetworkDataProvider";
import { SearchContext } from "../../../Contexts/SearchContextProvider";
import { MAX_VALIDATORS_TO_DELEGATE_TO } from "../../../Constants";

import {
  SearchFormSelectOption,
  SoftwareVersion,
  Validator,
} from "../../../@types/types";
import CustomSlider from "../../CustomSlider";

function SearchPage() {
  const { network } = useContext(NetworkContext)!;

  const {
    advancedSearch,
    toggleAdvancedSearch,
    validatorsCount,
    setValidatorsCount,
    validatorsCountActive,
    toggleValidatorsCountActive,
    selectedNames,
    setSelectedNames,
    selectedNamesActive,
    toggleSelectedNamesActive,
    selectedApy,
    setSelectedApy,
    selectedApyActive,
    toggleSelectedApyActive,
    selectedCommission,
    setSelectedCommission,
    selectedCommissionActive,
    toggleSelectedCommissionActive,
    selectedVotePerformance,
    setSelectedVotePerformance,
    selectedVotePerformanceActive,
    toggleSelectedVotePerformanceActive,
    selectedSkipRate,
    setSelectedSkipRate,
    selectedSkipRateActive,
    toggleSelectedSkipRateActive,
    selectedActiveStake,
    setSelectedActiveStake,
    selectedActiveStakeActive,
    toggleSelectedActiveStakeActive,
    selectedActiveStakeSaturation,
    setSelectedActiveStakeSaturation,
    selectedActiveStakeSaturationActive,
    toggleSelectedActiveStakeSaturationActive,
    hasReceivedStakeFromStakePools,
    setHasReceivedStakeFromStakePools,
    hasReceivedStakeFromStakePoolsActive,
    toggleHasReceivedStakeFromStakePoolsActive,
    selectedAsns,
    setSelectedAsns,
    selectedAsnsActive,
    toggleSelectedAsnsActive,
    selectedDatacenters,
    setSelectedDatacenters,
    selectedDatacentersActive,
    toggleSelectedDatacentersActive,
    selectedSoftwareVersions,
    setSelectedSoftwareVersions,
    selectedSoftwareVersionsActive,
    toggleSelectedSoftwareVersionsActive,
  } = useContext(SearchContext)!;

  const generalNetworkData = useContext(GeneralNetworkDataContext);
  let nameSelectOptions: SearchFormSelectOption[] = [];
  let asnSelectOptions: SearchFormSelectOption[] = [];
  let dataCenterSelectOptions: SearchFormSelectOption[] = [];
  let softwareVersionSelectOptions: SearchFormSelectOption[] = [];
  let majorVersion: SoftwareVersion;
  let maxActiveStake: number = 5000000;

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

  if (generalNetworkData.maxActiveStake !== null) {
    maxActiveStake = Math.trunc(generalNetworkData.maxActiveStake / 1000000000);
  }

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

  const activeStakeSaturationSelectHandler = (key: "0" | "-1" | "-2") => {
    setSelectedActiveStakeSaturation({
      ...selectedActiveStakeSaturation,
      [key]: !selectedActiveStakeSaturation[key],
    });
  };

  const softwareVersionSelectHandler = (
    event: React.SyntheticEvent,
    value: any,
  ) => {
    const mappedOptions = value.map((option: any) => option.value);
    setSelectedSoftwareVersions(mappedOptions);
  };

  return (
    <Container maxWidth="sm">
      <form>
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

        <FieldWrapper
          checked={selectedNamesActive}
          toggleChecked={toggleSelectedNamesActive}
        >
          <Typography>Name: </Typography>
          <Autocomplete
            multiple
            onChange={nameSelectHandler}
            options={nameSelectOptions}
            getOptionLabel={(option) => option.label}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
            disabled={!selectedNamesActive}
          />
        </FieldWrapper>

        <FieldWrapper
          checked={selectedApyActive}
          toggleChecked={toggleSelectedApyActive}
        >
          <Typography>APY(%): </Typography>
          <CustomSlider
            min={0}
            max={10}
            step={0.1}
            value={selectedApy}
            setValue={setSelectedApy}
            disabled={!selectedApyActive}
          />
        </FieldWrapper>

        <FieldWrapper
          checked={selectedCommissionActive}
          toggleChecked={toggleSelectedCommissionActive}
        >
          <Typography>Commission(%): </Typography>
          <CustomSlider
            min={0}
            max={100}
            step={1}
            value={selectedCommission}
            setValue={setSelectedCommission}
            disabled={!selectedCommissionActive}
          />
        </FieldWrapper>
        {advancedSearch ? (
          <>
            <FieldWrapper
              checked={selectedActiveStakeActive}
              toggleChecked={toggleSelectedActiveStakeActive}
            >
              <Typography>Active Stake: </Typography>
              <CustomSlider
                min={0}
                max={maxActiveStake}
                step={10000}
                value={selectedActiveStake}
                setValue={setSelectedActiveStake}
                disabled={!selectedActiveStakeActive}
              />
            </FieldWrapper>

            <FieldWrapper
              checked={selectedAsnsActive}
              toggleChecked={toggleSelectedAsnsActive}
            >
              <Typography>ASN: </Typography>
              <Autocomplete
                multiple
                onChange={asnSelectHandler}
                options={asnSelectOptions}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} />}
                disabled={!selectedAsnsActive}
              />
            </FieldWrapper>

            <FieldWrapper
              checked={selectedVotePerformanceActive}
              toggleChecked={toggleSelectedVotePerformanceActive}
            >
              <Typography>Vote Performance(%Avg): </Typography>
              <CustomSlider
                min={0}
                max={100}
                step={0.1}
                value={selectedVotePerformance}
                setValue={setSelectedVotePerformance}
                disabled={!selectedVotePerformanceActive}
              />
            </FieldWrapper>

            <FieldWrapper
              checked={selectedSkipRateActive}
              toggleChecked={toggleSelectedSkipRateActive}
            >
              <Typography>Skip Rate(%): </Typography>
              <CustomSlider
                min={0}
                max={100}
                step={0.1}
                value={selectedSkipRate}
                setValue={setSelectedSkipRate}
                disabled={!selectedSkipRateActive}
              />
            </FieldWrapper>
            <FieldWrapper
              checked={selectedDatacentersActive}
              toggleChecked={toggleSelectedDatacentersActive}
            >
              <Typography>DataCenter: </Typography>
              <Autocomplete
                multiple
                onChange={datacenterSelectHandler}
                options={dataCenterSelectOptions}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} />}
                disabled={!selectedDatacentersActive}
              />
            </FieldWrapper>

            <FieldWrapper
              checked={selectedSoftwareVersionsActive}
              toggleChecked={toggleSelectedSoftwareVersionsActive}
            >
              <Typography>Software Version: </Typography>
              <Autocomplete
                multiple
                onChange={softwareVersionSelectHandler}
                options={softwareVersionSelectOptions}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} />}
                disabled={!selectedSoftwareVersionsActive}
              />
            </FieldWrapper>

            <FieldWrapper
              checked={hasReceivedStakeFromStakePoolsActive}
              toggleChecked={toggleHasReceivedStakeFromStakePoolsActive}
            >
              <FormGroup>
                <FormLabel id="has-received-stake-from-stake-pools">
                  Has received stake from stake pools?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="has-received-stake-from-stake-pools"
                  name="received-stake-from-stake-pools"
                  value={hasReceivedStakeFromStakePools}
                  onChange={() =>
                    setHasReceivedStakeFromStakePools(
                      !hasReceivedStakeFromStakePools,
                    )
                  }
                >
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                    labelPlacement="end"
                    disabled={!hasReceivedStakeFromStakePoolsActive}
                  />
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                    labelPlacement="end"
                    disabled={!hasReceivedStakeFromStakePoolsActive}
                  />
                </RadioGroup>
              </FormGroup>
            </FieldWrapper>

            <FieldWrapper
              checked={selectedActiveStakeSaturationActive}
              toggleChecked={toggleSelectedActiveStakeSaturationActive}
            >
              <FormGroup>
                <FormLabel>Validator is in a data center with a ...</FormLabel>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedActiveStakeSaturation["0"]}
                      onChange={() => activeStakeSaturationSelectHandler("0")}
                      disabled={!selectedActiveStakeSaturationActive}
                    />
                  }
                  label="normal percent of the active stake"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedActiveStakeSaturation["-1"]}
                      onChange={() => activeStakeSaturationSelectHandler("-1")}
                      disabled={!selectedActiveStakeSaturationActive}
                    />
                  }
                  label="high percent of the active stake"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedActiveStakeSaturation["-2"]}
                      onChange={() => activeStakeSaturationSelectHandler("-2")}
                      disabled={!selectedActiveStakeSaturationActive}
                    />
                  }
                  label="very high percent of the active stake"
                />
              </FormGroup>
            </FieldWrapper>
          </>
        ) : null}

        <Button onClick={toggleAdvancedSearch}>
          {advancedSearch ? "Go To Basic Search" : "Go To Advanced Search"}
        </Button>
      </form>
    </Container>
  );
}

export default SearchPage;
