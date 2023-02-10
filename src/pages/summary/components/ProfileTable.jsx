import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

function ProfileTable({
  billerName,
  transactionDate,
  transactionCount,
  transactionAmount,
}) {
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell align="left" title="Biller Name" />
              <TableHeaderCell align="right" title="Transaction Date" />
              <TableHeaderCell align="right" title="Transaction Count" />
              <TableHeaderCell align="right" title="Total Transaction Amount" />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableDataCell align="left" data={billerName} />
              <TableDataCell align="right" data={transactionDate} />
              <TableDataCell align="right" data={transactionCount} />
              <TableDataCell align="right" data={transactionAmount} />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

const TableHeaderCell = ({ align, title }) => {
  return (
    <TableCell align={align}>
      <Typography fontSize={16} fontWeight={700} color="#898989">
        {title}
      </Typography>
    </TableCell>
  );
};

const TableDataCell = ({ align, data }) => {
  return (
    <TableCell align={align}>
      <Typography fontSize={14} fontWeight={600} color="#333">
        {data}
      </Typography>
    </TableCell>
  );
};

export default ProfileTable;
