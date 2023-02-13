import {
  Box,
  CircularProgress,
  Divider,
  MenuItem,
  TableRow,
  TableCell,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Filter, TablePagination, WebLayout } from "../../components";
import { StyledTableRow } from "../../style/style";
import { formatPesos } from "../../utilities/formatCurrency";
import DataRow from "./components/DataRow";
import SummaryTable from "./components/SummaryTable";
import { getFormattedDateTwo } from "../../utilities/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { getListings } from "../../features/biller_group/billerSlice";
import { getSummaries } from "../../features/summary/summarySlice";
import ProfileTable from "./components/ProfileTable";
import { addDays } from "date-fns";
import { toast } from "react-toastify";

export default function Summary() {
  const [page, setPage] = useState(1);
  const [summariesParams, setSummariesParams] = useState(`page=${page}`);
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
  const { listings, isLoading: listingsLoading } = useSelector(
    (state) => state.biller
  );
  const { summaries, isLoading: summariesLoading } = useSelector(
    (state) => state.summary
  );

  // biller filter
  const onFilter = (e) => {
    e.preventDefault();
    let newStartDate = getFormattedDateTwo(state[0].startDate);
    let newEndDate = getFormattedDateTwo(state[0].endDate);

    if (selectValue === "" && state.length === 0) {
      toast.error("Date range picker and biller input is empty");
    } else if (selectValue === "" && state.length !== 0) {
      setSummariesParams(`page=${page}&from=${newStartDate}&to=${newEndDate}`);
    } else if (selectValue !== "" && state.length === 0) {
      setSummariesParams(`page=${page}&biller=${selectValue}`);
    } else if (selectValue !== "" && state.length !== 0) {
      setSummariesParams(
        `page=${page}&biller=${selectValue}&from=${newStartDate}&to=${newEndDate}`
      );
    } else {
      setSummariesParams(`page=${page}`);
    }
  };

  // search
  const searchOnClick = (e) => {
    e.preventDefault();

    if (!searchData) {
      setSummariesParams(`page=${page}`);
    } else {
      setSummariesParams(`page=1&keyword=${searchData}`);
    }
  };

  // pagination
  const onPagination = (event, value) => {
    setPage(value);
    setSummariesParams(`page=${value}`);
  };

  useEffect(() => {
    dispatch(getSummaries(summariesParams));
    dispatch(getListings());
  }, [dispatch, summariesParams]);

  return (
    <WebLayout>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        bgcolor="#fff"
        padding={1}
      >
        <Filter
          selectChildren={
            listingsLoading ? (
              <CircularProgress size={16} />
            ) : (
              listings?.data.listings.billers.map((res) => (
                <MenuItem key={res.id} value={res.code} sx={{ width: 200 }}>
                  {res.name}
                </MenuItem>
              ))
            )
          }
          selectValue={selectValue}
          selectOnChange={(e) => setSelectValue(e.target.value)}
          onFilter={onFilter}
          title="Summary"
          pickerOnchange={(item) => setState([item.selection])}
          dateRange={state}
          searchValue={searchData}
          searchOnChange={(e) => setSearchData(e.target.value)}
          searchOnClick={searchOnClick}
        />
        <Divider orientation="horizontal" sx={{ marginBottom: 2 }} flexItem />
        <Box width="100%" height="fit-content">
          <ProfileTable
            billerName={summaries?.data.billers.name}
            transactionDate={summaries?.data.total[0].date}
            transactionCount={summaries?.data.total[0].count}
            transactionAmount={formatPesos(summaries?.data.total[0].revenue)}
          />
          <Divider orientation="horizontal" sx={{ marginY: 2 }} flexItem />
          <SummaryTable>
            {summariesLoading || listingsLoading ? (
              <TableRow
                sx={{ width: "100%", height: 50, position: "relative" }}
              >
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
              summaries?.data.listings.data.map((row, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <DataRow
                    dataOne={row.created_at}
                    dataTwo={row.ae_refno}
                    dataThree={row.payment_type}
                    dataFour={formatPesos(row.debit)}
                    dataFive={row.sender_name}
                    dataSix={row.refno}
                  />
                </StyledTableRow>
              ))
            )}
          </SummaryTable>
          <TablePagination
            total_page={summaries?.data.listings.meta.pagination.total_pages}
            handleChange={onPagination}
          />
        </Box>
      </Box>
    </WebLayout>
  );
}
