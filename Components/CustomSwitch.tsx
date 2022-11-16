import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  checked: boolean;
  toggleChecked: () => void;
};

const CustomSwitch = ({ checked, toggleChecked }: Props) => {
  return (
    <Box
      component={motion.div}
      sx={{
        cursor: "pointer",
        height: "100%",
        p: 2,
        m: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: checked ? "success.main" : "grey.300",
        borderRadius: "10px",
        transition: "background-color 0.2s ease-in-out",
      }}
      onClick={toggleChecked}
      whileTap={{ scale: 1.1 }}
    >
      {checked ? (
        <Image
          src="/checkmark_icon.svg"
          width={40}
          height={40}
          alt="checkmark icon"
        />
      ) : (
        <Image
          src="/red_cross_icon.svg"
          width={40}
          height={40}
          alt="cross icon"
        />
      )}
    </Box>
  );
};

export default CustomSwitch;
