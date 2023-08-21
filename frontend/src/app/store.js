import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import transactionSlice from '../features/transactions/transactionSlice'
import requestSlice from '../features/request/requestSlice'
import uploadSlice from '../features/upload/uploadSlice'
import verifySlice from '../features/verify/verifySlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    transact: transactionSlice,
    request: requestSlice,
    upload: uploadSlice,
    verify: verifySlice,
  },
})
