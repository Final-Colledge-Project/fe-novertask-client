import { createSlice } from '@reduxjs/toolkit'
import { IGoogleEvent } from '~/services/types'

const initialState: {
  loading: boolean
  error: undefined | string
  success: boolean
  googleEvents: IGoogleEvent[]
} = {
  loading: false,
  error: undefined,
  success: false,
  googleEvents: []
}

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setGoogleCalendarEvents: (state, { payload }) => {
      console.log('🚀 ~ setGoogleCalendarEvents:', action)
      state.googleEvents = payload
    }
  }
})

export default scheduleSlice.reducer
export const { setGoogleCalendarEvents } = scheduleSlice.actions
