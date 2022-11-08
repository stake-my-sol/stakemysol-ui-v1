import { Button } from "@mui/material";
import React from "react";

type Props = React.ComponentProps<typeof Button>;

const SingleValidatorResultActionButton = (props: Props) => {
  return (
    <Button sx={{ fontSize: "0.8rem" }} {...props}>
      {props.children}
    </Button>
  );
};

export default SingleValidatorResultActionButton;
