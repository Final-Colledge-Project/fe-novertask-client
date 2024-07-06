import {
  getBoardPermissionByUserId,
  getBoardPermission as getByBoard
} from '~/services/boardPermissionService'
import { getWSPermission as getByWS, getWSPermissionByUserId } from '~/services/workspacePermissionService'
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

export const getWSPermission = createAsyncThunk(
  'permission/getWSPermission',
  async (wsId: string, thunkApi) => {
    try {
      // get all board permission
      const res = await getByWS({ id: wsId })

      if (res) return res.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const getUserPermissionOnBoard = createAsyncThunk(
  'permission/getUserPermissionOnBoard',
  async (userId: string, thunkApi) => {
    try {
      // get all board permission
      const res = await getBoardPermissionByUserId({ userId })

      if (res) return res.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const getUserPermissionOnWS = createAsyncThunk(
  'permission/getUserPermissionOnWS',
  async (userId: string, thunkApi) => {
    try {
      // get all board permission
      const res = await getWSPermissionByUserId({ userId })

      if (res) return res.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)