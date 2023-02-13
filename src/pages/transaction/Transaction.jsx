import {
  Box,
  CircularProgress,
  Divider,
  MenuItem,
  Skeleton,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TablePagination, WebLayout, Filter } from "../../components";
import { StyledTableCell, StyledTableRow } from "../../style/style";
import { getFormattedDateTwo } from "../../utilities/formatDate";
import TransactionTable from "./components/TransactionTable";

// new imports
import { useDispatch, useSelector } from "react-redux";
import {
  getListings,
  getTransactions,
} from "../../features/biller_group/billerSlice";
import { toast } from "react-toastify";
import { addDays } from "date-fns";
import { formatPesos } from "../../utilities/formatCurrency";

export default function Transaction() {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState(`page=${page}`);
  const [selectValue, setSelectValue] = useState("");
  const [searchData, setSearchData] = useState("");
  const [state, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const dispatch = useDispatch();
  const {
    listings,
    isLoading: listingsLoading,
    isError: listingsError,
    message: listingsMessage,
  } = useSelector((state) => state.biller);

  const {
    transactions,
    isLoading: transactionsLoading,
    isError: transactionsError,
    message: transactionsMessage,
  } = useSelector((state) => state.biller);

  useEffect(() => {
    if (listingsError) {
      toast.error(listingsMessage);
    }
    if (transactionsError) {
      toast.error(transactionsMessage);
    }
    dispatch(getListings());
    dispatch(getTransactions(params));
  }, [
    dispatch,
    params,
    listingsError,
    listingsMessage,
    transactionsError,
    transactionsMessage,
  ]);

  const onPagination = (event, value) => {
    setPage(value);
    setParams(`page=${value}`);
  };

  // biller filter
  const onFilter = (e) => {
    e.preventDefault();
    let newStartDate = getFormattedDateTwo(state[0].startDate);
    let newEndDate = getFormattedDateTwo(state[0].endDate);

    console.log(newStartDate + " " + newEndDate);

    if (selectValue === "" && state.length === 0) {
      toast.error("Date range picker and biller input is empty");
    } else if (selectValue === "" && state.length !== 0) {
      setParams(`from=${newStartDate}&to=${newEndDate}&page=${page}`);
    } else if (selectValue !== "" && state.length === 0) {
      setParams(`v2?page=${page}&biller=${selectValue}`);
    } else if (selectValue !== "" && state.length !== 0) {
      setParams(
        `v2?from=${newStartDate}&to=${newEndDate}page=${page}&biller=${selectValue}`
      );
    } else {
      setParams(`page=${page}`);
    }
  };

  // search
  const searchOnClick = (e) => {
    e.preventDefault();

    if (!searchData) {
      setParams(`page=${page}`);
    } else {
      setParams(`page=1&keyword=${searchData}`);
    }
  };

  return (
    <WebLayout>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        bgcolor="#fff"
        padding={1}
      >
        <Box width="100%" display="flex" flexDirection="column">
          <Filter
            selectChildren={
              listingsLoading ? (
                <CircularProgress size={16} />
              ) : (
                listings?.data.listings.billers.map((res) => (
                  <MenuItem key={res.id} value={res.code}>
                    {res.name}
                  </MenuItem>
                ))
              )
            }
            selectValue={selectValue}
            selectOnChange={(e) => setSelectValue(e.target.value)}
            onFilter={onFilter}
            title="Transactions"
            pickerOnchange={(item) => setState([item.selection])}
            dateRange={state}
            searchValue={searchData}
            searchOnChange={(e) => setSearchData(e.target.value)}
            searchOnClick={searchOnClick}
          />
          <Divider orientation="horizontal" sx={{ marginBottom: 2 }} />
          <Box width="100%" height="100%" overflow="hidden">
            <TransactionTable>
              {transactionsLoading ? (
                <TableRow
                  sx={{ width: "100%", height: 50, position: "relative" }}
                >
                  {[...Array(6)].map((i) => (
                    <TableCell>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ) : (
                transactions?.data?.listings.collections.map((row) => (
                  <StyledTableRow
                    key={row.refno}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
                      {row.created_at}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
                      {row.refno}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
                      {row.dynamic_columns[0].value}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
                      {row.dynamic_columns[1].value}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
                      {formatPesos(row.debit)}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
                      {row.dynamic_columns[3].value}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TransactionTable>
            <TablePagination
              total_page={
                transactions?.data?.listings.meta.pagination.total_pages
              }
              handleChange={onPagination}
            />
          </Box>
        </Box>
      </Box>
    </WebLayout>
  );
}
