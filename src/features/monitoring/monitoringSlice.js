import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import monitoringService from './monitoringService';

const initialState = {
	isSuccess: false,
	isLoading: false,
	isError: false,
	message: '',
};

// get trasnsaction endpoint
export const getMonitoringEndpoint = createAsyncThunk(
	'/biller_admin/monitoring',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			// console.log(token);
			return await monitoringService.getMonitoringData(token, _);
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
export const monitoringSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		reset: (state) => state.initialState,
	},
	extraReducers: (builder) => {
		builder
			// monitoring
			.addCase(getMonitoringEndpoint.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMonitoringEndpoint.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.monitor = action.payload;
			})
			.addCase(getMonitoringEndpoint.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = monitoringSlice.actions;
export default monitoringSlice.reducer;
