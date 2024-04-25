import { createSlice } from '@reduxjs/toolkit'

const columnSlice = createSlice({
  name: 'column',
  initialState: {
    fakeColumn: {
      show: false,
      title: '',
      readyToHide: false
    }
  },
  reducers: {
    setFakeColumn: (
      state,
      {
        payload
      }: {
        payload: {
          show: boolean
          title: string
          readyToHide: boolean
        }
      }
    ) => {
      state.fakeColumn = { ...payload }
    }
  }
})

export default columnSlice.reducer
export const { setFakeColumn } = columnSlice.actions
