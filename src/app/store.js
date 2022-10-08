import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import { billerApi } from '../features/biller/billerApi';
import dataSlice from '../features/data/dataSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		data: dataSlice,
		[billerApi.reducerPath]: billerApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(billerApi.middleware),
});
