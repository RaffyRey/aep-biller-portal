import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import { billerApi } from '../features/biller/billerApi';
import dataSlice from '../features/data/dataSlice';
import monitoringSlice from '../features/monitoring/monitoringSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		data: dataSlice,
		monitoring: monitoringSlice,
		[billerApi.reducerPath]: billerApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(billerApi.middleware),
});
