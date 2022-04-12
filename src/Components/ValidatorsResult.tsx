import _ from "lodash";
import { Stack, Paper } from "@mui/material";
import SingleValidatorResult from "./SingleValidatorResult";
import { Validator } from "../@types/types";

interface ValidatorsResultProps {
  validators: Validator[];
  handleOpenShowMore: (validator: Validator) => void;
}

function ValidatorsResult({
  validators,
  handleOpenShowMore,
}: ValidatorsResultProps) {
  let renderedValidators;

  if (_.isEmpty(validators)) {
    renderedValidators = <Paper>Loading .....</Paper>;
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
