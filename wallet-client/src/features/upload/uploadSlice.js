import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import uploadService from './uploadService'

const initialState = {
  userImg: null,
  uploadLoading: false,
  uploadSuccess: false,
  uploadError: false,
  message: '',
}

export const uploadProfileImage = createAsyncThunk(
  'upload/profileUpdate',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await uploadService.uploadImage(data, token)
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

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.uploadLoading = true
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.uploadLoading = false
        state.uploadSuccess = true
        state.userImg = action.payload.image
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.uploadLoading = false
        state.uploadError = true
        state.message = action.payload
      })
  },
})

export default uploadSlice.reducer
