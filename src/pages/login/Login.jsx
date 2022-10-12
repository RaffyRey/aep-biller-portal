import { Box, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AllEasyLogo, Footer } from '../../components';
import * as PATH from '../../constant/path';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { data, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth,
	);

	// login form state
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	// onchange
	const isOnChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		if (isSuccess || data) {
			navigate(PATH.DASHBOARD);
		}

		dispatch(reset);
	}, [isError, isSuccess, data, dispatch, message, navigate]);

	// signin submit button
	const onSignIn = (e) => {
		e.preventDefault();
		const userData = {
			email,
			password,
		};

		dispatch(login(userData));
	};

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<div className='form-container'>
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
							Sign in to Biller Portal
						</Typography>

						{/* login input form */}
						<div className='form-group'>
							<TextField
								// id='outlined-input'
								id='outlined-error'
								label='Email'
								type='Email'
								autoComplete='email'
								size='normal'
								color='warning'
								fullWidth
								margin='normal'
								onChange={isOnChange}
								value={email}
								name='email'
							/>

							<TextField
								id='outlined-password-input'
								label='Password'
								type='password'
								autoComplete='current-password'
								size='normal'
								color='warning'
								fullWidth
								margin='normal'
								onChange={isOnChange}
								value={password}
								name='password'
							/>
							<button className='form-button' onClick={onSignIn}>
								Sign In
							</button>
							<Link to={PATH.FORGOT_PASSWORD} className='forgot-password-link'>
								Forgot password?
							</Link>
						</div>
						<Footer />
					</div>
				</Box>
			</Container>
		</div>
	);
}

export default Login;
