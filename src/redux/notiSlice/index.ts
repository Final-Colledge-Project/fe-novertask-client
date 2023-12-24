import { INotification, INotificationItem } from '~/services/types'
import { createSlice } from '@reduxjs/toolkit'
import { getNotificationByUserId } from './actions'
const initialState: {
  getNotification: {
    loading: boolean
    error: string | undefined
    success: boolean
  }
  notifications: INotificationItem
} = {
  getNotification: {
    loading: false,
    error: undefined,
    success: false
  },
  notifications: {
    all: 0,
    unRead: 0,
    data: []
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationByUserId.pending, (state) => {
        state.getNotification.loading = true
        state.getNotification.error = undefined
        state.getNotification.success = false
      })
      .addCase(getNotificationByUserId.fulfilled, (state, { payload }) => {
        state.getNotification.loading = false
        state.getNotification.error = undefined
        state.getNotification.success = true
        state.notifications = payload as INotificationItem
      })
      .addCase(getNotificationByUserId.rejected, (state, { payload }) => {
        state.getNotification.loading = false
        state.getNotification.error = payload as string
        state.getNotification.success = false
      })
  }
})

export default notificationSlice.reducer
