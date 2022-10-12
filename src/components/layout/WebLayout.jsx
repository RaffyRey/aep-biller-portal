import { Box } from '@mui/material';
import React from 'react';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';

function WebLayout({ children }) {
	return (
		<Box display='flex' alignItems='center' width='100%' height='100%'>
			<div className='container'>
				<div className='header'>
					<Header />
				</div>
				<div className='aside'>
					<Navbar />
				</div>
				<div className='content'>{children}</div>
			</div>
		</Box>
	);
}

export default WebLayout;
