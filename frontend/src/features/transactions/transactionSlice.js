import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import transactionService from './transactionService'

const initialState = {
  transaction: null,
  transactions: [],
  send: [],
  received: [],
  moneyAdded: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const sendMoney = createAsyncThunk(
  'transaction/send',
  async (transaction, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transactionService.sendMoney(transaction, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const addBalance = createAsyncThunk(
  'transaction/addMoney',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transactionService.addMoney(data, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getTransactions = createAsyncThunk(
  'transaction/getTransactions',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transactionService.getTransactions(userId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const getSendTransactions = createAsyncThunk(
  'transaction/moneySend',
  async (__, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transactionService.getMoneySend(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const getReceivedTransactions = createAsyncThunk(
  'transaction/moneyReceived',
  async (__, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transactionService.getMoneyReceive(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // send money
      .addCase(sendMoney.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendMoney.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.transaction = action.payload
      })
      .addCase(sendMoney.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // get send transactions
      .addCase(getSendTransactions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSendTransactions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.send = action.payload
      })
      .addCase(getSendTransactions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // get Received
      .addCase(getReceivedTransactions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getReceivedTransactions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.received = action.payload
      })
      .addCase(getReceivedTransactions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // get all transactions
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.transactions = action.payload
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // add money
      .addCase(addBalance.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addBalance.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.moneyAdded = action.payload
      })
      .addCase(addBalance.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})
export const { reset } = transactionSlice.actions
export default transactionSlice.reducer
