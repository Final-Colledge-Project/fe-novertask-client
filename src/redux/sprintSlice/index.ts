import { createSlice } from '@reduxjs/toolkit'
import { ISprint } from '~/services/types'
import { fetchSprints } from './actions'
const initialState: {
  loading: boolean
  allSprints: ISprint[]
} = {
  loading: false,
  allSprints: []
}

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    setSprints: (state, { payload }) => {
      state.allSprints = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSprints.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchSprints.fulfilled, (state, { payload }) => {
      state.loading = false
      state.allSprints = payload as unknown as ISprint[]
    })
    builder.addCase(fetchSprints.rejected, (state) => {
      state.loading = false
    })
  }
})

export default sprintSlice.reducer
export const { setSprints } = sprintSlice.actions
