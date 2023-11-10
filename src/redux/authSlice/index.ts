import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getCurrentUser, signIn } from './actions'
import { IUser } from '~/services/types'

// get the token from local storage
let userToken = localStorage.getItem(import.meta.env.VITE_USER_TOKEN_KEY) as
  | string
  | null
  | undefined

userToken = userToken === 'undefined' ? undefined : userToken

const initialState: {
  userToken: string | undefined | null
  userInfo: IUser | undefined
  loading: boolean
  error: undefined | string
  success: boolean
  otp: string | undefined
  shouldReSign: boolean
} = {
  userToken,
  userInfo: undefined,
  loading: false,
  error: undefined,
  success: false,
  otp: undefined,
  shouldReSign: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOTP: (state, action: PayloadAction<string>) => {
      state.otp = action.payload
    },
    setToken: (state, action) => {
      localStorage.setItem(
        import.meta.env.VITE_USER_TOKEN_KEY,
        action.payload as string
      )
      state.userToken = action.payload
    },
    setReSign: (state, action) => {
      state.shouldReSign = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true
        state.error = undefined
        state.shouldReSign = false
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userToken = payload?.userToken
        state.userInfo = payload?.userInfo
        state.success = true
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.loading = false
        state.success = false
        state.error = payload as string
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true
        state.error = undefined
        state.success = false
        state.shouldReSign = false
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = true
        state.userInfo = payload as IUser
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload as string
        state.success = false
      })
  }
})

export default authSlice.reducer
export const { setOTP, setToken, setReSign } = authSlice.actions
