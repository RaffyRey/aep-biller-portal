import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import * as PATH from '../constant/path';
import { reset } from '../features/auth/authSlice';

export const ProtectedRoutes = () => {
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const location = useLocation();
	const { data } = useSelector((state) => state.auth);
	let jwt_token = data && data.token;
	var decoded = jwtDecode(jwt_token);

	let exp = new Date(decoded.exp * 1000);

	useEffect(() => {
		// console.log(JSON.stringify(data));
		// console.log(exp);
	}, []);

	return data ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
