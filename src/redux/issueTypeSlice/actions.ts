import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllIssueTypesByBoard } from '~/services/issueTypeService'

export const fetchIssueTypes = createAsyncThunk(
  'issueType/fetchIssueTypes',
  async (boardId: string, thunkApi) => {
    try {
      const data = await getAllIssueTypesByBoard(boardId, '')
      return data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
