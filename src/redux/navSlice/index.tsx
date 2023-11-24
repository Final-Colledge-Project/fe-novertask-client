import { createSlice } from '@reduxjs/toolkit'

const navSlice = createSlice({
  name: 'popup',
  initialState: {
    current: 'dashboard'
  },
  reducers: {
    setCurrentNavItem: (state, action) => {
      state.current = action.payload as string
    }
  }
})

export default navSlice.reducer
export const { setCurrentNavItem } = navSlice.actions
