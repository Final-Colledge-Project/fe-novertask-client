import { createSlice } from '@reduxjs/toolkit'
import { fetchColumns } from './actions'
import { IColumn } from '~/services/types'

const columnSlice = createSlice({
  name: 'column',
  initialState: {
    fakeColumn: {
      show: false,
      title: '',
      readyToHide: false
    },
    allColumns: [] as IColumn[],
    loading: false
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
    },
    setColumns: (state, { payload }) => {
      state.allColumns = payload as IColumn[]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchColumns.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchColumns.fulfilled, (state, { payload }) => {
      state.loading = false
      state.allColumns = payload?.data as IColumn[]
    })
    builder.addCase(fetchColumns.rejected, (state) => {
      state.loading = false
    })
  }
})

export default columnSlice.reducer
export const { setFakeColumn, setColumns } = columnSlice.actions
