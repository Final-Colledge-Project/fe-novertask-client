import { INotificationItem } from '~/services/types'
import { createSlice } from '@reduxjs/toolkit'
import { getMarkReadAllNotification, getMarkReadNotification, getNotificationByUserId } from './actions'
const initialState: {
  getNotification: {
    loading: boolean
    error: string | undefined
    success: boolean
  }
  notifications: INotificationItem
  getMarkReadNotification: {
    loading: boolean
    error: string | undefined
    success: boolean
  }
  getMarkReadAllNotification: {
    loading: boolean
    error: string | undefined
    success: boolean
  }
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
  },
  getMarkReadNotification: {
    loading: false,
    error: undefined,
    success: false
  },
  getMarkReadAllNotification: {
    loading: false,
    error: undefined,
    success: false
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
      .addCase(getMarkReadNotification.pending, (state) => {
        state.getMarkReadNotification.loading = true
        state.getMarkReadNotification.error = undefined
        state.getMarkReadNotification.success = false
      })
      .addCase(getMarkReadNotification.fulfilled, (state) => {
        state.getMarkReadNotification.loading = false
        state.getMarkReadNotification.error = undefined
        state.getMarkReadNotification.success = true
      })
      .addCase(getMarkReadNotification.rejected, (state, { payload }) => {
        state.getMarkReadNotification.loading = false
        state.getMarkReadNotification.error = payload as string
        state.getMarkReadNotification.success = false
      })
      .addCase(getMarkReadAllNotification.pending, (state) => {
        state.getMarkReadAllNotification.loading = true
        state.getMarkReadAllNotification.error = undefined
        state.getMarkReadAllNotification.success = false
      })
      .addCase(getMarkReadAllNotification.fulfilled, (state) => {
        state.getMarkReadAllNotification.loading = false
        state.getMarkReadAllNotification.error = undefined
        state.getMarkReadAllNotification.success = true
      })
      .addCase(getMarkReadAllNotification.rejected, (state, { payload }) => {
        state.getMarkReadAllNotification.loading = false
        state.getMarkReadAllNotification.error = payload as string
        state.getMarkReadAllNotification.success = false
      })
  }
})

export default notificationSlice.reducer
