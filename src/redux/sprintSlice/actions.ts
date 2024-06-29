import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllSprintsByBoard } from '~/services/sprintService'

export const fetchSprints = createAsyncThunk(
  'sprint/fetchSprints',
  async (boardId: string, thunkApi) => {
    try {
      const data = await getAllSprintsByBoard(boardId)
      return data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
