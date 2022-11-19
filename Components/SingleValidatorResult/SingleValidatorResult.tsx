import { useContext } from "react";
import { findIndex, isNil } from "lodash";
import {
  Paper,
  Box,
  Grid,
  Divider,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { SelectedValidatorsContext } from "../../Contexts/SelectedValidatorsProvider";
import { NetworkContext } from "../../Contexts/NetworkProvider";

import { IValidator, ISelectedValidatorsContext } from "../../@types";
import Image from "next/image";
import smartNumber from "../../utils/smartNumber";
import SingleValidatorResultActionButton from "./SingleValidatorResultActionButton";
import validatorNameFormatter from "../../utils/validatorNameFormatter";
import TotalScore from "./TotalScore";

interface SingleValidatorResultProps {
  validator: IValidator;
  handleOpenShowMore: (validator: IValidator) => void;
}

function SingleValidatorResult({
  validator,
  handleOpenShowMore,
}: SingleValidatorResultProps) {
  const { selectedValidators, addValidator, removeValidator } = useContext(
    SelectedValidatorsContext,
  ) as ISelectedValidatorsContext;

  const { network } = useContext(NetworkContext)!;

  let actionButton = (
    <SingleValidatorResultActionButton
      component={motion.div}
      whileTap={{ scale: 1.1 }}
      variant="contained"
      color="secondary"
      onClick={() => addValidator(validator)}
    >
      Add
    </SingleValidatorResultActionButton>
  );

  if (
    findIndex(
      selectedValidators,
      (v) => v.validator.account === validator.account && v.network === network,
    ) !== -1
  ) {
    actionButton = (
      <SingleValidatorResultActionButton
        component={motion.div}
        whileTap={{ scale: 1.1 }}
        variant="contained"
        color="error"
        onClick={() => removeValidator(validator)}
      >
        Remove
      </SingleValidatorResultActionButton>
    );
  }
  return (
    <Paper
      sx={{
        backgroundColor: "grey.100",
        display: "flex",
        justifyContent: "space-between",
        flexGrow: 1,
        padding: 1,
        border: "1px solid black",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", flexGrow: 1 }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="validator avatar"
            src={validator.avatar_url!}
            sx={{ width: 50, height: 50 }}
          >
            <Image
              alt="validator avatar"
              src={
                isNil(validator.avatar_url)
                  ? "/default_validator_pic.svg"
                  : validator.avatar_url
              }
              fill
            />
          </Avatar>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            xs
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              container
              item
              xs={10}
              direction="row"
              justifyContent="space-between"
            >
              <Grid item xs={6}>
                <Typography
                  sx={{
                    borderRadius: "50px",
                    border: "1px solid black",
                    p: 1,
                    m: 1,
                    fontSize: "0.95rem",

                    // textAlign: "center",
                  }}
                >
                  {isNil(validator.name)
                    ? "Not Provided"
                    : validatorNameFormatter(validator.name, 22)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  sx={{
                    borderRadius: "50px",
                    border: "1px solid black",
                    p: 1,
                    m: 1,
                    fontSize: "0.95rem",

                    // textAlign: "center",
                  }}
                >
                  Apy: {(validator.apy! * 100).toFixed(2)}%
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  sx={{
                    borderRadius: "50px",
                    border: "1px solid black",
                    p: 1,
                    m: 1,
                    fontSize: "0.95rem",
                    // textAlign: "center",
                  }}
                >
                  Active Stake:{" "}
                  {isNil(validator.active_stake)
                    ? "Not Provided"
                    : `${smartNumber(validator.active_stake, 1000000000)} SOL`}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  sx={{
                    borderRadius: "50px",
                    border: "1px solid black",
                    p: 1,
                    m: 1,
                    fontSize: "0.95rem",

                    // textAlign: "center",
                  }}
                >
                  Commission:
                  {validator.commission}%
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {isNil(validator.total_score) ? (
                  "Not provided"
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Score: </Typography>

                    <TotalScore
                      maxScore={11}
                      minScore={0}
                      score={validator.total_score}
                      precision={0.5}
                      targetBase={6}
                      size="large"
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ borderLeft: "1px solid black", pl: 1 }}>
        <Grid
          container
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          height="100%"
        >
          <SingleValidatorResultActionButton
            variant="contained"
            color="info"
            onClick={() => handleOpenShowMore(validator)}
          >
            More
          </SingleValidatorResultActionButton>
          {actionButton}
        </Grid>
      </Box>
    </Paper>
  );
}

export default SingleValidatorResult;
