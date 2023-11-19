import { createSlice } from '@reduxjs/toolkit'

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    loading: false
  },
  reducers: {
    showLoading: () => {
      return { loading: true }
    },
    hideLoading: () => {
      return { loading: false }
    }
  }
})

export default progressSlice.reducer
export const { showLoading, hideLoading } = progressSlice.actions
