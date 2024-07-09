import { createSlice } from '@reduxjs/toolkit'
import { ILabel } from '~/services/types'
import { getAllLabelByBoardId } from './actions'

const initialState: {
  getAllLabelByBoardId: {
    loading: boolean
    error: string | undefined
    success: boolean
  }
  labels: ILabel[]
} = {
  getAllLabelByBoardId: {
    loading: false,
    error: undefined,
    success: false
  },
  labels: []
}

const labelSlice = createSlice({
  name: 'label',
  initialState,
  reducers: {
    resetLabelsData: (state) => {
      state.labels = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllLabelByBoardId.fulfilled, (state, { payload }) => {
      state.getAllLabelByBoardId.loading = false
      state.getAllLabelByBoardId.success = true
      state.getAllLabelByBoardId.error = undefined
      state.labels = payload as ILabel[]
    })
    builder.addCase(getAllLabelByBoardId.pending, (state) => {
      state.getAllLabelByBoardId.loading = true
      state.getAllLabelByBoardId.success = false
      state.getAllLabelByBoardId.error = undefined
    })
    builder.addCase(getAllLabelByBoardId.rejected, (state, { payload }) => {
      state.getAllLabelByBoardId.loading = false
      state.getAllLabelByBoardId.success = false
      state.getAllLabelByBoardId.error = payload as string
    })
  }
})

export default labelSlice.reducer
export const { resetLabelsData } = labelSlice.actions
