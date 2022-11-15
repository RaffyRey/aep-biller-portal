import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dataService from './dataService';

const initialState = {
	isSuccess: false,
	isLoading: false,
	isError: false,
	message: '',
};

// get biller data
export const getBillerData = createAsyncThunk(
	'/biller_admin',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			// console.log(token);
			return await dataService.getBiller(token);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

// get trasnsaction endpoint
export const getTransactionEndpoint = createAsyncThunk(
	'/biller_admin/data',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			// console.log(token);
			return await dataService.getTransactionData(token, _);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const getChartQuery = createAsyncThunk(
	'/biller_admin/chart',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			// console.log(token);
			return await dataService.getChartData(token, _);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

// data slice
export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		reset: (state) => state.initialState,
	},
	extraReducers: (builder) => {
		builder
			// biller profile
			.addCase(getBillerData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBillerData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.biller = action.payload;
			})
			.addCase(getBillerData.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// transaaction
			.addCase(getTransactionEndpoint.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTransactionEndpoint.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.data = action.payload;
			})
			.addCase(getTransactionEndpoint.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// chart
			.addCase(getChartQuery.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getChartQuery.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.chart = action.payload;
			})
			.addCase(getChartQuery.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = dataSlice.actions;
export default dataSlice.reducer;
