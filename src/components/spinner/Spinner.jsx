import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Spinner = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Spinner;
