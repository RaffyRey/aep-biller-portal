import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';

const ProfileCard = ({
	profileName,
	profileTransactionCount,
	profileTransactionDate,
	profileTransactionAmount,
	profileTransactionFee,
	profileSettlementAmount,
	profileTotalTransactionFee,
}) => {
	return (
		<Box width='100%' height='fit-content'>
			<Card
				sx={{ width: '100%', height: 'fit-content', display: 'flex', padding: 2 }}
				variant='outlined'>
				<CardContent
					sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
					<Typography
						variant='h6'
						color='#333'
						display='flex'
						flexDirection='row'
						alignItems='center'>
						Biller Name: {profileName}
					</Typography>
					<Divider orientation='horizontal' flexItem sx={{ marginY: 1 }} />
					<Box width='100%' display='flex' flexDirection='row'>
						<Box display='flex' flexDirection='column' marginRight={2}>
							<Typography
								variant='subtitle1'
								color='#333'
								display='flex'
								alignItems='center'
								flexDirection='row'>
								Transaction Date: {profileTransactionDate}
							</Typography>
							<Typography
								variant='subtitle1'
								color='#333'
								display='flex'
								alignItems='center'
								flexDirection='row'>
								Transaction Count: {profileTransactionCount}
							</Typography>
							<Typography
								variant='subtitle1'
								color='#333'
								display='flex'
								alignItems='center'
								flexDirection='row'>
								Transaction Fee: {profileTransactionFee}
							</Typography>
						</Box>
						<Box display='flex' flexDirection='column' marginLeft={2}>
							<Typography
								variant='subtitle1'
								color='#333'
								display='flex'
								alignItems='center'
								flexDirection='row'>
								Total Transaction Amount: {profileTransactionAmount}
							</Typography>
							<Typography
								variant='subtitle1'
								color='#333'
								display='flex'
								alignItems='center'
								flexDirection='row'>
								Total Transaction Fee: {profileTotalTransactionFee}
							</Typography>
							<Typography
								variant='subtitle1'
								color='#333'
								display='flex'
								alignItems='center'
								flexDirection='row'>
								Total Settlement Amount: {profileSettlementAmount}
							</Typography>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default ProfileCard;
