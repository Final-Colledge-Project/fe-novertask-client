import { createSlice } from '@reduxjs/toolkit'
import { createWS } from './actions'

interface TempWSType {
  id: string
  name: string
  workspaceSuperAdmins: string
}

const initialState: {
  loading: boolean
  error: undefined | string
  success: boolean
  currentTeamWS: TempWSType[] | undefined
  createWS: {
    loading: boolean
    error: undefined | string
    success: boolean
  }
} = {
  loading: false,
  error: undefined,
  success: false,
  currentTeamWS: [],
  createWS: {
    loading: false,
    error: undefined,
    success: false
  }
}

const teamWSSlice = createSlice({
  name: 'teamWorkspace',
  initialState,
  reducers: {
    resetCreateWS: (state) => {
      state.createWS = {
        loading: false,
        error: undefined,
        success: false
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWS.pending, (state) => {
        state.createWS = {
          loading: true,
          error: undefined,
          success: false
        }
      })
      .addCase(createWS.fulfilled, (state, { payload }) => {
        state.currentTeamWS?.push(payload as TempWSType)
        state.createWS = {
          error: undefined,
          loading: false,
          success: true
        }
      })
      .addCase(createWS.rejected, (state, { payload }) => {
        state.createWS = {
          error: payload as string,
          loading: false,
          success: false
        }
      })
  }
})

export default teamWSSlice.reducer
export const { resetCreateWS } = teamWSSlice.actions
