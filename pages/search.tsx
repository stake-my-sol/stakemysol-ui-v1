import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import _ from "lodash";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import stakeMySolAxios from "../src/axios-instances";
import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchForm from "../src/Components/SearchPage/SearchForm/SearchForm";
import ValidatorsSelection from "../src/Components/SearchPage/DelegationForm/DelegationForm";
import { NetworkContext } from "../src/Contexts/NetworkProvider";
import { SearchContext } from "../src/Contexts/SearchContextProvider";
// import { GeneralNetworkDataContext } from "../src/Contexts/GeneralNetworkDataProvider";

const steps = ["Search", "Delegation"];

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <SearchForm />;
    case 1:
      return <ValidatorsSelection />;

    default:
      throw new Error("Unknown step");
  }
};

export default function Search() {
  const { network } = useContext(NetworkContext)!;
  const { activeStep, setActiveStep } = useContext(SearchContext)!;

  const handleFormAction = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        break;
      case 1:
        break;
      default:
        throw new Error(`Invalid active step ${activeStep}`);
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Head>
        <title>Search Page</title>
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
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={() => handleFormAction(activeStep)}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Stake" : "Search"}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
}