import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
		</div>
	);
}
export default App;
