import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllByBoard } from '~/services/labelService'

export const getAllLabelByBoardId = createAsyncThunk(
  'label/getAllByBoard',
  async (data: string, thunkApi) => {
    try {
      // get all label by board id
      const res = await getAllByBoard({ boardId: data as string })

      if (res) return res.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
