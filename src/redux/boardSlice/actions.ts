import { getAllByUserId as getAll } from '~/services/boardService/index'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getAllByUserId = createAsyncThunk(
  'board/getAllByUserId',
  async (_data, thunkApi) => {
    try {
      // get all board by current user
      const res = await getAll()
      console.log('✨ ~ file: actions.ts:10 ~ res:', res)

      if (res) return res.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
