import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  getCurrentUser,
  signIn,
  signOut,
  updateUser,
  uploadAvatar
} from './actions'
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
  isSigningOut: boolean
  emailToVerify: string | undefined
  isRefreshingToken: boolean
  updateUser: {
    error: undefined | string
    success: boolean
  }
} = {
  userToken,
  userInfo: undefined,
  loading: false,
  error: undefined,
  success: false,
  otp: undefined,
  shouldReSign: false,
  isSigningOut: false,
  emailToVerify: undefined,
  isRefreshingToken: false,
  updateUser: {
    error: undefined,
    success: false
  }
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
    },
    setEmail: (state, action) => {
      state.emailToVerify = action.payload
    },
    setIsRefreshingToken: (state, action) => {
      state.isRefreshingToken = action.payload
    },
    resetUpdateUser: (state) => {
      state.updateUser = {
        error: undefined,
        success: false
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true
        state.error = undefined
        state.shouldReSign = false
        state.emailToVerify = undefined
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
        state.emailToVerify = undefined
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
      .addCase(signOut.pending, (state) => {
        state.loading = true
        state.error = undefined
        state.success = false
        state.isSigningOut = false
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false
        state.success = true
        state.userInfo = undefined
        localStorage.setItem(import.meta.env.VITE_USER_TOKEN_KEY, 'undefined')
        state.userToken = undefined
        state.isSigningOut = true
      })
      .addCase(signOut.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload as string
        state.success = false
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true
        state.error = undefined
        state.success = false
      })
      .addCase(uploadAvatar.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = payload
        state.success = true
      })
      .addCase(uploadAvatar.rejected, (state, { payload }) => {
        state.loading = false
        state.success = false
        state.error = payload as string
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.updateUser.error = undefined
        state.updateUser.success = false
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = payload
        state.updateUser.success = true
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false
        state.updateUser.success = false
        state.updateUser.error = payload as string
      })
  }
})

export default authSlice.reducer
export const {
  setOTP,
  setToken,
  setReSign,
  setEmail,
  setIsRefreshingToken,
  resetUpdateUser
} = authSlice.actions
