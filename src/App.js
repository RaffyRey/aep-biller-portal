import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as PATH from './constant/path';
import { ProtectedRoutes } from './constant/ProtectedRoutes';
// import Dashboard from './pages/dashboard/Dashboard';
// import ForgotPassword from './pages/forgot_password/ForgotPassword';
// import Login from './pages/login/Login';
// import Groups from './pages/groups/Groups';
// import Monitoring from './pages/monitoring/Monitoring';
// import Profile from './pages/profile/Profile';
// import Settlement from './pages/settlement/Settlement';
// import Summary from './pages/summary/Summary';
// import Transaction from './pages/transaction/Transaction';

const Login = lazy(() => import('./pages/login/Login'));
const ForgotPassword = lazy(() =>
	import('./pages/forgot_password/ForgotPassword'),
);
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Monitoring = lazy(() => import('./pages/monitoring/Monitoring'));
const Groups = lazy(() => import('./pages/groups/Groups'));
const Transaction = lazy(() => import('./pages/transaction/Transaction'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const Summary = lazy(() => import('./pages/summary/Summary'));
const Settlement = lazy(() => import('./pages/settlement/Settlement'));

function App() {
	return (
		<div className='page-container'>
			<Routes>
				<Route
					path={PATH.LOGIN}
					element={
						<Suspense>
							<Login />
						</Suspense>
					}
				/>
				<Route
					path={PATH.FORGOT_PASSWORD}
					element={
						<Suspense>
							<ForgotPassword />
						</Suspense>
					}
				/>
				<Route element={<ProtectedRoutes />}>
					<Route
						index
						path={PATH.DASHBOARD}
						element={
							<Suspense>
								<Dashboard />
							</Suspense>
						}
					/>
					<Route
						path={PATH.MONITORING}
						element={
							<Suspense>
								<Monitoring />
							</Suspense>
						}
					/>
					<Route
						path={PATH.BRANCH_GROUP}
						element={
							<Suspense>
								<Groups />
							</Suspense>
						}
					/>
					<Route
						path={PATH.BRANCH_TRANSACTION}
						element={
							<Suspense>
								<Transaction />
							</Suspense>
						}
					/>
					<Route
						path={PATH.BRANCH_PROFILE}
						element={
							<Suspense>
								<Profile />
							</Suspense>
						}
					/>
					<Route
						path={PATH.BRANCH_SUMMARY}
						element={
							<Suspense>
								<Summary />
							</Suspense>
						}
					/>
					<Route
						path={PATH.BRANCH_SETTLEMENT}
						element={
							<Suspense>
								<Settlement />
							</Suspense>
						}
					/>
				</Route>
			</Routes>
			<ToastContainer />
		</div>
	);
}
export default App;
