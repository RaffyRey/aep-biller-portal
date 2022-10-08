import React from 'react';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';

function WebLayout({ children }) {
	return (
		<div className='container'>
			<div className='header'>
				<Header />
			</div>
			<div className='aside'>
				<Navbar />
			</div>
			<div className='content'>{children}</div>
		</div>
	);
}

export default WebLayout;
