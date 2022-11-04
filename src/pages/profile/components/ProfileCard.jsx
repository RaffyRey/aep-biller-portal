import {
	Box,
	Card,
	CardContent,
	Divider,
	Paper,
	Typography,
} from '@mui/material';
import React from 'react';

const ProfileCard = ({
	profileImg,
	profileName,
	profileCategory,
	profileCompany,
	profileContact,
	profileConvenience,
	profileEmail,
	profileFee,
	profileStatus,
	profileNumber,
}) => {
	return (
		<Box width='calc(100% - 350px)' height='100%' paddingX={4}>
			<Card
				sx={{ width: '100%', height: 'fit-content', display: 'flex', padding: 2 }}
				variant='outlined'>
				<Paper elevation={1} sx={{ width: '200px', height: 100 }}>
					<img
						src={profileImg}
						alt='Biller Profile'
						style={{ width: '100%', height: '100%' }}
					/>
				</Paper>
				<Divider orientation='vertical' flexItem sx={{ marginX: 2 }} />
				<CardContent
					sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
					<Typography variant='h6' color='#333' display='flex'>
						{profileName}
					</Typography>
					<Divider orientation='horizontal' flexItem sx={{ marginY: 1 }} />
					<ProfileCardTypography
						profileLabel='Company name:'
						profileData={profileCompany}
					/>
					<ProfileCardTypography
						profileLabel='Biller Category:'
						profileData={profileCategory}
					/>

					<ProfileCardTypography
						profileLabel='Status:'
						profileData={profileStatus}
					/>
					<ProfileCardTypography
						profileLabel='Biller fee:'
						profileData={profileFee}
					/>
					<ProfileCardTypography
						profileLabel='Convenience fee:'
						profileData={profileConvenience}
					/>
					<ProfileCardTypography
						profileLabel='Contact Person:'
						profileData={profileContact}
					/>
					<ProfileCardTypography
						profileLabel='Contact Number:'
						profileData={profileNumber}
					/>

					<ProfileCardTypography
						profileLabel='Contact Person Email Address:'
						profileData={profileEmail}
					/>
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
