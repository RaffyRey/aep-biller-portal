import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import React, { useState } from "react";
import { TablePagination, WebLayout } from "../../components";
import { StyledTableCell, StyledTableRow } from "../../style/style";
import { formatPesos } from "../../utilities/formatCurrency";

// trying something
import { useDispatch, useSelector } from "react-redux";
import { getMonitoringEndpoint } from "../../features/monitoring/monitoringSlice";
import { toast } from "react-toastify";

function Monitoring() {
  const dispatch = useDispatch();
  const { monitor, isLoading, isError, message } = useSelector(
    (state) => state.monitoring
  );
  const [page, setPage] = useState(1);
  const [params, setParams] = useState(page);

  React.useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getMonitoringEndpoint(params));
  }, [dispatch, isError, params, message]);

  const handleChange = (event, value) => {
    setPage(value);
    setParams(value);
  };

  return (
    <WebLayout>
      <Box
        width="100%"
        height="100%"
        display="flex"
        bgcolor="#fff"
        flexDirection="column"
      >
        <Typography
          variant="h5"
          textAlign="left"
          paddingLeft={2}
          color="#333"
          marginTop={2}
          fontFamily="Montserrat"
          fontWeight={700}
        >
          Daily Transaction Monitoring
        </Typography>
        <Box width="100%" height="fit-content" bgcolor="#fff" padding={2}>
          <Box width="100%" overflow="hidden" height="fit-content">
            <TableContainer
              sx={{ height: "100%", width: "100%", position: "relative" }}
              component={Paper}
            >
              <Table
                sx={{ height: "100%", width: "100%", position: "relative" }}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead sx={{ width: "100%" }}>
                  <TableRow>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">
                      Biller Reference No.
                    </StyledTableCell>
                    <StyledTableCell align="center">Amount</StyledTableCell>
                    <StyledTableCell align="center">Name</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ position: "relative" }}>
                  {isLoading ? (
                    <TableRow sx={{ width: "100%", position: "relative" }}>
                      {[...Array(6)].map((i) => (
                        <TableCell key={i}>
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height="100%"
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ) : (
                    monitor?.data?.listings.collections.map((row, index) => (
                      <StyledTableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" sx={{ fontSize: "14px" }}>
                          {row.created_at}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: "14px" }}>
                          {row.ae_refno}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: "14px" }}>
                          {formatPesos(row.debit)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: "14px", textTransform: "capitalize" }}
                        >
                          {row.sender_name}
                        </TableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <TablePagination
            handleChange={handleChange}
            total_page={monitor?.data?.listings.meta.pagination.total_pages}
          />
        </Box>
      </Box>
    </WebLayout>
  );
}

export default Monitoring;
