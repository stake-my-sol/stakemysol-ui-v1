import { Box, Switch } from "@mui/material";
import { ReactNode } from "react";

interface FieldWrapperProps {
  children: ReactNode | ReactNode[];
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

function FieldWrapper({ children, checked, setChecked }: FieldWrapperProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <>
        <Switch
          sx={{ position: "absolute" }}
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <>{children}</>
      </>
    </Box>
  );
}

export default FieldWrapper;
