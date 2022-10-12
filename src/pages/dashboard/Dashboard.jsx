import { Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { WebLayout } from '../../components';
import {
	useChartLoopParamsQuery,
	useChartParamsQuery,
	useTotalParamsQuery,
} from '../../features/biller/billerApi';
import { formatPesos } from '../../utilities/formatCurrency';
import { getFormattedDateTwo } from '../../utilities/formatDate';
import { numberWithCommas } from '../../utilities/formatNumberWithComma';
import PanelTab from './components/PanelTab';
import TransactionChart from './components/TransactionChart';
import { TransactionData } from './components/TransactionData';

function Dashboard() {
	// transaction
	const [value, setValue] = useState(0);
	const [dateRange, setDateRange] = useState([]);
	const [startDate, endDate] = dateRange;
	const [transactionParams, setTransactionParams] = useState('day');
	const [chartParams, setChartParams] = useState('day');
	const [dateRangeParams, setDateRangeParams] = useState();
	const [activeLoopButton, setActiveLoopButton] = useState(false);

	// transaction params
	const { data: transaction, isFetching: transactionFetching } =
		useTotalParamsQuery(transactionParams);

	// chart params
	const { data: chart, isFetching: chartFetching } =
		useChartParamsQuery(chartParams);

	const { data: loop, isFetching: rangeFetching } =
		useChartLoopParamsQuery(dateRangeParams);

	const handleChange = (event, newValue) => {
		event.preventDefault();
		setValue(newValue);
	};

	const onDaily = (e) => {
		e.preventDefault();
		setActiveLoopButton(false);
		setTransactionParams(`day`);
		setChartParams(`day`);
	};

	const onMonthly = (e) => {
		e.preventDefault();
		setActiveLoopButton(false);
		setTransactionParams(`month`);
		setChartParams(`month`);
	};

	const onYearly = (e) => {
		e.preventDefault();
		setActiveLoopButton(false);
		setTransactionParams(`year`);
		setChartParams(`year`);
	};

	const onToDate = (e) => {
		e.preventDefault();
		setActiveLoopButton(false);
		setTransactionParams(`to_date`);
	};

	const onDateRangePicker = (e) => {
		e.preventDefault();
		setActiveLoopButton(true);
		let newStartDate = getFormattedDateTwo(dateRange[0]);
		let newEndDate = getFormattedDateTwo(dateRange[1]);

		if (dateRange === null) {
			return rangeFetching;
		} else {
			setDateRangeParams(`from=${newStartDate}&to=${newEndDate}`);
		}
	};

	// date picker chart shown
	let dateLoop =
		dateRange === []
			? rangeFetching
			: loop && loop.data.aggregate.map((res) => res.day);

	let chartLoop =
		dateRange === []
			? rangeFetching
			: loop && loop.data.aggregate.map((res) => res.revenue);

	// console.log(loop);
	// chart data
	// filter data
	let filterGroup =
		chartParams === 'day'
			? chart && chart.data.aggregate.map((res) => res.day)
			: chartParams === 'month'
			? chart && chart.data.aggregate.map((res) => res.month)
			: chartParams === 'year'
			? chart && chart.data.aggregate.map((res) => res.year)
			: chartFetching;

	let filterChart = chart && chart.data.aggregate.map((res) => res.revenue);

	let labels = activeLoopButton === false ? filterGroup : dateLoop;

	let dataChart = activeLoopButton === false ? filterChart : chartLoop;

	const chartData = {
		labels,
		datasets: [
			{
				label: 'Revenue',
				backgroundColor: 'rgb(14, 53, 83)',
				borderColor: 'rgb(14, 53, 83)',
				data: dataChart,
				showLine: true,
				tension: 0.4,
			},
		],
	};

	return (
		<WebLayout>
			<Box
				bgcolor='#fff'
				width='100%'
				height='100%'
				padding={2}
				display='flex'
				alignItems='center'
				flexDirection='column'
				overflow='auto'>
				{/* left box */}

				<TransactionData
					panelvalue={value}
					countData={
						transactionFetching ? (
							<CircularProgress size={16} />
						) : (
							numberWithCommas(transaction && transaction.data.aggregate[0].count)
						)
					}
					amountData={
						transactionFetching ? (
							<CircularProgress size={16} />
						) : (
							formatPesos(transaction && transaction.data.aggregate[0].revenue)
						)
					}>
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
				{/* right box */}
				<Box
					width='100%'
					height='100%'
					display='flex'
					alignItems='center'
					justifyContent='center'>
					{chartFetching || rangeFetching ? (
						<CircularProgress />
					) : (
						<TransactionChart chartData={chartData} />
					)}
				</Box>
			</Box>
		</WebLayout>
	);
}

export default Dashboard;
