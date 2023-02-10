import {
  Box,
  CircularProgress,
  Divider,
  MenuItem,
  Skeleton,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TablePagination, WebLayout } from "../../components";
import { StyledTableRow } from "../../style/style";
import { formatPesos } from "../../utilities/formatCurrency";
import { getFormattedDateTwo } from "../../utilities/formatDate";
import DataRow from "./components/DataRow";
import Filters from "./components/Filter";
import Loading from "./components/Loading";
import ProfileCard from "./components/ProfileCard";
import SettlementTable from "./components/SettlementTable";

// new imports
import { useDispatch, useSelector } from "react-redux";
import {
  getListings,
  getSettlement,
} from "../../features/biller_group/billerSlice";
import ProfileTable from "./components/ProfileTable";

export default function Settlement() {
  const [page, setPage] = useState(1);
  const [settlementParams, setSettlementParams] = useState(`page=${page}`);
  const [selectValue, setSelectValue] = useState("");
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
    setSettlementParams(`biller=${selectValue}`);
  };

  // pagination
  const onPagination = (event, value) => {
    setPage(value);
    setSettlementParams(`page=${value}`);
  };

  useEffect(() => {
    dispatch(getListings());
    dispatch(getSettlement(settlementParams));
  }, [dispatch, settlementParams]);

  return (
    <WebLayout>
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        overflow="auto"
        bgcolor="#fff"
        paddingY={1}
        paddingX={2}
      >
        <Filters
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
        />
        <Divider orientation="horizontal" sx={{ marginBottom: 2 }} flexItem />
        <Box width="100%" height="fit-content">
          <ProfileCard
            profileName={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                settlement?.data.billers.name
              )
            }
            profileTransactionDate={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                settlement?.data.total[0].date
              )
            }
            profileTransactionCount={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                settlement?.data.total[0].count
              )
            }
            profileTransactionAmount={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                formatPesos(settlement?.data.total[0].revenue)
              )
            }
            profileTransactionFee={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                formatPesos(settlement?.data.total[0].transaction_fee)
              )
            }
            profileTotalTransactionFee={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                formatPesos(settlement?.data.total[0].totalBillerFee)
              )
            }
            profileSettlementAmount={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                formatPesos(settlement?.data.total[0].totalSettlement)
              )
            }
          />
          <Divider orientation="horizontal" sx={{ marginY: 2 }} flexItem />
          <SettlementTable>
            {settlementLoading ? (
              <TableRow sx={{ width: "100%", position: "relative" }}>
                <Loading />
              </TableRow>
            ) : (
              settlement?.data.listings.data.map((row, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <DataRow
                    dataOne={getFormattedDateTwo(row.created_at)}
                    dataTwo={row.ae_refno}
                    dataThree={row.payment_type}
                    dataFour={formatPesos(row.debit)}
                    dataFive={formatPesos(row.biller_fee)}
                    dataSix={formatPesos(row.amount_minus_biller_fee)}
                    dataSeven={row.refno}
                  />
                </StyledTableRow>
              ))
            )}
          </SettlementTable>
          <TablePagination
            total_page={settlement?.data.listings.meta.pagination.total_pages}
            handleChange={onPagination}
          />
        </Box>
      </Box>
    </WebLayout>
  );
}

const SkeletonLoader = () => {
  return <Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />;
};
