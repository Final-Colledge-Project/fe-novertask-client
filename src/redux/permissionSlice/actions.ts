import { getBoardPermission as getByBoard } from '~/services/boardPermissionService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getBoardPermission = createAsyncThunk(
  'permission/getBoardPermission',
  async (boardId: string, thunkApi) => {
    try {
      // get all board permission
      const res = await getByBoard({ id: boardId })

      if (res) return res.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
