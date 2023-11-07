import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { signIn } from './action'

// get the token from local storage
const userToken =
  localStorage.getItem(import.meta.env.VITE_USER_TOKEN_KEY) || undefined

const initialState: {
  userToken: string | undefined | null
  loading: boolean
  error: undefined | string
  success: boolean
  otp: string | undefined
} = {
  userToken,
  loading: false,
  error: undefined,
  success: false,
  otp: undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOTP: (state, action: PayloadAction<string>) => {
      state.otp = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userToken = payload as string
        state.success = true
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload as string
      })
  }
})

export default authSlice.reducer
