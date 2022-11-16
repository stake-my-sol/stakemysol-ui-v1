import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import stakeMySolAxios from "../../axios-instances";
import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchForm from "./SearchForm/SearchForm";
import ValidatorsSelection from "./DelegationForm/DelegationForm";
import { NetworkContext } from "../../Contexts/NetworkProvider";
import { SearchContext } from "../../Contexts/SearchContextProvider";
// import { GeneralNetworkDataContext } from "../src/Contexts/GeneralNetworkDataProvider";
import Progress from "../Progress";

const steps = ["Search", "Stake"];

type props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function SearchPageLayout({ children }: props) {
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const { network } = useContext(NetworkContext)!;
  const {
    activeStep,
    setActiveStep,
    advancedSearch,
    validatorsCount,
    validatorsCountActive,
    selectedNames,
    selectedNamesActive,
    selectedApy,
    selectedApyActive,
    selectedCommission,
    selectedCommissionActive,
    selectedVotePerformance,
    selectedVotePerformanceActive,
    selectedSkipRate,
    selectedSkipRateActive,
    selectedActiveStake,
    selectedActiveStakeActive,
    selectedActiveStakeSaturation,
    selectedActiveStakeSaturationActive,
    hasReceivedStakeFromStakePools,
    hasReceivedStakeFromStakePoolsActive,
    selectedAsns,
    selectedAsnsActive,
    selectedDatacenters,
    selectedDatacentersActive,
    selectedSoftwareVersions,
    selectedSoftwareVersionsActive,
    setFoundValidators,
  } = useContext(SearchContext)!;

  const searchHandler = async () => {
    // e.preventDefault();
    setIsSearching(true);
    const abortController = new AbortController();
    const reqNetwork =
      network === WalletAdapterNetwork.Mainnet ? "mainnet" : "testnet";

    const transformedApy = (selectedApy as number[]).map((val) =>
      Number((val / 100).toFixed(4)),
    );

    let transformedDataCenterConcentrationScore: number[] | null = Object.keys(
      selectedActiveStakeSaturation,
    ).reduce((prevValue, key) => {
      if (selectedActiveStakeSaturation[key as "0" | "-1" | "-2"]) {
        prevValue.push(Number(key));
      }
      return prevValue;
    }, [] as number[]);

    transformedDataCenterConcentrationScore = _.isEmpty(
      transformedDataCenterConcentrationScore,
    )
      ? null
      : transformedDataCenterConcentrationScore;

    const transformedSkipRate = selectedSkipRate.map((el: number) =>
      Number((el / 100).toFixed(3)),
    );

    const transformedVotePerformance = selectedVotePerformance.map(
      (el: number) => Number((el / 100).toFixed(3)),
    );

    const transformedActiveStake = selectedActiveStake.map(
      (el: number) => el * 1000000000,
    );

    let reqQuery: any = {
      count: Number(validatorsCount),
    };

    if (selectedNamesActive) {
      reqQuery.names = selectedNames;
    }

    if (selectedApyActive) {
      reqQuery.apy = transformedApy;
    }

    if (selectedCommissionActive) {
      reqQuery.currentValidatorCommission = selectedCommission;
    }

    if (advancedSearch) {
      if (selectedAsnsActive) {
        reqQuery.asns = selectedAsns;
      }

      if (selectedDatacentersActive) {
        reqQuery.datacenters = selectedDatacenters;
      }

      if (selectedSoftwareVersionsActive) {
        reqQuery.softwareVersions = selectedSoftwareVersions;
      }

      if (selectedVotePerformanceActive) {
        reqQuery.votingPerformance = transformedVotePerformance;
      }

      if (selectedActiveStakeActive) {
        reqQuery.activeStake = transformedActiveStake;
      }

      if (selectedSkipRateActive) {
        reqQuery.skipRate = transformedSkipRate;
      }

      if (hasReceivedStakeFromStakePoolsActive) {
        reqQuery.receivedStakeFromStakePools = hasReceivedStakeFromStakePools;
      }

      if (selectedActiveStakeSaturationActive) {
        reqQuery.dataCenterConcentrationScore =
          transformedDataCenterConcentrationScore;
      }
    }

    const reqBody = {
      network: reqNetwork,
      query: reqQuery,
    };
    console.log(
      "🚀 ~ file: SearchForm.tsx ~ line 141 ~ searchHandler ~ reqBody",
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
    setIsSearching(false);
  };

  const handleFormAction = async (activeStep: number) => {
    switch (activeStep) {
      case 0: {
        await searchHandler();
        router.push("/search/results");
        break;
      }
      case 1:
        // await stakeHandler();
        break;
      default:
        throw new Error(`Invalid active step ${activeStep}`);
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    router.push("/search");
  };

  return (
    <>
      <Head>
        <title>{activeStep === 0 ? "Search" : "Found Validators"}</title>
      </Head>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={(theme) => ({
                    "& .MuiStepLabel-label": {
                      fontSize: "0.8rem",
                    },

                    [theme.breakpoints.up(375)]: {
                      "& .MuiStepLabel-label": {
                        fontSize: "1rem",
                      },
                    },
                  })}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                You staked your sol successfully
              </Typography>
              <Typography variant="subtitle1">
                For reviewing your current stakes, you can visit &quot;Your
                Stakes&quot; page.
              </Typography>
            </>
          ) : (
            <>
              {children}
              {isSearching ? (
                <Progress />
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  {activeStep === 1 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  {activeStep === 0 && (
                    <Button
                      variant="contained"
                      onClick={() => handleFormAction(activeStep)}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Search
                    </Button>
                  )}
                </Box>
              )}
            </>
          )}
        </Paper>
      </Container>
    </>
  );
}
