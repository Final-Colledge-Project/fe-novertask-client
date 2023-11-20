import { IBoardData } from '~/services/types'
import { createSlice } from '@reduxjs/toolkit'
import { getAllByUserId } from './actions'

const initialState: {
  getAllBoard: {
    data: IBoardData[]
    loading: boolean
    error: string | undefined
    success: boolean
  }
  boards: IBoardData[]
} = {
  getAllBoard: {
    data: [],
    loading: false,
    error: undefined,
    success: false
  },
  boards: []
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
        state.getAllBoard.data = payload as IBoardData[]
        state.boards = payload as IBoardData[]
      })
      .addCase(getAllByUserId.rejected, (state, { payload }) => {
        state.getAllBoard.loading = false
        state.getAllBoard.error = payload as string
        state.getAllBoard.success = false
      })
  }
})

export default boardSlice.reducer
