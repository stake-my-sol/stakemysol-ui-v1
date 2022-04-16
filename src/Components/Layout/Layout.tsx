import { ReactNode } from "react";
import { Box, Fab } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { makeStyles } from "@mui/styles";
import useToggle from "../../hooks/useToggle";
import Header from "./Header";
import SelectedValidatorsDrawer from "../SelectedValidatorsDrawer";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(2),
  },

  Layout: {
    backgroundColor: theme.palette.grey[300],
    width: "100%",
    minHeight: "100vh",
  },
}));

// * current solution for overriding FAB styles is inline styles.
// TODO: implement a better solution if there is one
const fabStyles: React.CSSProperties = {
  position: "fixed",
  bottom: "1rem",
  right: "1rem",
};

function Layout({ children }: LayoutProps) {
  const classes = useStyles();
  const [drawer, toggleDrawer] = useToggle(false);

  return (
    <Box className={classes.Layout}>
      <Header />
      <SelectedValidatorsDrawer drawer={drawer} toggleDrawer={toggleDrawer} />
      {children}
      <Fab
        onClick={toggleDrawer}
        classes={{ root: classes.root }}
        style={fabStyles}
        color="primary"
        aria-label="selected validators"
      >
        <ShoppingBasketIcon />
      </Fab>

      <Footer />
    </Box>
  );
}

export default Layout;
