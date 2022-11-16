import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSummary } from '../../../features/summary/summarySlice';
import { formatPesos } from '../../../utilities/formatCurrency';

// summary total
const Summary = () => {
	const dispatch = useDispatch();
	const { summary, isLoading, isError, message } = useSelector(
		(state) => state.summary,
	);

	useEffect(() => {
		if (isError) {
			alert(message);
		}
		dispatch(getSummary());
	}, [dispatch, message, isError]);

	return (
		<Box
			width={350}
			height='100%'
			display='flex'
			alignItems='center'
			flexDirection='column'>
			<BillerGroupCard
				cardLabel='Group Total Transaction Count'
				cardData={
					isLoading ? (
						<CircularProgress color='warning' size={15} />
					) : (
						<>{summary && summary.data.total[0].count}</>
					)
				}
			/>
			<BillerGroupCard
				cardLabel='Group Total Collection'
				cardData={
					isLoading ? (
						<CircularProgress color='warning' size={15} />
					) : (
						formatPesos(summary && summary.data.total[0].revenue)
					)
				}
			/>
		</Box>
	);
};

function BillerGroupCard({ cardLabel, cardData }) {
	return (
		<Box
			display='flex'
			width='100%'
			height={100}
			borderRadius={3}
			flexDirection='column'
			justifyContent='center'
			bgcolor='#0e3553'
			marginY={1}
			padding={4}>
			<Typography
				variant='subtitle1'
				color='#f47b20'
				fontSize={10}
				textAlign='left'
				fontWeight='600'>
				{cardLabel}
			</Typography>
			<Typography
				variant='subtitle1'
				color='#fff'
				fontSize={18}
				fontWeight='700'
				textAlign='left'>
				{cardData}
			</Typography>
		</Box>
	);
}

export default Summary;
