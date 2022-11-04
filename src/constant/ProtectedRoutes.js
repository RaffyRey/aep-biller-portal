import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import * as PATH from '../constant/path';

export const ProtectedRoutes = () => {
	const { data } = useSelector((state) => state.auth);

	if (data === undefined) {
		return null;
	}

	return data ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
