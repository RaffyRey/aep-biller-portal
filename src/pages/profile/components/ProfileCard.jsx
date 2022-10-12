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
					<Typography variant='subtitle1' color='#333' display='flex'>
						Company name: {profileCompany}
					</Typography>
					<Typography variant='subtitle1' color='#333' display='flex'>
						Biller Category: {profileCategory}
					</Typography>
					<Typography variant='subtitle1' color='#333' display='flex'>
						Status: {profileStatus}
					</Typography>
					<Typography variant='subtitle1' color='#333' display='flex'>
						Biller fee: {profileFee}
					</Typography>
					<Typography variant='subtitle1' color='#333' display='flex'>
						Convenience fee: {profileConvenience}
					</Typography>
					<Typography variant='subtitle1' color='#333' display='flex'>
						Contact Person: {profileContact}
					</Typography>
					<Typography variant='subtitle1' color='#333' display='flex'>
						Contact Number: {profileNumber}
					</Typography>
					<Typography variant='subtitle1' color='#333' display='flex'>
						Contact Person Email Address: {profileEmail}
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
};

export default ProfileCard;
