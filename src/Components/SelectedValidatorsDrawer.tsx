import { useContext } from "react";
import {
  Drawer,
  Paper,
  Grid,
  Avatar,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import TrunkedTypography from "./TrunkedTypography";
import { ISelectedValidatorsContext } from "../@types/types";
import { SelectedValidatorsContext } from "../Contexts/SelectedValidatorsProvider";
import { NetworkContext } from "../Contexts/NetworkProvider";

interface SelectedValidatorsDrawerProps {
  drawer: boolean;
  toggleDrawer: () => void;
}

const useStyles = makeStyles((theme: any) => ({
  paperAnchorRight: {
    width: theme.spacing(30),
    paddingTop: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(40),
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  width: "100%",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  fontSize: theme.spacing(1.5),
}));

function SelectedValidatorsDrawer({
  drawer,
  toggleDrawer,
}: SelectedValidatorsDrawerProps) {
  const classes = useStyles();
  const { selectedValidators, removeValidator, reset } = useContext(
    SelectedValidatorsContext,
  ) as ISelectedValidatorsContext;
  const { network } = useContext(NetworkContext)!;

  return (
    <Drawer
      classes={{ paperAnchorRight: classes.paperAnchorRight }}
      anchor="right"
      open={drawer}
      onClose={toggleDrawer}
    >
      {
        // TODO: Make the button display dynamic
        // TODO: if there is no selected validators
        // TODO: Show a helper Text
      }
      <Button
        sx={{ margin: 1, mb: 2 }}
        variant="contained"
        color="error"
        onClick={reset}
      >
        Clear All
      </Button>
      <Divider />
      <Stack sx={{ mt: 2 }} direction="column" spacing={1}>
        {selectedValidators
          ?.filter((validator) => validator.network === network)
          .map((validator) => (
            <Item key={validator.validator.account}>
              <Grid container direction="row">
                <Grid item xs={2}>
                  <Avatar
                    alt="validator_avatar"
                    src={validator.validator.avatar_url!}
                    sx={{ width: 35, height: 35 }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={8}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <TrunkedTypography>
                      {validator.validator.name!}
                    </TrunkedTypography>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    color="error"
                    onClick={() => removeValidator(validator.validator)}
                  >
                    <HighlightOffIcon />
                  </Button>
                </Grid>
              </Grid>
            </Item>
          ))}
      </Stack>
    </Drawer>
  );
}

export default SelectedValidatorsDrawer;
