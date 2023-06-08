import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import verifyService from './verifyService'

const initialState = {
  verify: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  verifySuccess: false,
  message: '',
}

export const verify = createAsyncThunk(
  'verify/user',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return verifyService.verifyUser(data, token)
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

export const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {
    reset: (state) => initialState,
    verifyReset: (state) => {
      state.verifySuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verify.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.verifySuccess = true
        state.verify = action.payload
      })
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})
export const { reset, verifyReset } = verifySlice.actions
export default verifySlice.reducer
