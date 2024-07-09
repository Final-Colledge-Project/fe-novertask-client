import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createIssueTypeService,
  deleteIssueTypeService,
  getAllIssueTypesByBoard,
  updateIssueTypeService
} from '~/services/issueTypeService'

import { ICreateIssueType, IDeleteIssueType, IUpdateIssueType } from './types'
import { enqueueSnackbar } from 'notistack'

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

export const createIssueType = createAsyncThunk(
  'issueType/createIssueType',
  async (data: ICreateIssueType, thunkApi) => {
    try {
      await createIssueTypeService(data.boardId, data.data, data.cb)
      thunkApi.dispatch(fetchIssueTypes(data.boardId))
      enqueueSnackbar('Create issue type successfully!', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error'
      })
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const updateIssueType = createAsyncThunk(
  'issueType/updateIssueType',
  async (data: IUpdateIssueType, thunkApi) => {
    try {
      await updateIssueTypeService(
        data.issueTypeId,
        data.boardId,
        data.data,
        data.cb
      )
      thunkApi.dispatch(fetchIssueTypes(data.boardId))
      enqueueSnackbar('Update issue type successfully!', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error'
      })
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const deleteIssueType = createAsyncThunk(
  'issueType/deleteIssueType',
  async (data: IDeleteIssueType, thunkApi) => {
    try {
      await deleteIssueTypeService(data.issueTypeId, data.boardId, data.cb)
      thunkApi.dispatch(fetchIssueTypes(data.boardId))
      enqueueSnackbar('Delete issue type successfully!', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error'
      })
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
