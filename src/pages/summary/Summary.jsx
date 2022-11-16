import {
	Box,
	CircularProgress,
	Divider,
	MenuItem,
	Pagination,
	Skeleton,
	TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TablePagination, WebLayout } from '../../components';
import {
	useBillerQuery,
	useListingParamsQuery,
} from '../../features/biller/billerApi';
import { StyledTableRow } from '../../style/style';
import { formatPesos } from '../../utilities/formatCurrency';
import { numberWithCommas } from '../../utilities/formatNumberWithComma';
import DataRow from './components/DataRow';
import Filters from './components/Filter';
import Loading from './components/Loading';
import ProfileCard from './components/ProfileCard';
import SummaryTable from './components/SummaryTable';

// new import
import { useDispatch, useSelector } from 'react-redux';
import { getListings } from '../../features/biller_group/billerSlice';
import { getSummaries } from '../../features/summary/summarySlice';

export default function Summary() {
	const dispatch = useDispatch();
	const { listings, isLoading: listingsLoading } = useSelector(
		(state) => state.biller,
	);
	const { summaries, isLoading: summariesLoading } = useSelector(
		(state) => state.summary,
	);

	const [page, setPage] = useState(1);
	const [summariesParams, setSummariesParams] = useState(`page=${page}`);
	const [selectValue, setSelectValue] = useState('');

	// biller filter
	const onFilter = (e) => {
		e.preventDefault();
		setSummariesParams(`biller=${selectValue}`);
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
				width='100%'
				height='100%'
				display='flex'
				flexDirection='column'
				overflow='auto'
				bgcolor='#fff'
				paddingY={1}
				paddingX={2}>
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
				<Divider orientation='horizontal' sx={{ marginBottom: 2 }} flexItem />
				<Box width='100%' height='fit-content'>
					<ProfileCard
						profileName={
							summariesLoading ? (
								<Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
							) : (
								summaries?.data.billers.name
							)
						}
						profileTransactionDate={
							summariesLoading ? (
								<Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
							) : (
								summaries?.data.total[0].date
							)
						}
						profileTransactionCount={
							summariesLoading ? (
								<Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
							) : (
								summaries?.data.total[0].count
							)
						}
						profileTransactionAmount={
							summariesLoading ? (
								<Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
							) : (
								formatPesos(summaries?.data.total[0].revenue)
							)
						}
					/>
					<Divider orientation='horizontal' sx={{ marginY: 2 }} flexItem />
					<SummaryTable>
						{summariesLoading ? (
							<TableRow sx={{ width: '100%', position: 'relative' }}>
								<Loading />
							</TableRow>
						) : (
							summaries?.data.listings.data.map((row, index) => (
								<StyledTableRow
									key={index}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<DataRow
										dataOne={row.transaction.created_at}
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
