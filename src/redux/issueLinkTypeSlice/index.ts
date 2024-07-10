import { createSlice } from '@reduxjs/toolkit'
import { IIssueLinkType } from '~/services/types'
import {
  createIssueLinkType,
  deleteIssueLinkType,
  fetchIssueLinkTypes,
  updateIssueLinkType
} from './actions'

const initialState: {
  loading: boolean
  allIssueLinkTypes: IIssueLinkType[]
} = {
  loading: false,
  allIssueLinkTypes: []
}

const issueLinkTypeSlice = createSlice({
  name: 'issueLinkType',
  initialState,
  reducers: {
    setIssueLinkTypes: (state, { payload }) => {
      state.allIssueLinkTypes = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssueLinkTypes.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchIssueLinkTypes.fulfilled, (state, { payload }) => {
      state.loading = false
      state.allIssueLinkTypes = payload as IIssueLinkType[]
    })
    builder.addCase(fetchIssueLinkTypes.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(createIssueLinkType.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createIssueLinkType.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(createIssueLinkType.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(updateIssueLinkType.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateIssueLinkType.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(updateIssueLinkType.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(deleteIssueLinkType.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteIssueLinkType.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(deleteIssueLinkType.rejected, (state) => {
      state.loading = false
    })
  }
})

export default issueLinkTypeSlice.reducer
export const { setIssueLinkTypes } = issueLinkTypeSlice.actions
