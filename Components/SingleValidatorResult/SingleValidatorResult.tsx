import { useContext } from "react";
import { findIndex } from "lodash";
import {
  Paper,
  Grid,
  Divider,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { SelectedValidatorsContext } from "../../Contexts/SelectedValidatorsProvider";
import { NetworkContext } from "../../Contexts/NetworkProvider";

import { Validator, ISelectedValidatorsContext } from "../../@types";
import SingleValidatorResultSkeleton from "./SingleValidatorResultSkeleton";

interface SingleValidatorResultProps {
  validator: Validator;
  handleOpenShowMore: (validator: Validator) => void;
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
    <Button
      variant="contained"
      color="secondary"
      onClick={() => addValidator(validator)}
    >
      Add
    </Button>
  );

  if (
    findIndex(
      selectedValidators,
      (v) => v.validator.account === validator.account && v.network === network,
    ) !== -1
  ) {
    actionButton = (
      <Button
        variant="contained"
        color="error"
        onClick={() => removeValidator(validator)}
      >
        Remove
      </Button>
    );
  }
  return (
    <Paper sx={{ backgroundColor: "grey.50", flexGrow: 1, padding: 1 }}>
      {/* <SingleValidatorResultSkeleton /> */}
      <Grid direction="column" container>
        <Grid
          container
          item
          xs
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={2}>
            <Avatar
              alt="validator_avatar"
              src={validator.avatar_url!}
              sx={{ width: 50, height: 50 }}
            />
          </Grid>
          <Grid
            container
            item
            xs={10}
            direction="column"
            justifyContent="center"
          >
            <Grid item xs>
              <Typography textAlign="center">{validator.name}</Typography>
              <Divider />
            </Grid>
            <Grid container item xs>
              <Grid item xs={5}>
                <Typography>
                  Apy: {(validator.apy! * 100).toFixed(2)}%
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography>
                  Active Stake:{" "}
                  {(validator.active_stake! / 1000000000).toFixed(2)} SOL
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs>
              <Grid item xs={5}>
                <Typography>
                  Commission:
                  {validator.commission}%
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography>
                  Total Score:
                  {validator.total_score}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>{actionButton}</Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleOpenShowMore(validator)}
            >
              More
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SingleValidatorResult;
