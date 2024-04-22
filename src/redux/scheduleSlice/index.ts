import { createSlice } from '@reduxjs/toolkit'
import { getGoogleCalendar, syncGoogleEvents } from './action'
import { IGoogleEvent } from '~/services/types'

const initialState: {
  loading: boolean
  error: undefined | string
  success: boolean
  syncGoogleEvents: {
    loading: boolean
    error: undefined | string
    success: boolean
  }
  getGoogleCalendar: {
    loading: boolean
    error: undefined | string
    success: boolean
    data: IGoogleEvent[]
  }
} = {
  loading: false,
  error: undefined,
  success: false,
  syncGoogleEvents: {
    loading: false,
    error: undefined,
    success: false
  },
  getGoogleCalendar: {
    loading: false,
    error: undefined,
    success: false,
    data: []
  }
}

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncGoogleEvents.pending, (state) => {
        state.syncGoogleEvents = {
          loading: true,
          error: undefined,
          success: false
        }
      })
      .addCase(syncGoogleEvents.fulfilled, (state) => {
        state.syncGoogleEvents = {
          loading: false,
          error: undefined,
          success: true
        }
      })
      .addCase(syncGoogleEvents.rejected, (state, action) => {
        state.syncGoogleEvents = {
          loading: false,
          error: action.error.message,
          success: false
        }
      })
      .addCase(getGoogleCalendar.pending, (state) => {
        state.getGoogleCalendar = {
          loading: true,
          error: undefined,
          success: false,
          data: []
        }
      })
      .addCase(getGoogleCalendar.fulfilled, (state, { payload }) => {
        state.getGoogleCalendar = {
          loading: false,
          error: undefined,
          success: true,
          data: payload as IGoogleEvent[]
        }
      })
      .addCase(getGoogleCalendar.rejected, (state, action) => {
        state.getGoogleCalendar = {
          loading: false,
          error: action.error.message,
          success: false,
          data: []
        }
      })
  }
})

export default scheduleSlice.reducer
