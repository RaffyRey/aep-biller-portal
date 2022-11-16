import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import { billerApi } from '../features/biller/billerApi';
import billerSlice from '../features/biller_group/billerSlice';
import dataSlice from '../features/data/dataSlice';
import monitoringSlice from '../features/monitoring/monitoringSlice';
import summarySlice from '../features/summary/summarySlice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		data: dataSlice,
		monitoring: monitoringSlice,
		biller: billerSlice,
		summary: summarySlice,

		[billerApi.reducerPath]: billerApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(billerApi.middleware),
});
