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
import { SelectedValidatorsContext } from "../../Contexts/SelectedValidatorsProvider";
import { NetworkContext } from "../../Contexts/NetworkProvider";

import { IValidator, ISelectedValidatorsContext } from "../../@types";
import SingleValidatorResultSkeleton from "./SingleValidatorResultSkeleton";
import Image from "next/image";
import smartNumber from "../../utils/smartNumber";
import SingleValidatorResultActionButton from "./SingleValidatorResultActionButton";

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
        backgroundColor: "grey.50",
        display: "flex",
        flexGrow: 1,
        padding: 1,
      }}
    >
      <Box>
        <Grid
          container
          xs
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={2}>
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
          </Grid>
          <Grid
            container
            item
            xs={10}
            direction="row"
            justifyContent="space-between"
          >
            <Grid item xs={6}>
              <Typography>{validator.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Apy: {(validator.apy! * 100).toFixed(2)}%</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Active Stake:{" "}
                {isNil(validator.active_stake)
                  ? "Not Provided"
                  : `${smartNumber(validator.active_stake, 1000000000)} SOL`}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>
                Commission:
                {validator.commission}%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Total Score:
                {validator.total_score}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>{actionButton}</Grid>
          <Grid item>
            <SingleValidatorResultActionButton
              variant="contained"
              color="secondary"
              onClick={() => handleOpenShowMore(validator)}
            >
              More
            </SingleValidatorResultActionButton>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default SingleValidatorResult;
