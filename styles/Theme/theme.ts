import React, { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface MUIThemeProps {
  children: ReactNode[] | ReactNode;
}

const theme = createTheme();

export default theme;
