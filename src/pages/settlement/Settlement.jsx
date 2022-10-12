import {
	Box,
	CircularProgress,
	Divider,
	MenuItem,
	Pagination,
	Skeleton,
	TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import { WebLayout } from '../../components';
import {
	useBillerQuery,
	useListingParamsQuery,
} from '../../features/biller/billerApi';
import { StyledTableRow } from '../../style/style';
import { formatPesos } from '../../utilities/formatCurrency';
import { getFormattedDateTwo } from '../../utilities/formatDate';
import { numberWithCommas } from '../../utilities/formatNumberWithComma';
import DataRow from './components/DataRow';
import Filters from './components/Filter';
import Loading from './components/Loading';
import ProfileCard from './components/ProfileCard';
import SettlementTable from './components/SettlementTable';

export default function Settlement() {
	const [page, setPage] = useState(1);
	const [billerParams, setBillerParams] = useState(`settlement?page=${page}`);
	const [selectValue, setSelectValue] = useState('');

	const { data: billerData, isFetching } = useBillerQuery(billerParams);

	// listings params
	const { data: listingsData, isFetching: listingsFetching } =
		useListingParamsQuery();

	let total_page =
		billerData && billerData.data.listings.meta.pagination.total_pages;

	let transaction_fee =
		billerData &&
		billerData.data.total[0].totalBillerFee / billerData.data.total[0].count;

	// biller filter
	const onFilter = (e) => {
		e.preventDefault();
		setBillerParams(`settlement?biller=${selectValue}`);
	};

	// pagination
	const handleChange = (event, value) => {
		setPage(value);
		setBillerParams(`settlement?page=${value}`);
	};

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
						listingsFetching ? (
							<CircularProgress size={16} />
						) : (
							listingsData &&
							listingsData.data.listings.billers.map((res) => (
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
							isFetching ? (
								<Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
							) : (
								billerData && billerData.data.billers.name
							)
						}
						profileTransactionDate={
							isFetching ? (
								<Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
							) : (
								billerData && billerData.data.total[0].date
							)
						}
						profileTransactionCount={
							isFetching ? (
								<Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
							) : (
								numberWithCommas(billerData && billerData.data.total[0].count)
							)
						}
						profileTransactionAmount={
							isFetching ? (
								<Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
							) : (
								formatPesos(billerData && billerData.data.total[0].revenue)
							)
						}
						profileTransactionFee={
							isFetching ? (
								<Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
							) : (
								formatPesos(transaction_fee)
							)
						}
						profileTotalTransactionFee={
							isFetching ? (
								<Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
							) : (
								formatPesos(billerData && billerData.data.total[0].totalBillerFee)
							)
						}
						profileSettlementAmount={
							isFetching ? (
								<Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
							) : (
								formatPesos(billerData && billerData.data.total[0].totalSettlement)
							)
						}
					/>
					<Divider orientation='horizontal' sx={{ marginY: 2 }} flexItem />
					{/* table */}
					<SettlementTable>
						{isFetching ? (
							<TableRow sx={{ width: '100%', position: 'relative' }}>
								<Loading />
							</TableRow>
						) : (
							billerData &&
							billerData.data.listings.data.map((row) => (
								<StyledTableRow
									key={row.ae_refno}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
		</WebLayout>
	);
}
