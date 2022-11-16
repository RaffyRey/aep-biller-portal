import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import summaryService from './summaryService';

const initialState = {
	isSuccess: false,
	isLoading: false,
	isError: false,
	message: '',
};

// get summary endpoint
export const getSummary = createAsyncThunk(
	'/biller_admin/summary',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			// console.log(token);
			return await summaryService.summary(token);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

// get summaries endpoint
export const getSummaries = createAsyncThunk(
	'/biller_admin/summaries',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			// console.log(token);
			return await summaryService.summaries(token, _);
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
export const summarySlice = createSlice({
	name: 'summary',
	initialState,
	reducers: {
		reset: (state) => state.initialState,
	},
	extraReducers: (builder) => {
		builder
			// summary
			.addCase(getSummary.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSummary.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.summary = action.payload;
			})
			.addCase(getSummary.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// summaries
			.addCase(getSummaries.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSummaries.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.summaries = action.payload;
			})
			.addCase(getSummaries.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = summarySlice.actions;
export default summarySlice.reducer;
