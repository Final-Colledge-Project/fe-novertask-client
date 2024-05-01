import { createSlice } from '@reduxjs/toolkit'
import { IGoogleEvent, ISchedule } from '~/services/types'
import { addSchedule, getSchedules, updateScheduleReducer } from './actions'

const initialState: {
  loading: boolean
  googleEvents: IGoogleEvent[]
  schedules: ISchedule[]
  isFetching: boolean
  updateSchedule: {
    loading: boolean
  }
} = {
  loading: false,
  googleEvents: [],
  schedules: [],
  isFetching: false,
  updateSchedule: {
    loading: false
  }
}

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setGoogleCalendarEvents: (state, { payload }) => {
      state.googleEvents = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSchedules.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getSchedules.fulfilled, (state, { payload }) => {
      state.loading = false
      state.schedules = payload as ISchedule[]
      state.isFetching = true
    })
    builder.addCase(getSchedules.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(addSchedule.pending, (state) => {
      state.loading = true
    })
    builder.addCase(addSchedule.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(addSchedule.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(updateScheduleReducer.pending, (state) => {
      state.updateSchedule.loading = true
    })
    builder.addCase(updateScheduleReducer.fulfilled, (state) => {
      state.updateSchedule.loading = false
    })
    builder.addCase(updateScheduleReducer.rejected, (state) => {
      state.updateSchedule.loading = false
    })
  }
})

export default scheduleSlice.reducer
export const { setGoogleCalendarEvents } = scheduleSlice.actions
