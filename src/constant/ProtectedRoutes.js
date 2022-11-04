import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import * as PATH from '../constant/path';

export const ProtectedRoutes = () => {
	let navigate = useNavigate();
	const { data } = useSelector((state) => state.auth);

	useEffect(() => {
		if (data === undefined) {
			navigate(PATH.LOGIN);
		}
	}, [data, navigate]);

	return data ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
