import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPrioritiesByBoard } from '~/services/priorityService'

export const fetchPriorities = createAsyncThunk(
  'priority/fetchPriorities',
  async (boardId: string, thunkApi) => {
    try {
      const data = await getAllPrioritiesByBoard(boardId, '')
      return data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
