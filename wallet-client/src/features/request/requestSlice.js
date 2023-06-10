import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import requestService from './requestService'
import transactionService from '../transactions/transactionService'

const initialState = {
  request: null,
  send: [],
  received: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  reqReceivedNo: '',
  reqSuccess: false,
  reqLoading: false,
  message: '',
}

export const sendRequest = createAsyncThunk(
  'request/sendRequest',
  async (request, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await requestService.requestMoney(request, token)
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

export const requestSend = createAsyncThunk(
  'request/requestSend',
  async (__, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await requestService.requestSend(token)
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

export const requestReceive = createAsyncThunk(
  'request/requestReceived',
  async (__, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await requestService.requestReceived(token)
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

export const updateRequest = createAsyncThunk(
  'request/requestUpdate',
  async (updatedRequest, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await requestService.updateRequestStatus(updatedRequest, token)
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

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    reset: (state) => {
      (state.request = null),
        (state.send = []),
        (state.received = []),
        (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.reqSuccess = false),
        (state.reqLoading = false),
        (state.message = '')
    },
    payReset: (state) => {
      state.reqSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.request = action.payload
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(requestSend.pending, (state) => {
        state.isLoading = true
      })
      .addCase(requestSend.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.send = action.payload
      })
      .addCase(requestSend.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(requestReceive.pending, (state) => {
        state.isLoading = true
      })
      .addCase(requestReceive.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.received = action.payload
        state.reqReceivedNo = action.payload.length
      })
      .addCase(requestReceive.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reqLoading = true
        state.reqSuccess = true
        state.request = action.payload
      })
      .addCase(updateRequest.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, payReset } = requestSlice.actions
export default requestSlice.reducer
