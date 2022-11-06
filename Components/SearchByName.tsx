import { Box, TextField } from "@mui/material";
import React from "react";

type Props = {};

const SearchByName = (props: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextField
        placeholder="Search By name"
        variant="outlined"
        sx={{
          fontSize: "0.8rem",
          backgroundColor: "#bbe2f6",
        }}
      />
    </Box>
  );
};

export default SearchByName;
