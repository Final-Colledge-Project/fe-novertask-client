import { createSlice } from '@reduxjs/toolkit'
import { IAllMemberInBoard, IBoardMembers } from '~/services/types'

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
    PopupAddMemberToBoard: {
      show: false,
      data: {
        currentWsID: undefined as undefined | string,
        currentBoardID: undefined as undefined | string,
        currentMembers: {} as IAllMemberInBoard
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
    },
    setPopupAddMemberToBoard: (state, action) => {
      state.PopupAddMemberToBoard = action.payload
    }
  }
})

export default popupSlice.reducer
export const {
  setPopupAddWS,
  setPopupAddPJ,
  setPopupAddTask,
  setPopupInvitePeople,
  setPopupAddMemberToBoard
} = popupSlice.actions
