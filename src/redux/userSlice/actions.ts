import { createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from '~/services'

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_data, thunkApi) => {
    try {
      // sign in
      const res = await userService.getCurrentUser()
      console.log('res: ', res)
      if (res && res.data) {
        // return token for reducer
        return res.data
      }
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
