import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICreateWSBody, createWorkspace } from '~/services/workspaceService'

export const createWS = createAsyncThunk(
  'teamWorkspace/createWS',
  async (data: ICreateWSBody, thunkApi) => {
    try {
      // create workspace
      const res = await createWorkspace(data)

      // return workspace created
      if (res) return res.data

    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
