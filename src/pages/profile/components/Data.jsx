import {
	Box,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import React from 'react';
import { TablePagination } from '../../../components';
import { StyledTableCell } from '../../../style/style';

export const Data = ({ children, onCount, handleChange }) => {
	return (
		<Box width={350} height='100%' overflow='hidden'>
			{/* card table */}
			<Box width='100%' height='90%'>
				<TableContainer
					sx={{ height: '100%', width: '100%', position: 'relative' }}
					component={Paper}>
					<Table
						sx={{ height: '100%', width: '100%', position: 'relative' }}
						stickyHeader
						aria-label='sticky table'>
						<TableHead sx={{ width: '100%' }}>
							<TableRow>
								<StyledTableCell align='center'>Biller's List</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody sx={{ position: 'relative' }}>{children}</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<TablePagination />
		</Box>
	);
};
