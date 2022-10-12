import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const data = JSON.parse(localStorage.getItem('data'));

const initialState = {
	data: data ? data : null,
	isSuccess: false,
	isLoading: false,
	isError: false,
	message: '',
};

// login user
export const login = createAsyncThunk('admin/auth', async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

// logout
export const logout = createAsyncThunk('/logout', async (thunkAPI) => {
	await authService.logout();
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isSuccess = false;
			state.isLoading = false;
			state.isError = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.data = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.data = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.data = null;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
