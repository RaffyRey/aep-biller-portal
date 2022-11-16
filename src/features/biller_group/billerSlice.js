import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import billerService from './billerService';

const initialState = {
	isSuccess: false,
	isLoading: false,
	isError: false,
	message: '',
};

// get trasnsaction endpoint
export const getBillerGroupAdmin = createAsyncThunk(
	'/biller_admin/biller_group_admin',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			// console.log(token);
			return await billerService.billerGroupAdmin(token);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

//listings
export const getListings = createAsyncThunk(
	'/biller_admin/biller_group_admin/listings',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			// console.log(token);
			return await billerService.listings(token);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

//transactions
export const getTransactions = createAsyncThunk(
	'/biller_admin/biller_group_admin/transactions',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			// console.log(token);
			return await billerService.transactions(token, _);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

//profile
export const getBillerProfile = createAsyncThunk(
	'/biller_admin/biller_group_admin/profile',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			// console.log(token);
			return await billerService.billerProfile(token, _);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

//profile
export const getBillers = createAsyncThunk(
	'/biller_admin/biller_group_admin/billers',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			// console.log(token);
			return await billerService.billers(token, _);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

//settlement
export const getSettlement = createAsyncThunk(
	'/biller_admin/biller_group_admin/settlement',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.data.token;
			// console.log(token);
			return await billerService.settlement(token, _);
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
export const billerSlice = createSlice({
	name: 'biller',
	initialState,
	reducers: {
		reset: (state) => state.initialState,
	},
	extraReducers: (builder) => {
		builder
			// biller admin
			.addCase(getBillerGroupAdmin.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBillerGroupAdmin.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.biller = action.payload;
			})
			.addCase(getBillerGroupAdmin.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getListings.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getListings.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.listings = action.payload;
			})
			.addCase(getListings.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getTransactions.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTransactions.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.transactions = action.payload;
			})
			.addCase(getTransactions.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// profile
			.addCase(getBillerProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBillerProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profile = action.payload;
			})
			.addCase(getBillerProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// billers
			.addCase(getBillers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBillers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.billers = action.payload;
			})
			.addCase(getBillers.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// settlement
			.addCase(getSettlement.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSettlement.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.settlement = action.payload;
			})
			.addCase(getSettlement.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = billerSlice.actions;
export default billerSlice.reducer;
