import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Review() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      <Grid container spacing={2}>
        <Typography>summary goes here...</Typography>
      </Grid>
    </>
  );
}
