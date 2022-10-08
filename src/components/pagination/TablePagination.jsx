import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import {
	FaAngleDoubleLeft,
	FaAngleDoubleRight,
	FaAngleLeft,
	FaAngleRight,
} from 'react-icons/fa';

export default function TablePagination({
	onFirstPage,
	onPrev,
	onPage,
	onNext,
	onFinalPage,
}) {
	return (
		<Box
			width='100%'
			height={40}
			display='flex'
			alignItems='center'
			justifyContent='center'>
			<Stack direction='row' spacing={1} alignItems='center'>
				<IconButton color='primary' onClick={onFirstPage}>
					<FaAngleDoubleLeft />
				</IconButton>
				<IconButton color='primary' onClick={onPrev}>
					<FaAngleLeft />
				</IconButton>
				<Typography variant='subtitle1'>{onPage}</Typography>
				<IconButton color='primary' onClick={onNext}>
					<FaAngleRight />
				</IconButton>
				<IconButton color='primary' onClick={onFinalPage}>
					<FaAngleDoubleRight />
				</IconButton>
			</Stack>
		</Box>
	);
}
