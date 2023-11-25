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
} = {
  getAllBoard: {
    loading: false,
    error: undefined,
    success: false
  },
  boards: {
    workspaceHasBoards: [],
    workspaceWithNoBoard: []
  }
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
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
