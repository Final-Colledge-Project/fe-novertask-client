import { createAsyncThunk } from '@reduxjs/toolkit'
import { getColumnInBoard } from '~/services/columnService'

export const fetchColumns = createAsyncThunk(
  'column/fetchColumns',
  async (boardId: string, thunkApi) => {
    try {
      const data = await getColumnInBoard({ id: boardId })
      console.log('🚀 ~ getColumnInBoard:', data)
      return data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
