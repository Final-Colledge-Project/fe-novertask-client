import { createSlice } from '@reduxjs/toolkit'
import { IBoardMembers } from '~/services/types'

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    PopupAddWS: false,
    PopupAddPJ: {
      show: false,
      data: {
        currentWsID: undefined as undefined | string
      }
    },
    PopupAddTask: false,
    PopupInvite: {
      show: false,
      data: {
        wsID: undefined as undefined | string,
        members: undefined as IBoardMembers | undefined
      }
    }
  },
  reducers: {
    setPopupAddWS: (state, action) => {
      state.PopupAddWS = action.payload
    },
    setPopupAddPJ: (state, action) => {
      state.PopupAddPJ = {
        ...state.PopupAddPJ,
        ...action.payload
      }
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
