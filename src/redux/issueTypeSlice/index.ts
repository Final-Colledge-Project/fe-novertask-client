import { createSlice } from '@reduxjs/toolkit'
import { IIssueType } from '~/services/types'
import { fetchIssueTypes } from './actions'

const initialState: {
  loading: boolean
  allIssueTypes: IIssueType[]
} = {
  loading: false,
  allIssueTypes: []
}

const issueTypeSlice = createSlice({
  name: 'issueType',
  initialState,
  reducers: {
    setIssueTypes: (state, { payload }) => {
      state.allIssueTypes = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssueTypes.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchIssueTypes.fulfilled, (state, { payload }) => {
      state.loading = false
      state.allIssueTypes = payload as IIssueType[]
    })
    builder.addCase(fetchIssueTypes.rejected, (state) => {
      state.loading = false
    })
  }
})

export default issueTypeSlice.reducer
export const { setIssueTypes } = issueTypeSlice.actions
