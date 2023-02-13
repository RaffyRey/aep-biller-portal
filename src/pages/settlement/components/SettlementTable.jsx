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

export default function SettlementTable({ children }) {
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
      >
        <Table
          sx={{ width: "100%", position: "relative" }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead sx={{ width: "100%" }}>
            <TableRow>
              <StyledTableCell align="center">Date & Time</StyledTableCell>
              <StyledTableCell align="center">
                Biller Reference No.
              </StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Transaction Fee</StyledTableCell>
              <StyledTableCell align="center">
                Settlement Amount
              </StyledTableCell>
              <StyledTableCell align="center">
                AllEasy Reference
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ position: "relative" }}>{children}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
