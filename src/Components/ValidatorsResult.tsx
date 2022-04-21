import _ from "lodash";
import { Stack, Paper, Typography } from "@mui/material";
import SingleValidatorResult from "./SingleValidatorResult/SingleValidatorResult";
import SingleValidatorResultSkeleton from "./SingleValidatorResult/SingleValidatorResultSkeleton";
import { Validator } from "../@types/types";

interface ValidatorsResultProps {
  validators: Validator[];
  handleOpenShowMore: (validator: Validator) => void;
  perPage: number;
}

function ValidatorsResult({
  validators,
  handleOpenShowMore,
  perPage,
}: ValidatorsResultProps) {
  let renderedValidators;
  let skeletonKey = 0;
  if (_.isEmpty(validators)) {
    renderedValidators = (
      <Paper sx={{ minHeight: "20rem", p: 1 }}>
        {[...Array(perPage)].map(() => {
          return <SingleValidatorResultSkeleton key={skeletonKey++} />;
        })}
      </Paper>
    );
  } else {
    renderedValidators = validators.map((validator: any) => (
      <SingleValidatorResult
        handleOpenShowMore={handleOpenShowMore}
        key={validator.account}
        validator={validator}
      />
    ));
  }

  return <Stack spacing={1}>{renderedValidators}</Stack>;
}

export default ValidatorsResult;
