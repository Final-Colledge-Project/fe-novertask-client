import { createSlice } from '@reduxjs/toolkit'
import { IAssignedCard } from '~/services/types'
import { getTaskAssignedToMe } from './actions'

export interface IFilterOptions {
  assignToMe?: boolean
}

const initialState: {
  searchString: undefined | string
  filter: IFilterOptions
  getCardAssignedToMe: {
    loading: boolean
    error: string | undefined
    success: boolean
  }
  cardsAssignedToMe: IAssignedCard[]
} = {
  searchString: undefined,
  filter: {
    assignToMe: false
  },
  getCardAssignedToMe: {
    loading: false,
    error: undefined,
    success: false
  },
  cardsAssignedToMe: []
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setSearchString: (state, { payload }) => {
      state.searchString = payload as string
    },
    setFilter: (state, { payload }: { payload: IFilterOptions }) => {
      state.filter = { ...payload }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskAssignedToMe.fulfilled, (state, { payload }) => {
      state.getCardAssignedToMe.loading = false
      state.getCardAssignedToMe.success = true
      state.getCardAssignedToMe.error = undefined
      state.cardsAssignedToMe = payload as IAssignedCard[]
    })
    builder.addCase(getTaskAssignedToMe.pending, (state) => {
      state.getCardAssignedToMe.loading = true
      state.getCardAssignedToMe.success = false
      state.getCardAssignedToMe.error = undefined
    })
    builder.addCase(getTaskAssignedToMe.rejected, (state, { payload }) => {
      state.getCardAssignedToMe.loading = false
      state.getCardAssignedToMe.success = false
      state.getCardAssignedToMe.error = payload as string
    })
  }
})

export default cardSlice.reducer
export const { setSearchString, setFilter } = cardSlice.actions
