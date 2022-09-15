import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { SearchContext } from "../../../Contexts/SearchContextProvider";

import { Validator } from "../../../@types";

export default function ValidatorsSelection() {
  const { foundValidators } = useContext(SearchContext);
  return (
    <>
      <Typography textAlign="center" variant="h6" gutterBottom>
        Select Validators and Amount
      </Typography>
      <Grid item xs={12}></Grid>
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
