import { createSlice } from '@reduxjs/toolkit'
import { IPriority } from '~/services/types'
import {
  createPriority,
  deletePriority,
  fetchPriorities,
  updatePriority
} from './actions'

const initialState: {
  loading: boolean
  allPriorities: IPriority[]
} = {
  loading: false,
  allPriorities: []
}

const prioritySlice = createSlice({
  name: 'priority',
  initialState,
  reducers: {
    setPriorities: (state, { payload }) => {
      state.allPriorities = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPriorities.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchPriorities.fulfilled, (state, { payload }) => {
      state.loading = false
      state.allPriorities = payload as IPriority[]
    })
    builder.addCase(fetchPriorities.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(createPriority.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createPriority.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(createPriority.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(updatePriority.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updatePriority.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(updatePriority.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(deletePriority.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deletePriority.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(deletePriority.rejected, (state) => {
      state.loading = false
    })
  }
})

export default prioritySlice.reducer
export const { setPriorities } = prioritySlice.actions
