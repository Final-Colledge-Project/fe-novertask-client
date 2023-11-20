import { createSlice } from '@reduxjs/toolkit'

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    PopupAddWS: false,
    PopupAddPJ: false,
    PopupAddTask: false,
    PopupInvite: false
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
    },
    setPopupInvitePeople: (state, action) => {
      state.PopupInvite = action.payload
    }
  }
})

export default popupSlice.reducer
export const {
  setPopupAddWS,
  setPopupAddPJ,
  setPopupAddTask,
  setPopupInvitePeople
} = popupSlice.actions
