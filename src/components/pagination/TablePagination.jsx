import { Box, Pagination } from '@mui/material';
import React from 'react';

const TablePagination = ({ total_page, handleChange }) => {
	return (
		<Box
			width='100%'
			height={40}
			display='flex'
			alignItems='center'
			justifyContent='center'>
			<Pagination
				count={total_page}
				showFirstButton
				showLastButton
				size='small'
				onChange={handleChange}
			/>
		</Box>
	);
};

export default TablePagination;
