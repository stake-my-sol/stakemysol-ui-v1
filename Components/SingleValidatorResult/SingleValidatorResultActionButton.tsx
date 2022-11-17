import { Button, Box } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

type Props = React.ComponentProps<typeof Button> &
  React.ComponentProps<typeof Box> &
  React.ComponentProps<typeof motion.button>;

const SingleValidatorResultActionButton = (props: Props) => {
  return (
    <Button
      sx={{ fontSize: "0.8rem", px: 0, py: 1, borderRadius: "25px" }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default SingleValidatorResultActionButton;
