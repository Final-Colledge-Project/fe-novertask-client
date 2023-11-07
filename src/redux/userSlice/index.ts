import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: ''
  },
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    }
  }
})

const { actions, reducer } = userSlice

export const { setEmail } = actions
export default reducer
