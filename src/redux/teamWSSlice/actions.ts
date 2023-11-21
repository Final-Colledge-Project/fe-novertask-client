import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  ICreateWSBody,
  IGetMemberBody,
  createWorkspace,
  getMembers
} from '~/services/workspaceService'

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

export const getAllMembers = createAsyncThunk(
  'teamWorkspace/getAllMembers',
  async (data: IGetMemberBody, thunkApi) => {
    try {
      // create workspace
      const res = await getMembers(data)

      // return workspace created
      if (res) return res.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
