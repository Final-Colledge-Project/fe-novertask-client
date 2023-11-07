import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import initialState, { IInitStateType } from './initState'

const snackBarSlice = createSlice({
  name: 'snackbar',
  initialState: initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<IInitStateType>) => {
      return {
        ...state,
        ...action.payload,
        open: true
      }
    },
    hideMessage: (state) => {
      return {
        ...state,
        message: undefined,
        open: false
      }
    }
  }
})

export default snackBarSlice.reducer
export const { showMessage, hideMessage } = snackBarSlice.actions
