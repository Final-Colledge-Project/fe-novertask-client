import { createSlice } from '@reduxjs/toolkit'

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    PopupAddWS: false,
    PopupAddPJ: false,
    PopupAddTask: false
  },
  reducers: {
    setPopupAddWS: (state, action) => {
      state.PopupAddWS = action.payload
    },
    setPopupAddPJ: (state, action) => {
      state.PopupAddPJ = action.payload
    },
    setPopupAddTask: (state, action) => {
      state.PopupAddTask = action.payload
    }
  }
})

export default popupSlice.reducer
export const { setPopupAddWS, setPopupAddPJ, setPopupAddTask } =
  popupSlice.actions
