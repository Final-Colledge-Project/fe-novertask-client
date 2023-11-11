import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCurrentUser } from './actions'
import { IUser } from '~/services/types'

const initialState: {
  tempEmail: string
  user: IUser | undefined
  loading: boolean
  error: undefined | string
  success: boolean
} = {
  tempEmail: '',
  user: undefined,
  loading: false,
  error: undefined,
  success: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.tempEmail = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = true
        state.user = payload as IUser
        state.error = undefined
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.loading = false
        state.success = false
        state.error = payload as string
      })
  }
})

const { actions, reducer } = userSlice

export const { setEmail } = actions
export default reducer
