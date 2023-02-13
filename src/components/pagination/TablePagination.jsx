import { Box, Pagination, Paper } from "@mui/material";
import React from "react";

const TablePagination = ({ total_page, handleChange }) => {
  return (
    <Box
      width="100%"
      height={40}
      display="flex"
      alignItems="center"
      justifyContent="center"
      component={Paper}
      elevation={2}
    >
      <Pagination
        count={total_page}
        showFirstButton
        showLastButton
        size="small"
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

export default TablePagination;
