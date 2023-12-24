import { createSlice } from '@reduxjs/toolkit'

export interface IFilterOptions {
  assignToMe?: boolean
}

const initialState: {
  searchString: undefined | string
  filter: IFilterOptions
} = {
  searchString: undefined,
  filter: {
    assignToMe: false
  }
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
  }
})

export default cardSlice.reducer
export const { setSearchString, setFilter } = cardSlice.actions
