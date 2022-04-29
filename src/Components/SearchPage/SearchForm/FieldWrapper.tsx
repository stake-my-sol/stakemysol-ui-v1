import { Box, Switch } from "@mui/material";
import { ReactNode } from "react";

interface FieldWrapperProps {
  children: ReactNode | ReactNode[];
  checked: boolean;
  toggleChecked: () => void;
}

function FieldWrapper({ children, checked, toggleChecked }: FieldWrapperProps) {
  return (
    <Box
      sx={{
        position: "relative",
        border: "1px solid black",
        borderRadius: "10px",
        p: 1,
        m: 1,
      }}
    >
      <>
        <Switch
          sx={{ position: "absolute", top: 1, right: 1 }}
          checked={checked}
          onChange={toggleChecked}
        />
        <>{children}</>
      </>
    </Box>
  );
}

export default FieldWrapper;
