import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dataService from './dataService';

const data = JSON.parse(localStorage.getItem('data'))

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: ''
}

// get biller data
export const getBillerData = createAsyncThunk('/biller_admin', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.data.token;
    // console.log(token);
    return await dataService.getBiller(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message)
  }
})

// get biller daily transaction
export const getDailyTransactionData = createAsyncThunk('/biller_admin/total_transactions/daily', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.data.token;
    // console.log(token);
    return await dataService.getDailyTransaction(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message)
  }
})

// get biller monthly transaction
export const getMonthlyTransactionData = createAsyncThunk('/biller_admin/total_transactions/monthly', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.data.token;
    // console.log(token);
    return await dataService.getMonthlyTransaction(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message)
  }
})

// get biller yearly transaction
export const getYearlyTransactionData = createAsyncThunk('/biller_admin/total_transactions/yearly', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.data.token;
    // console.log(token);
    return await dataService.getYearlyTransaction(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message)
  }
})

// get biller to date transaction
export const getToDateTransactionData = createAsyncThunk('/biller_admin/total_transactions/to_date', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.data.token;
    // console.log(token);
    return await dataService.getToDateTransaction(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message)
  }
})

// data slice
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      // biller profile
      .addCase(getBillerData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBillerData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.biller = action.payload
      })
      .addCase(getBillerData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // daily transaction
      .addCase(getDailyTransactionData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDailyTransactionData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.daily = action.payload
      })
      .addCase(getDailyTransactionData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // monthly transaction
      .addCase(getMonthlyTransactionData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMonthlyTransactionData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.monthly = action.payload
      })
      .addCase(getMonthlyTransactionData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // yearly transaction
      .addCase(getYearlyTransactionData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getYearlyTransactionData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.yearly = action.payload
      })
      .addCase(getYearlyTransactionData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // to date transaction
      .addCase(getToDateTransactionData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getToDateTransactionData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.toDate = action.payload
      })
      .addCase(getToDateTransactionData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = dataSlice.actions
export default dataSlice.reducer