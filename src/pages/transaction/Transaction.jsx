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
import React, { useState } from 'react';
import { WebLayout } from '../../components';
import {
	useBillerQuery,
	useListingParamsQuery,
} from '../../features/biller/billerApi';
import { StyledTableCell, StyledTableRow } from '../../style/style';
import { getFormattedDateTwo } from '../../utilities/formatDate';
import Filters from './components/Filters';
import TransactionTable from './components/TransactionTable';

export default function Transaction() {
	const [page, setPage] = useState(1);
	const [params, setParams] = useState(`transaction/v2?page=${page}`);
	const [selectValue, setSelectValue] = useState('');
	const [dateRange, setDateRange] = useState([]);
	const [startDate, endDate] = dateRange;
	const [searchData, setSearchData] = useState('');

	const { data, isFetching } = useBillerQuery(params);
	const { data: listings, isFetching: listingFeching } = useListingParamsQuery();

	let transaction = data && data.data.listings.collections;
	let total_page = data && data.data.listings.meta.pagination.total_pages;

	const handleChange = (event, value) => {
		setPage(value);
		setParams(`transaction/v2?page=${value}`);
	};

	// biller filter
	const onFilter = (e) => {
		e.preventDefault();
		// setActiveLoopButton(true);
		let newStartDate = getFormattedDateTwo(dateRange[0]);
		let newEndDate = getFormattedDateTwo(dateRange[1]);
		setParams(
			`transaction/v2?from=${newStartDate}&to=${newEndDate}&page=${page}`,
		);
	};

	// search
	const searchOnClick = (e) => {
		e.preventDefault();

		if (!searchData) {
			setParams(`transaction/v2?page=${page}`);
		} else {
			setParams(`transaction/v2?page=1&keyword=${searchData}`);
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
							listingFeching ? (
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
							{isFetching ? (
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
								transaction.map((row) => (
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
						<Box
							width='100%'
							height={40}
							display='flex'
							alignItems='center'
							justifyContent='center'>
							<Pagination
								// page={page}
								count={total_page}
								showFirstButton
								showLastButton
								onChange={handleChange}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</WebLayout>
	);
}
