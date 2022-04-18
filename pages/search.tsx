import { useState, Dispatch, SetStateAction } from "react";
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
import ValidatorsSelection from "../src/Components/SearchPage/ValidatorsSelection";
import Review from "../src/Components/SearchPage/Review";
import { Validator } from "../src/@types/types";

const steps = ["Search", "Delegation", "Review"];

function getStepContent(
  step: number,
  foundValidators: Validator[],
  setFoundValidators: Dispatch<SetStateAction<Validator[]>>,
) {
  switch (step) {
    case 0:
      return <SearchForm setFoundValidators={setFoundValidators} />;
    case 1:
      return <ValidatorsSelection foundValidators={foundValidators} />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [foundValidators, setFoundValidators] = useState<Validator[]>([]);

  const handleNext = () => {
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
                      fontSize: "0.6rem",
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
              {getStepContent(activeStep, foundValidators, setFoundValidators)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
}
