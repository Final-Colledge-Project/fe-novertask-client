import { createSlice } from '@reduxjs/toolkit'

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    loading: false
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true
    },
    hideLoading: (state) => {
      state.loading = false
    }
  }
})

export default progressSlice.reducer
export const { showLoading, hideLoading } = progressSlice.actions
