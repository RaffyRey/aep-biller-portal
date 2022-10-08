import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useAdminQuery } from '../../../features/biller/billerApi';

// biller data
const BillerGroup = () => {
	const { data, isFetching } = useAdminQuery();

	return (
		<Box
			height='100%'
			width='100%'
			paddingLeft={6}
			paddingTop={2}
			display='flex'
			flexDirection='row'>
			<Box display='flex' flexDirection='column' marginRight={6}>
				<DataCard
					dataLabel='Group name'
					cardData={
						isFetching ? (
							<CircularProgress color='primary' size={15} />
						) : (
							data && data.data.group.name
						)
					}
				/>
				<DataCard
					dataLabel='Biller count'
					cardData={
						isFetching ? (
							<CircularProgress color='primary' size={15} />
						) : (
							data && data.data.group.biller_count
						)
					}
				/>
				<DataCard
					dataLabel='Group Admin email'
					cardData={
						isFetching ? (
							<CircularProgress color='primary' size={15} />
						) : (
							data && data.data.group.contact_email
						)
					}
				/>
			</Box>
			<Box display='flex' flexDirection='column' marginX={2}>
				<DataCard
					dataLabel='Group Admin Mobile'
					cardData={
						isFetching ? (
							<CircularProgress color='primary' size={15} />
						) : (
							data && data.data.group.contact_number
						)
					}
				/>
				<DataCard
					dataLabel='Group Admin'
					cardData={
						isFetching ? (
							<CircularProgress color='primary' size={15} />
						) : (
							data &&
							data.data.group.contact_first_name +
								' ' +
								data.data.group.contact_last_name
						)
					}
				/>
			</Box>
		</Box>
	);
};

const DataCard = ({ dataLabel, cardData }) => {
	return (
		<Box display='flex' flexDirection='column' alignItems='flex-start'>
			<Typography variant='h6' color='#333'>
				{dataLabel}:{' '}
			</Typography>
			<Typography variant='subtitle1' color='#5f5f5f'>
				{cardData}
			</Typography>
		</Box>
	);
};

export default BillerGroup;
