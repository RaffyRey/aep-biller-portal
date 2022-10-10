import {
	Avatar,
	Box,
	Card,
	CardContent,
	Divider,
	Typography,
} from '@mui/material';
import React from 'react';

function DataCard({ billerLogo, billerName, billerEmail, cardOnClick }) {
	return (
		<Card
			sx={{
				width: '100%',
				height: '100%',
				cursor: 'pointer',
				':hover': {
					bgcolor: '#e9ecef',
					color: '#fff',
				},
			}}
			onClick={cardOnClick}>
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'row',
					height: '100%',
					alignItems: 'center',
				}}>
				<Avatar
					src={billerLogo}
					sx={{
						width: 64,
						height: 64,
						backgroundPosition: 'center',
						boxShadow: '0 0 4px rgba(0,0,0,.4)',
					}}
					alt="Biller's Avatar"
				/>
				<Divider orientation='vertical' flexItem sx={{ marginX: 2 }} />
				<Box display='flex' flexDirection='column'>
					<Typography variant='subtitle1' color='#333' fontWeight={700}>
						{billerName}
					</Typography>
					<Typography variant='subtitle2' color='#333'>
						{billerEmail}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}

export default DataCard;
