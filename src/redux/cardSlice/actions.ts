import { createAsyncThunk } from '@reduxjs/toolkit';
import { cardAssignToMe } from '~/services/cardService';


export const getTaskAssignedToMe = createAsyncThunk(
  'card/getTaskAssignedToMe',
  async (_data, thunkApi) => {
    try {
      // get all board by current user
      const res = await cardAssignToMe()
      console.log("========================>🚀 ~ file: actions.ts:11 ~ res:", res)

      if (res) return res.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)