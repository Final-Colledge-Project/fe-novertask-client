import { IBoardPermission } from './../../services/types'
import { createSlice } from '@reduxjs/toolkit'
import { getBoardPermission } from './actions'

interface IInitialState {
  currentBoardPermission: IBoardPermission[] | null
  getBoardPermissionStatus: string
  getBoardPermissionErrMessage: string
}

const initialState: IInitialState = {
  currentBoardPermission: null,
  getBoardPermissionStatus: '',
  getBoardPermissionErrMessage: ''
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
  }
})

export default permissionSlice.reducer
export const { setCurrentBoardPermission, resetCurrentBoardPermission } =
  permissionSlice.actions
