import { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { SearchContext } from "../../../Contexts/SearchContextProvider";

import { IValidator } from "../../../@types";
import CustomNumberInput from "../../CustomNumberInput";
import { MIN_TO_STAKE_IN_SOLS, MAX_TO_STAKE_IN_SOLS } from "../../../Constants";
import FoundValidatorCard from "../../FoundValidatorCard";

export default function ValidatorsSelection() {
  const { foundValidators } = useContext(SearchContext);
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  return (
    <>
      <Typography textAlign="center" variant="h6" gutterBottom>
        Amount
      </Typography>
      <Grid container spacing={3}>
        <Grid item display="flex" justifyContent="center" xs={12}>
          <CustomNumberInput
            value={stakeAmount}
            setValue={setStakeAmount}
            min={MIN_TO_STAKE_IN_SOLS}
            max={MAX_TO_STAKE_IN_SOLS}
            decimalScale={9}
          />
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom>
              Found Validators
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            display="flex"
            justifyContent="center"
            spacing={4}
          >
            {foundValidators.map((v: IValidator) => (
              <Grid item xs={12} sm={6} key={v.account}>
                <FoundValidatorCard validator={v} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
