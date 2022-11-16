import {
	Box,
	CircularProgress,
	Divider,
	MenuItem,
	Pagination,
	Skeleton,
	TableCell,
	TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TablePagination, WebLayout } from '../../components';
import { StyledTableCell, StyledTableRow } from '../../style/style';
import { getFormattedDateTwo } from '../../utilities/formatDate';
import Filters from './components/Filters';
import TransactionTable from './components/TransactionTable';

// new imports
import { useDispatch, useSelector } from 'react-redux';
import {
	getListings,
	getTransactions,
} from '../../features/biller_group/billerSlice';

export default function Transaction() {
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

	const [page, setPage] = useState(1);
	const [params, setParams] = useState(`page=${page}`);
	const [selectValue, setSelectValue] = useState('');
	const [dateRange, setDateRange] = useState([]);
	const [startDate, endDate] = dateRange;
	const [searchData, setSearchData] = useState('');

	useEffect(() => {
		dispatch(getListings());
		dispatch(getTransactions(params));
	}, [dispatch, params]);

	const onPagination = (event, value) => {
		setPage(value);
		setParams(`page=${value}`);
	};

	// biller filter
	const onFilter = (e) => {
		e.preventDefault();
		// setActiveLoopButton(true);
		let newStartDate = getFormattedDateTwo(dateRange[0]);
		let newEndDate = getFormattedDateTwo(dateRange[1]);
		setParams(`from=${newStartDate}&to=${newEndDate}&page=${page}`);
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
				width='100%'
				height='100%'
				display='flex'
				flexDirection='column'
				bgcolor='#fff'
				padding={1}>
				<Box height='100%' width='100%' display='flex' flexDirection='column'>
					<Filters
						selectChildren={
							listingsLoading ? (
								<CircularProgress size={16} />
							) : (
								listings &&
								listings.data.listings.billers.map((res) => (
									<MenuItem key={res.id} value={res.code}>
										{res.name}
									</MenuItem>
								))
							)
						}
						selectValue={selectValue}
						selectOnChange={(e) => setSelectValue(e.target.value)}
						onFilter={onFilter}
						pickerStartDate={startDate}
						pickerEndDate={endDate}
						pickerOnchange={(update) => {
							setDateRange(update);
						}}
						searchValue={searchData}
						searchOnChange={(e) => setSearchData(e.target.value)}
						searchOnClick={searchOnClick}
					/>
					<Divider orientation='horizontal' sx={{ marginBottom: 2 }} />
					<Box width='100%' height='100%' overflow='hidden'>
						<TransactionTable>
							{transactionsLoading ? (
								<TableRow sx={{ width: '100%', position: 'relative' }}>
									<TableCell>
										<Skeleton variant='rectangular' width='100%' height='100%' />
									</TableCell>
									<TableCell>
										<Skeleton variant='rectangular' width='100%' height='100%' />
									</TableCell>
									<TableCell>
										<Skeleton variant='rectangular' width='100%' height='100%' />
									</TableCell>
									<TableCell>
										<Skeleton variant='rectangular' width='100%' height='100%' />
									</TableCell>
									<TableCell>
										<Skeleton variant='rectangular' width='100%' height='100%' />
									</TableCell>
									<TableCell>
										<Skeleton variant='rectangular' width='100%' height='100%' />
									</TableCell>
								</TableRow>
							) : (
								transactions &&
								transactions.data.listings.collections.map((row) => (
									<StyledTableRow
										key={row.refno}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<StyledTableCell align='center' sx={{ fontSize: '14px' }}>
											{getFormattedDateTwo(row.created_at)}
										</StyledTableCell>
										<StyledTableCell align='center' sx={{ fontSize: '14px' }}>
											{row.refno}
										</StyledTableCell>
										<StyledTableCell align='center' sx={{ fontSize: '14px' }}>
											{row.dynamic_columns[0].value}
										</StyledTableCell>
										<StyledTableCell align='center' sx={{ fontSize: '14px' }}>
											{row.dynamic_columns[1].value}
										</StyledTableCell>
										<StyledTableCell align='center' sx={{ fontSize: '14px' }}>
											{row.dynamic_columns[2].value}
										</StyledTableCell>
										<StyledTableCell align='center' sx={{ fontSize: '14px' }}>
											{row.dynamic_columns[3].value}
										</StyledTableCell>
									</StyledTableRow>
								))
							)}
						</TransactionTable>
						<TablePagination
							total_page={
								transactions && transactions.data.listings.meta.pagination.total_pages
							}
							handleChange={onPagination}
						/>
					</Box>
				</Box>
			</Box>
		</WebLayout>
	);
}
