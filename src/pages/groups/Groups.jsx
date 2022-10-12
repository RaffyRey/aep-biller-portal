import { Box, Typography } from '@mui/material';
import React from 'react';
import { WebLayout } from '../../components';
import BillerGroup from './components/BillerGroup';

import Summary from './components/Summary';
import { GroupContainer } from './style/style';

export default function Groups() {
	return (
		<WebLayout>
			<Box width='100%' height='100%' bgcolor='#fff'>
				<GroupContainer>
					<Typography
						variant='subtitle1'
						align='left'
						fontSize='1.5rem'
						fontWeight='700'
						marginBottom={3}
						borderBottom='1px solid #e6e6e6'
						width='100%'
						color='#333'>
						Biller Group
					</Typography>
					<Box width='100%' display='flex' alignItems='center' flexDirection='row'>
						<Summary />
						<BillerGroup />
					</Box>
				</GroupContainer>
			</Box>
		</WebLayout>
	);
}
