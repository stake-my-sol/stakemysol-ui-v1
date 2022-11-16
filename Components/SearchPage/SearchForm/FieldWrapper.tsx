import { Box, Switch } from "@mui/material";
import { ReactNode } from "react";
import CustomSwitch from "../../CustomSwitch";

interface FieldWrapperProps {
  children: ReactNode | ReactNode[];
  checked: boolean;
  toggleChecked: () => void;
}

function FieldWrapper({ children, checked, toggleChecked }: FieldWrapperProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        my: 2,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          border: "1px solid black",
          borderRadius: "10px",
          p: 2,
          backgroundColor: "grey.200",
        }}
      >
        {children}
      </Box>
      <CustomSwitch checked={checked} toggleChecked={toggleChecked} />
    </Box>
  );
}

export default FieldWrapper;
