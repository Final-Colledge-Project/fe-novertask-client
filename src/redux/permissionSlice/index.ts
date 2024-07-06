import { IBoardPermission, IWSPermission } from './../../services/types'
import { createSlice } from '@reduxjs/toolkit'
import {
  getBoardPermission,
  getUserPermissionOnBoard,
  getUserPermissionOnWS,
  getWSPermission
} from './actions'

interface IInitialState {
  currentBoardPermission: IBoardPermission[] | null
  getBoardPermissionStatus: string
  getBoardPermissionErrMessage: string
  currentWSPermission: IWSPermission[] | null
  getWSPermissionStatus: string
  getWSPermissionErrMessage: string
  userPermissionOnBoard: IBoardPermission | null
  userPermissionOnWS: IWSPermission | null
  getUserPermissionOnBoardStatus: string
  getUserPermissionOnBoardErrMsg: string
  getUserPermissionOnWSStatus: string
  getUserPermissionOnWSErrMsg: string
}

const initialState: IInitialState = {
  currentBoardPermission: null,
  getBoardPermissionStatus: '',
  getBoardPermissionErrMessage: '',
  currentWSPermission: null,
  getWSPermissionStatus: '',
  getWSPermissionErrMessage: '',
  userPermissionOnBoard: null,
  userPermissionOnWS: null,
  getUserPermissionOnBoardStatus: '',
  getUserPermissionOnBoardErrMsg: '',
  getUserPermissionOnWSStatus: '',
  getUserPermissionOnWSErrMsg: ''
}

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setCurrentBoardPermission: (state, action) => {
      state.currentBoardPermission = action.payload as IBoardPermission[]
    },
    resetCurrentBoardPermission: (state) => {
      state.currentBoardPermission = null
    },
    setCurrentWSPermission: (state, action) => {
      state.currentWSPermission = action.payload as IWSPermission[]
    },
    resetCurrentWSPermission: (state) => {
      state.currentWSPermission = null
    },
    setUserPermissionOnBoard: (state, action) => {
      state.userPermissionOnBoard = action.payload as IBoardPermission
    },
    resetUserPermissionOnBoard: (state) => {
      state.userPermissionOnBoard = null
    },
    setUserPermissionOnWS: (state, action) => {
      state.userPermissionOnWS = action.payload as IWSPermission
    },
    resetUserPermissionOnWS: (state) => {
      state.userPermissionOnWS = null
    },
    resetCurrentWSPermissionState: (state) => {
      state.getWSPermissionStatus = ''
      state.getWSPermissionErrMessage = ''
    },
    resetCurrentBoardPermissionState: (state) => {
      state.getBoardPermissionStatus = ''
      state.getBoardPermissionErrMessage = ''
    },
    resetUserPermissionOnBoardState: (state) => {
      state.getUserPermissionOnBoardStatus = ''
      state.getUserPermissionOnBoardErrMsg = ''
    },
    resetUserPermissionOnWSState: (state) => {
      state.getUserPermissionOnWSStatus = ''
      state.getUserPermissionOnWSErrMsg = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardPermission.pending, (state) => {
        state.currentBoardPermission = null
        state.getBoardPermissionStatus = 'loading'
        state.getBoardPermissionErrMessage = ''
      })
      .addCase(getBoardPermission.fulfilled, (state, action) => {
        state.currentBoardPermission = action.payload as IBoardPermission[]
        state.getBoardPermissionStatus = 'success'
        state.getBoardPermissionErrMessage = ''
      })
      .addCase(getBoardPermission.rejected, (state, action) => {
        state.currentBoardPermission = []
        state.getBoardPermissionStatus = 'error'
        state.getBoardPermissionErrMessage = action.payload as string
      })
      .addCase(getWSPermission.pending, (state) => {
        state.currentWSPermission = null
        state.getWSPermissionStatus = 'loading'
        state.getWSPermissionErrMessage = ''
      })
      .addCase(getWSPermission.fulfilled, (state, action) => {
        state.currentWSPermission = action.payload as IWSPermission[]
        state.getWSPermissionStatus = 'success'
        state.getWSPermissionErrMessage = ''
      })
      .addCase(getWSPermission.rejected, (state, action) => {
        state.currentWSPermission = []
        state.getWSPermissionStatus = 'error'
        state.getWSPermissionErrMessage = action.payload as string
      })
      .addCase(getUserPermissionOnBoard.pending, (state) => {
        state.userPermissionOnBoard = null
        state.getUserPermissionOnBoardStatus = 'loading'
        state.getUserPermissionOnBoardErrMsg = ''
      })
      .addCase(getUserPermissionOnBoard.fulfilled, (state, action) => {
        state.userPermissionOnBoard = action.payload as IBoardPermission
        state.getUserPermissionOnBoardStatus = 'success'
        state.getUserPermissionOnBoardErrMsg = ''
      })
      .addCase(getUserPermissionOnBoard.rejected, (state, action) => {
        state.userPermissionOnBoard = null
        state.getUserPermissionOnBoardStatus = 'error'
        state.getUserPermissionOnBoardErrMsg = action.payload as string
      })
      .addCase(getUserPermissionOnWS.pending, (state) => {
        state.userPermissionOnWS = null
        state.getUserPermissionOnWSStatus = 'loading'
        state.getUserPermissionOnWSErrMsg = ''
      })
      .addCase(getUserPermissionOnWS.fulfilled, (state, action) => {
        state.userPermissionOnWS = action.payload as IWSPermission
        state.getUserPermissionOnWSStatus = 'success'
        state.getUserPermissionOnWSErrMsg = ''
      })
      .addCase(getUserPermissionOnWS.rejected, (state, action) => {
        state.userPermissionOnWS = null
        state.getUserPermissionOnWSStatus = 'error'
        state.getUserPermissionOnWSErrMsg = action.payload as string
      })
  }
})

export default permissionSlice.reducer
export const {
  setCurrentBoardPermission,
  resetCurrentBoardPermission,
  setCurrentWSPermission,
  resetCurrentWSPermission,
  setUserPermissionOnBoard,
  setUserPermissionOnWS,
  resetUserPermissionOnBoard,
  resetUserPermissionOnWS,
  resetCurrentWSPermissionState,
  resetCurrentBoardPermissionState,
  resetUserPermissionOnBoardState,
  resetUserPermissionOnWSState
} = permissionSlice.actions
