import { createSlice } from '@reduxjs/toolkit'
import { ILabel } from '~/services/types'
import {
  createLabelThunk,
  deleteLabelThunk,
  fetchLabels,
  updateLabelThunk
} from './actions'

const initialState: {
  loading: boolean
  allLabels: ILabel[]
} = {
  loading: false,
  allLabels: []
}

const labelSlice = createSlice({
  name: 'label',
  initialState,
  reducers: {
    setLabels: (state, { payload }) => {
      state.allLabels = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLabels.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchLabels.fulfilled, (state, { payload }) => {
      state.loading = false
      state.allLabels = payload as ILabel[]
    })
    builder.addCase(fetchLabels.rejected, (state) => {
      state.loading = false
    })
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
  }
})

export default labelSlice.reducer
export const { setLabels } = labelSlice.actions
