import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { StyledTableCell } from "../../../style/style";

export default function TransactionTable({ children }) {
  return (
    <Box width="100%" height="fit-content" overflow="hidden">
      <TableContainer
        sx={{
          height: "fit-content",
          maxHeight: "100%",
          width: "100%",
          position: "relative",
          overflow: "auto",
        }}
        component={Paper}
        elevation={1}
      >
        <Table
          sx={{ height: "100%", width: "100%", position: "relative" }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead sx={{ width: "100%" }}>
            <TableRow>
              <StyledTableCell align="center">Date & Time</StyledTableCell>
              <StyledTableCell align="center">
                AllEasy Reference No.
              </StyledTableCell>
              <StyledTableCell align="center">
                ATM Reference No.
              </StyledTableCell>
              <StyledTableCell align="center">Bill No.</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">
                Mobile Number / Email
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ position: "relative" }}>{children}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
