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
							<ProfileCardTypography
								profileLabel='Transaction Date:'
								profileData={profileTransactionDate}
							/>
							<ProfileCardTypography
								profileLabel='Transaction Count:'
								profileData={profileTransactionCount}
							/>

							<ProfileCardTypography
								profileLabel='Transaction Fee:'
								profileData={profileTransactionFee}
							/>
						</Box>
						<Box display='flex' flexDirection='column' marginLeft={2}>
							<ProfileCardTypography
								profileLabel='Total Transaction Amount:'
								profileData={profileTransactionAmount}
							/>

							<ProfileCardTypography
								profileLabel='Total Transaction Fee:'
								profileData={profileTotalTransactionFee}
							/>
							<ProfileCardTypography
								profileLabel='Total Settlement Amount:'
								profileData={profileSettlementAmount}
							/>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

const ProfileCardTypography = ({ profileData, profileLabel }) => {
	return (
		<Typography
			variant='subtitle1'
			color='#333'
			display='flex'
			alignItems='center'>
			<p style={{ color: '#adb5bd', marginRight: 6 }}>{profileLabel}</p>{' '}
			{profileData}
		</Typography>
	);
};

export default ProfileCard;
