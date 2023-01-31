import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getBillerGroupAdmin } from '../../../features/biller_group/billerSlice';

// biller data
const BillerGroup = () => {
	const dispatch = useDispatch();
	const { biller, isLoading, isError, message } = useSelector(
		(state) => state.biller,
	);

	useEffect(() => {
		if (isError) toast.error(message);
		dispatch(getBillerGroupAdmin());
	}, [dispatch, message, isError]);

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
						isLoading ? (
							<CircularProgress color='primary' size={15} />
						) : (
							biller && biller.data.group.name
						)
					}
				/>
				<DataCard
					dataLabel='Biller count'
					cardData={
						isLoading ? (
							<CircularProgress color='primary' size={15} />
						) : (
							biller && biller.data.group.biller_count
						)
					}
				/>
				<DataCard
					dataLabel='Group Admin email'
					cardData={
						isLoading ? (
							<CircularProgress color='primary' size={15} />
						) : (
							biller && biller.data.group.contact_email
						)
					}
				/>
			</Box>
			<Box display='flex' flexDirection='column' marginX={2}>
				<DataCard
					dataLabel='Group Admin Mobile'
					cardData={
						isLoading ? (
							<CircularProgress color='primary' size={15} />
						) : (
							biller && biller.data.group.contact_number
						)
					}
				/>
				<DataCard
					dataLabel='Group Admin'
					cardData={
						isLoading ? (
							<CircularProgress color='primary' size={15} />
						) : (
							biller &&
							biller.data.group.contact_first_name +
								' ' +
								biller.data.group.contact_last_name
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
			<Typography variant='h6' color='#333' fontSize={12}>
				{dataLabel}:{' '}
			</Typography>
			<Typography variant='subtitle1' color='#5f5f5f'>
				{cardData}
			</Typography>
		</Box>
	);
};

export default BillerGroup;
