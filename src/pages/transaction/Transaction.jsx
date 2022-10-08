import { Box, Divider, Skeleton, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { WebLayout } from '../../components';
import { useBillerQuery } from '../../features/biller/billerApi';
import { getFormattedDateTwo } from '../../utilities/formatDate';
import Filters from './components/Filters';
import { StyledTableCell, StyledTableRow } from './components/style';
import TransactionTable from './components/TransactionTable';

export default function Transaction() {
	const [page, setPage] = useState(1);
	const [params, setParams] = useState(`transaction/v2?page=1`);

	const { data, isFetching } = useBillerQuery(params);

	let transaction = data && data.data.listings.collections;

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
					<Filters />
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
										key={row.ae_refno}
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
					</Box>
				</Box>
			</Box>
		</WebLayout>
	);
}
