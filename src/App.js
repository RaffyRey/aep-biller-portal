import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as PATH from './constant/path';
import { ProtectedRoutes } from './constant/ProtectedRoutes';
import Dashboard from './pages/dashboard/Dashboard';
import ForgotPassword from './pages/forgot_password/ForgotPassword';
import Groups from './pages/groups/Groups';
import Login from './pages/login/Login';
import Monitoring from './pages/monitoring/Monitoring';
import Profile from './pages/profile/Profile';
import Settlement from './pages/settlement/Settlement';
import Summary from './pages/summary/Summary';
import Transaction from './pages/transaction/Transaction';

function App() {
	const navigate = useNavigate();
	const { data } = useSelector((state) => state.auth);

	// useEffect(() => {
	// 	if (data.status !== 200) {
	// 		navigate(PATH.LOGIN);
	// 	}
	// 	console.log(data.status);
	// }, [data]);

	return (
		<div className='page-container'>
			<Routes>
				<Route path={PATH.LOGIN} element={<Login />} />
				<Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
				<Route element={<ProtectedRoutes />}>
					<Route index path={PATH.DASHBOARD} element={<Dashboard />} />
					<Route path={PATH.MONITORING} element={<Monitoring />} />
					<Route path={PATH.BRANCH_GROUP} element={<Groups />} />
					<Route path={PATH.BRANCH_TRANSACTION} element={<Transaction />} />
					<Route path={PATH.BRANCH_PROFILE} element={<Profile />} />
					<Route path={PATH.BRANCH_SUMMARY} element={<Summary />} />
					<Route path={PATH.BRANCH_SETTLEMENT} element={<Settlement />} />
				</Route>
			</Routes>
			<ToastContainer />
		</div>
	);
}
export default App;
