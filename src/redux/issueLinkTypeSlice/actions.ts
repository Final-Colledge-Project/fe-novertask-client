import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  ICreateIssueLinkType,
  IDeleteIssueLinkType,
  IUpdateIssueLinkType
} from './types'
import { enqueueSnackbar } from 'notistack'
import {
  createIssueLinkTypeService,
  deleteIssueLinkTypeService,
  getAllIssueLinkTypes,
  updateIssueLinkTypeService
} from '~/services/issueLinkTypeService'

export const fetchIssueLinkTypes = createAsyncThunk(
  'issueLinkType/fetchIssueLinkTypes',
  async (boardId: string, thunkApi) => {
    try {
      const data = await getAllIssueLinkTypes(boardId, '')
      return data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const createIssueLinkType = createAsyncThunk(
  'issueLinkType/createIssueLinkType',
  async (data: ICreateIssueLinkType, thunkApi) => {
    try {
      await createIssueLinkTypeService(data.boardId, data.data, data.cb)
      thunkApi.dispatch(fetchIssueLinkTypes(data.boardId))
      enqueueSnackbar('Create issue type successfully!', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error'
      })
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const updateIssueLinkType = createAsyncThunk(
  'issueLinkType/updateIssueLinkType',
  async (data: IUpdateIssueLinkType, thunkApi) => {
    try {
      await updateIssueLinkTypeService(
        data.issueLinkTypeId,
        data.boardId,
        data.data,
        data.cb
      )
      thunkApi.dispatch(fetchIssueLinkTypes(data.boardId))
      enqueueSnackbar('Update Issue link type successfully!', {
        variant: 'success'
      })
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error'
      })
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const deleteIssueLinkType = createAsyncThunk(
  'issueLinkType/deleteIssueLinkType',
  async (data: IDeleteIssueLinkType, thunkApi) => {
    try {
      await deleteIssueLinkTypeService(
        data.issueLinkTypeId,
        data.boardId,
        data.cb
      )
      thunkApi.dispatch(fetchIssueLinkTypes(data.boardId))
      enqueueSnackbar('Delete Issue link type successfully!', {
        variant: 'success'
      })
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error'
      })
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
