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

function ProfileTable({ billerName, transactionFee, totalFee, totalAmount }) {
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell align="left" title="Biller Name" />
              <TableHeaderCell align="right" title="Transaction Fee" />
              <TableHeaderCell align="right" title="Total Transaction Fee" />
              <TableHeaderCell align="right" title="Total Settlement Amount" />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableDataCell align="left" data={billerName} />
              <TableDataCell align="right" data={transactionFee} />
              <TableDataCell align="right" data={totalFee} />
              <TableDataCell align="right" data={totalAmount} />
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
