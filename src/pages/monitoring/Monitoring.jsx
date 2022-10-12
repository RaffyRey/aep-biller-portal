import {
	Box,
	Pagination,
	Paper,
	Skeleton,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { useState } from 'react';
import { WebLayout } from '../../components';
import { useBillerQuery } from '../../features/biller/billerApi';
import { StyledTableCell, StyledTableRow } from '../../style/style';
import { formatPesos } from '../../utilities/formatCurrency';
import { getFormattedDate } from '../../utilities/formatDate';

function Monitoring() {
	const [page, setPage] = useState(1);
	const [params, setParams] = useState(
		`transaction/v2?page=${page}&group_by=day`,
	);

	const { data, isFetching } = useBillerQuery(params);

	let transaction = data && data.data.listings.collections;

	let total_page = data && data.data.listings.meta.pagination.total_pages;

	const handleChange = (event, value) => {
		setPage(value);
		setParams(`transaction/v2?page=${value}&group_by=day`);
	};

	return (
		<WebLayout>
			<Box
				width='100%'
				height='100%'
				display='flex'
				bgcolor='#fff'
				flexDirection='column'>
				<Typography variant='h5' textAlign='center' color='#333' marginTop={1}>
					Daily Transaction Monitoring
				</Typography>
				<Box width='100%' height='600px' bgcolor='#fff' padding={2}>
					<Box
						sx={{ width: '100%', overflow: 'hidden', height: 'calc(100% - 40px)' }}>
						<TableContainer
							sx={{ height: '100%', width: '100%', position: 'relative' }}
							component={Paper}>
							<Table
								sx={{ height: '100%', width: '100%', position: 'relative' }}
								stickyHeader
								aria-label='sticky table'>
								<TableHead sx={{ width: '100%' }}>
									<TableRow>
										<StyledTableCell align='center'>Date</StyledTableCell>
										<StyledTableCell align='center'>Biller Reference No.</StyledTableCell>
										<StyledTableCell align='center'>Amount</StyledTableCell>
										<StyledTableCell align='center'>Name</StyledTableCell>
									</TableRow>
								</TableHead>

								<TableBody sx={{ position: 'relative' }}>
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
										</TableRow>
									) : (
										transaction.map((row) => (
											<StyledTableRow
												key={row.transaction.transaction_id}
												sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell align='center' sx={{ fontSize: '14px' }}>
													{getFormattedDate(row.created_at)}
												</TableCell>
												<TableCell align='center' sx={{ fontSize: '14px' }}>
													{row.ae_refno}
												</TableCell>
												<TableCell align='center' sx={{ fontSize: '14px' }}>
													{formatPesos(row.debit)}
												</TableCell>
												<TableCell
													align='center'
													sx={{ fontSize: '14px', textTransform: 'capitalize' }}>
													{row.sender_name}
												</TableCell>
											</StyledTableRow>
										))
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
					<Box
						width='100%'
						height={window.matchMedia('(max-width:500px)') ? 'fit-content' : 40}
						marginTop={2}
						display='flex'
						alignItems='center'
						justifyContent='center'>
						<Pagination
							// page={page}
							count={total_page}
							size='small'
							showFirstButton
							showLastButton
							shape='rounded'
							onChange={handleChange}
						/>
					</Box>
				</Box>
			</Box>
		</WebLayout>
	);
}

export default Monitoring;
