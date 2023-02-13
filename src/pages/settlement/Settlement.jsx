import {
  Box,
  CircularProgress,
  Divider,
  MenuItem,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Filter, Spinner, TablePagination, WebLayout } from "../../components";
import { StyledTableRow } from "../../style/style";
import { formatPesos } from "../../utilities/formatCurrency";
import { getFormattedDateTwo } from "../../utilities/formatDate";
import DataRow from "./components/DataRow";
import SettlementTable from "./components/SettlementTable";
import { toast } from "react-toastify";

// new imports
import { useDispatch, useSelector } from "react-redux";
import {
  getListings,
  getSettlement,
} from "../../features/biller_group/billerSlice";
import ProfileTable from "./components/ProfileTable";
import { addDays } from "date-fns";

export default function Settlement() {
  const [searchData, setSearchData] = useState("");
  const [page, setPage] = useState(1);
  const [settlementParams, setSettlementParams] = useState(`page=${page}`);
  const [selectValue, setSelectValue] = useState("");
  const [state, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const dispatch = useDispatch();
  const {
    settlement,
    isLoading: settlementLoading,
    isError: settlementError,
  } = useSelector((state) => state.biller);

  const {
    listings,
    isLoading: listingsLoading,
    isError: listingsError,
  } = useSelector((state) => state.biller);

  // biller filter
  const onFilter = (e) => {
    e.preventDefault();
    let newStartDate = getFormattedDateTwo(state[0].startDate);
    let newEndDate = getFormattedDateTwo(state[0].endDate);

    if (selectValue === "" && state.length === 0) {
      toast.error("Date range picker and biller input is empty");
    } else if (selectValue === "" && state.length !== 0) {
      setSettlementParams(`page=${page}from=${newStartDate}&to=${newEndDate}`);
    } else if (selectValue !== "" && state.length === 0) {
      setSettlementParams(`page=${page}&biller=${selectValue}`);
    } else if (selectValue !== "" && state.length !== 0) {
      setSettlementParams(
        `page=${page}&biller=${selectValue}&from=${newStartDate}&to=${newEndDate}`
      );
    } else {
      setSettlementParams(`page=${page}`);
    }
  };

  // search
  const searchOnClick = (e) => {
    e.preventDefault();

    if (!searchData) {
      setSettlementParams(`page=${page}`);
    } else {
      setSettlementParams(`page=1&keyword=${searchData}`);
    }
  };

  // pagination
  const onPagination = (event, value) => {
    setPage(value);
    setSettlementParams(`page=${value}`);
  };

  useEffect(() => {
    if (settlementError || listingsError) {
      toast.error("Error");
    }

    dispatch(getListings());
    dispatch(getSettlement(settlementParams));
  }, [dispatch, settlementParams, settlementError, listingsError]);

  return (
    <WebLayout>
      {settlementLoading || listingsLoading ? (
        <Spinner />
      ) : (
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
            onFilter={onFilter}
            selectOnChange={(e) => setSelectValue(e.target.value)}
            title="Settlement"
            pickerOnchange={(item) => setState([item.selection])}
            dateRange={state}
            searchValue={searchData}
            searchOnChange={(e) => setSearchData(e.target.value)}
            searchOnClick={searchOnClick}
          />
          <Divider orientation="horizontal" sx={{ marginBottom: 2 }} flexItem />
          <Box width="100%" height="fit-content">
            <ProfileTable
              billerName={
                settlementLoading ? (
                  <SkeletonLoader />
                ) : (
                  settlement?.data.billers.name
                )
              }
              totalFee={formatPesos(settlement?.data.total[0].totalBillerFee)}
              transactionFee={"--"}
              totalAmount={formatPesos(
                settlement?.data.total[0].totalSettlement
              )}
            />
            <Divider orientation="horizontal" sx={{ marginY: 2 }} flexItem />
            <SettlementTable>
              {settlement?.data.listings.data.map((row, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <DataRow
                    dataOne={row.created_at}
                    dataTwo={row.ae_refno}
                    dataThree={row.payment_type}
                    dataFour={formatPesos(row.debit)}
                    dataFive={formatPesos(row.biller_fee)}
                    dataSix={formatPesos(row.amount_minus_biller_fee)}
                    dataSeven={row.refno}
                  />
                </StyledTableRow>
              ))}
            </SettlementTable>
            <TablePagination
              total_page={settlement?.data.listings.meta.pagination.total_pages}
              handleChange={onPagination}
            />
          </Box>
        </Box>
      )}
    </WebLayout>
  );
}

const SkeletonLoader = () => {
  return <Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />;
};
