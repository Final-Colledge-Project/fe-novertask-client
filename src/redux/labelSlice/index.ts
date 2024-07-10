import { createSlice } from '@reduxjs/toolkit'
import { ILabel } from '~/services/types'
import { getAllLabelByBoardId } from './actions'
import { createLabelThunk, deleteLabelThunk, updateLabelThunk } from './actions'
const initialState: {
  loading: boolean
  getAllLabelByBoardId: {
    loading: boolean
    error: string | undefined
    success: boolean
  }
  labels: ILabel[]
} = {
  loading: false,
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
    },
    setLabels: (state, { payload }) => {
      state.labels = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createLabelThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createLabelThunk.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(createLabelThunk.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(updateLabelThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateLabelThunk.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(updateLabelThunk.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(deleteLabelThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteLabelThunk.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(deleteLabelThunk.rejected, (state) => {
      state.loading = false
    })
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
export const { setLabels, resetLabelsData } = labelSlice.actions
