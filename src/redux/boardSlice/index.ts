import { IAllBoardOfCurrentUser } from '~/services/types'
import { createSlice } from '@reduxjs/toolkit'
import { getAllByUserId } from './actions'

const initialState: {
  getAllBoard: {
    loading: boolean
    error: string | undefined
    success: boolean
  }
  boards: IAllBoardOfCurrentUser
  shouldRefreshAllBoard: boolean
  creatingBoard: {
    loading: boolean
    error: string | undefined
    success: boolean
  }
  shouldRefreshBoardDetail: boolean
  shouldRefreshMemberInBoard: boolean
} = {
  getAllBoard: {
    loading: false,
    error: undefined,
    success: false
  },
  boards: {
    workspaceHasBoards: [],
    workspaceWithNoBoard: []
  },
  shouldRefreshAllBoard: false,
  creatingBoard: {
    loading: false,
    error: undefined,
    success: false
  },
  shouldRefreshBoardDetail: false,
  shouldRefreshMemberInBoard: false
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setShouldReloadAllBoard: (state, { payload }) => {
      state.shouldRefreshAllBoard = payload
    },
    setShouldRefreshBoardDetail: (state, { payload }) => {
      state.shouldRefreshBoardDetail = payload
    },
    setShouldRefreshMemberInBoard: (state, { payload }) => {
      state.shouldRefreshMemberInBoard = payload
    },
    setCreateColumn: (state, { payload }) => {
      state.creatingBoard = {
        ...state.creatingBoard,
        ...payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllByUserId.pending, (state) => {
        state.getAllBoard.loading = true
        state.getAllBoard.error = undefined
        state.getAllBoard.success = false
      })
      .addCase(getAllByUserId.fulfilled, (state, { payload }) => {
        state.getAllBoard.loading = false
        state.getAllBoard.error = undefined
        state.getAllBoard.success = true
        state.boards = payload as IAllBoardOfCurrentUser
      })
      .addCase(getAllByUserId.rejected, (state, { payload }) => {
        state.getAllBoard.loading = false
        state.getAllBoard.error = payload as string
        state.getAllBoard.success = false
      })
  }
})

export default boardSlice.reducer
export const {
  setShouldReloadAllBoard,
  setCreateColumn,
  setShouldRefreshBoardDetail,
  setShouldRefreshMemberInBoard
} = boardSlice.actions
