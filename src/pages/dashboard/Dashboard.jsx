import { Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { WebLayout } from '../../components';
import { formatPesos } from '../../utilities/formatCurrency';
import { getFormattedDateTwo } from '../../utilities/formatDate';
import PanelTab from './components/PanelTab';
// import TransactionChart from './components/TransactionChart';
import { TransactionData } from './components/TransactionData';

// trying something
import { useDispatch, useSelector } from 'react-redux';
import {
	getChartQuery,
	getTransactionEndpoint,
} from '../../features/data/dataSlice';
import ChartTable from './components/Chart';

function Dashboard() {
	// trying something
	const dispatch = useDispatch();
	const { data, isLoading, isError, message } = useSelector(
		(state) => state.data,
	);

	console.log(data?.data.aggregate[0].count);

	const { chart, isLoading: isChartLoading } = useSelector(
		(state) => state.data,
	);

	React.useEffect(() => {
		if (isError) {
			console.log(message);
		}
		dispatch(getTransactionEndpoint('day'));
		dispatch(getChartQuery('group_by=day'));
	}, [isError, message, dispatch]);

	// transaction
	const [value, setValue] =
		useState(0); /* A state that is used to store the date range that is selected
	by the user. */

	const [dateRange, setDateRange] = useState([]);
	const [startDate, endDate] = dateRange;
	const [chartParams, setChartParams] = useState('day');
	const [activeLoopButton, setActiveLoopButton] = useState(false);

	const handleChange = (event, newValue) => {
		event.preventDefault();
		setValue(newValue);
	};

	const onDaily = async (e) => {
		e.preventDefault();
		setActiveLoopButton(false);
		try {
			dispatch(getTransactionEndpoint('day'));
			dispatch(getChartQuery('group_by=day'));
			setChartParams(`day`);
		} catch (error) {
			console.log(error);
		}
	};

	const onMonthly = async (e) => {
		e.preventDefault();
		setActiveLoopButton(false);
		try {
			dispatch(getTransactionEndpoint('month'));
			dispatch(getChartQuery('group_by=month'));
			setChartParams('month');
		} catch (error) {
			console.log(error);
		}
	};

	const onYearly = async (e) => {
		e.preventDefault();
		setActiveLoopButton(false);
		try {
			dispatch(getTransactionEndpoint('year'));
			dispatch(getChartQuery('group_by=year'));
			setChartParams('year');
		} catch (error) {
			console.log(error);
		}
	};

	const onToDate = (e) => {
		e.preventDefault();
		e.preventDefault();
		setActiveLoopButton(false);
		try {
			dispatch(getTransactionEndpoint('to_date'));
		} catch (error) {
			console.log(error);
		}
	};

	const onDateRangePicker = (e) => {
		e.preventDefault();
		setActiveLoopButton(true);
		let newStartDate = getFormattedDateTwo(dateRange[0]);
		let newEndDate = getFormattedDateTwo(dateRange[1]);

		console.log(dateRange.length === 0);

		if (dateRange.length === 0) {
			dispatch(getChartQuery('group_by=day'));
			setChartParams('day');
			console.log('Insert Date');
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
			: chart && chart.data.aggregate.map((res) => formatPesos(res.revenue));

	// chart data
	// filter data
	let filterGroup =
		chartParams === 'day'
			? chart && chart.data.aggregate.map((res) => res.day)
			: chartParams === 'month'
			? chart && chart.data.aggregate.map((res) => res.month)
			: chartParams === 'year'
			? chart && chart.data.aggregate.map((res) => res.year)
			: isChartLoading;

	let filterChart = chart && chart.data.aggregate.map((res) => res.revenue);

	let labels = activeLoopButton === false ? filterGroup : dateLoop;

	let dataChart = activeLoopButton === false ? filterChart : chartLoop;

	// const chartData = {
	// 	labels,
	// 	datasets: [
	// 		{
	// 			label: 'Revenue',
	// 			backgroundColor: 'rgb(14, 53, 83)',
	// 			borderColor: 'rgb(14, 53, 83)',
	// 			data: dataChart,
	// 			showLine: true,
	// 			tension: 0.4,
	// 		},
	// 	],
	// };

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
						isLoading ? (
							<CircularProgress size={16} />
						) : (
							<>{data && data.data.aggregate[0].count}</>
						)
					}
					amountData={
						isLoading ? (
							<CircularProgress size={16} />
						) : (
							<>{formatPesos(data && data.data.aggregate[0].revenue)}</>
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
					{isChartLoading ? (
						<CircularProgress />
					) : (
						<ChartTable labels={labels} chartData={dataChart} />
					)}
				</Box>
			</Box>
		</WebLayout>
	);
}

export default Dashboard;
