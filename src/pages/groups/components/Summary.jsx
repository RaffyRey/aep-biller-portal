import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useBillerQuery } from '../../../features/biller/billerApi';
import { formatPesos } from '../../../utilities/formatCurrency';
import { numberWithCommas } from '../../../utilities/formatNumberWithComma';

// summary total
const Summary = () => {
	let params = 'summary';
	const { data, isFetching } = useBillerQuery(params);

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
					isFetching ? (
						<CircularProgress color='warning' size={15} />
					) : (
						numberWithCommas(data && data.data.total[0].count)
					)
				}
			/>
			<BillerGroupCard
				cardLabel='Group Total Collection'
				cardData={
					isFetching ? (
						<CircularProgress color='warning' size={15} />
					) : (
						formatPesos(data && data.data.total[0].revenue)
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
			// alignItems='center'
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
