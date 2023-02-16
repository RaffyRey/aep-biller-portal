import { Box, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { WebLayout } from "../../components";
import { formatPesos } from "../../utilities/formatCurrency";
import { getFormattedDateTwo } from "../../utilities/formatDate";
import PanelTab from "./components/PanelTab";
import TransactionChart from "./components/TransactionChart";
import { TransactionData } from "./components/TransactionData";
import { useDispatch, useSelector } from "react-redux";
import {
  getChartQuery,
  getTransactionEndpoint,
} from "../../features/data/dataSlice";
import { toast } from "react-toastify";

function Dashboard() {
  const dispatch = useDispatch();
  const { data, isLoading, isError, message } = useSelector(
    (state) => state.data
  );

  const { chart, isLoading: isChartLoading } = useSelector(
    (state) => state.data
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTransactionEndpoint("day"));
    dispatch(getChartQuery("group_by=day"));
  }, [isError, message, dispatch]);

  // state
  const [value, setValue] = useState(0);
  const [dateRange, setDateRange] = useState([]);
  const [startDate, endDate] = dateRange;
  const [chartParams, setChartParams] = useState("day");
  const [activeLoopButton, setActiveLoopButton] = useState(false);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const onDaily = async (e) => {
    e.preventDefault();
    setActiveLoopButton(false);
    try {
      dispatch(getTransactionEndpoint("day"));
      dispatch(getChartQuery("group_by=day"));
      setChartParams(`day`);
    } catch (error) {
      console.log(error);
    }
  };

  const onMonthly = async (e) => {
    e.preventDefault();
    setActiveLoopButton(false);
    try {
      dispatch(getTransactionEndpoint("month"));
      dispatch(getChartQuery("group_by=month"));
      setChartParams("month");
    } catch (error) {
      console.log(error);
    }
  };

  const onYearly = async (e) => {
    e.preventDefault();
    setActiveLoopButton(false);
    try {
      dispatch(getTransactionEndpoint("year"));
      dispatch(getChartQuery("group_by=year"));
      setChartParams("year");
    } catch (error) {
      console.log(error);
    }
  };

  const onToDate = (e) => {
    e.preventDefault();
    e.preventDefault();
    setActiveLoopButton(false);
    try {
      dispatch(getTransactionEndpoint("to_date"));
    } catch (error) {
      toast.error(error);
    }
  };

  const onDateRangePicker = (e) => {
    e.preventDefault();
    setActiveLoopButton(true);
    let newStartDate = getFormattedDateTwo(dateRange[0]);
    let newEndDate = getFormattedDateTwo(dateRange[1]);

    if (dateRange.length === 0) {
      dispatch(getChartQuery("group_by=day"));
      setChartParams("day");
      toast.error("Insert Date");
    } else {
      dispatch(getChartQuery(`from=${newStartDate}&to=${newEndDate}`));
    }
  };

  // date picker chart shown
  let dateLoop =
    dateRange === []
      ? isChartLoading
      : chart && chart.data.aggregate.map((res) => res.day);

  let chartLoop =
    dateRange === []
      ? isChartLoading
      : chart && chart.data.aggregate.map((res) => res.revenue);

  // chart data
  // filter data
  let filterGroup =
    chartParams === "day"
      ? chart && chart.data.aggregate.map((res) => res.day)
      : chartParams === "month"
      ? chart && chart.data.aggregate.map((res) => res.month)
      : chartParams === "year"
      ? chart && chart.data.aggregate.map((res) => res.year)
      : isChartLoading;

  let filterChart = chart && chart.data.aggregate.map((res) => res.revenue);

  let labels = activeLoopButton === false ? filterGroup : dateLoop;

  let dataChart = activeLoopButton === false ? filterChart : chartLoop;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        backgroundColor: "#c1272d",
        borderColor: "#c1272d",
        data: dataChart,
        showLine: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <WebLayout>
      <Box
        bgcolor="#fff"
        width="100%"
        height="100%"
        padding={2}
        display="flex"
        alignItems="center"
        flexDirection="column"
        overflow="auto"
      >
        <TransactionData
          panelvalue={value}
          countData={
            isLoading ? (
              <CircularProgress size={16} color="primary" />
            ) : (
              <>{data?.data?.aggregate[0].count}</>
            )
          }
          amountData={
            isLoading ? (
              <CircularProgress size={16} color="primary" />
            ) : (
              <>{formatPesos(data?.data?.aggregate[0].revenue)}</>
            )
          }
        >
          <PanelTab
            tabDaily={onDaily}
            tabMonthly={onMonthly}
            tabYearly={onYearly}
            tabToDate={onToDate}
            tabOnChange={handleChange}
            tabValue={value}
            startDate={startDate}
            endDate={endDate}
            dataPickerOnChange={(update) => {
              setDateRange(update);
            }}
            datePickerOnClick={onDateRangePicker}
          />
        </TransactionData>
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {isChartLoading ? (
            <CircularProgress color="error" />
          ) : (
            <TransactionChart chartData={chartData} />
          )}
        </Box>
      </Box>
    </WebLayout>
  );
}

export default Dashboard;
