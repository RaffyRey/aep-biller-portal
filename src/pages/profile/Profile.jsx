import { Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { WebLayout } from "../../components";
import Filters from "./components/Filters";

// new imports
import { useDispatch, useSelector } from "react-redux";
import { getBillers } from "../../features/biller_group/billerSlice";
import { toast } from "react-toastify";
import ProfileTable from "./components/ProfileTable";

export default function Profile() {
  const dispatch = useDispatch();
  const {
    billers,
    isLoading: billersLoading,
    isError: billersError,
    message: billerMessage,
  } = useSelector((state) => state.biller);

  const [page, setPage] = useState(1);
  const [params, setParams] = useState(`page=${page}`);
  const [searchData, setSearchData] = useState("");

  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
    setParams(`biller?page=${value}`);
  };

  // search
  const searchOnClick = (e) => {
    e.preventDefault();
    setParams(`page=${page}&keyword=${searchData}`);
  };

  useEffect(() => {
    if (billersError) {
      toast.error(billerMessage);
    }

    dispatch(getBillers(params));
  }, [dispatch, params, billerMessage, billersError]);

  return (
    <WebLayout>
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        paddingY={1}
        paddingX={2}
        bgcolor="#fff"
      >
        <Filters
          searchValue={searchData}
          searchOnChange={(e) => setSearchData(e.target.value)}
          searchOnClick={searchOnClick}
        />
        <Divider orientation="horizontal" sx={{ marginBottom: 2 }} flexItem />
        <ProfileTable data={billers?.data?.listings?.billers} />
      </Box>
    </WebLayout>
  );
}
