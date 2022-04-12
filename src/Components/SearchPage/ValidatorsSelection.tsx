import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { Validator } from "../../@types/types";

interface ValidatorsSelectionProps {
  foundValidators: Validator[];
}

export default function ValidatorsSelection({
  foundValidators,
}: ValidatorsSelectionProps) {
  return (
    <>
      <Typography textAlign="center" variant="h6" gutterBottom>
        Select Validators and Amount
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {foundValidators.map((v: Validator) => (
            <Box key={v.account}>{v.name}</Box>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
