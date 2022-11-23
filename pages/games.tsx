import { Box, Paper, Container } from "@mui/material";
import { NextPage } from "next";

const Games: NextPage = () => {
  return (
    <Container maxWidth="md" sx={{ width: "90%", mt: 5 }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ textAlign: "center" }}>Games</Box>
        <Box sx={{ textAlign: "center" }}>Under Construction!</Box>
        <Box sx={{ textAlign: "center" }}>stay tuned!</Box>
      </Paper>
    </Container>
  );
};

export default Games;
