import { Box, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AllEasyLogo, Footer } from '../../components';
import * as PATH from '../../constant/path';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		alert(email);
	};

	return (
		<Box width='100%' height='100%'>
			<Container sx={{ height: '100%' }}>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					sx={{ height: '100%' }}>
					<div className='form'>
						<AllEasyLogo />
						<Typography
							variant='subtitle1'
							gutterBottom
							color='#545252'
							marginTop={3}
							fontWeight>
							Forgot Password
						</Typography>

						{/* login input form */}
						<div className='form-group'>
							<TextField
								id='outlined-input'
								label='Email'
								type='Email'
								autoComplete='email'
								size='normal'
								color='warning'
								fullWidth
								margin='normal'
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								name='email'
							/>
							<button className='form-button' onClick={onSubmit}>
								Submit
							</button>
							<Link to={PATH.LOGIN} className='forgot-password-link'>
								Already have an account? Login Now!
							</Link>
						</div>
						<Footer />
					</div>
				</Box>
			</Container>
		</Box>
	);
};

export default ForgotPassword;
