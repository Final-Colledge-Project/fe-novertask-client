import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createPriorityService,
  deletePriorityService,
  getAllPrioritiesByBoard,
  updatePriorityService
} from '~/services/priorityService'
import { ICreatePriority, IDeletePriority, IUpdatePriority } from './types'
import { enqueueSnackbar } from 'notistack'

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

export const createPriority = createAsyncThunk(
  'priority/createPriority',
  async (data: ICreatePriority, thunkApi) => {
    try {
      await createPriorityService(data.boardId, data.data, data.cb)
      thunkApi.dispatch(fetchPriorities(data.boardId))
      enqueueSnackbar('Create priority successfully!', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error'
      })
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const updatePriority = createAsyncThunk(
  'priority/updatePriority',
  async (data: IUpdatePriority, thunkApi) => {
    try {
      await updatePriorityService(
        data.priorityId,
        data.boardId,
        data.data,
        data.cb
      )
      thunkApi.dispatch(fetchPriorities(data.boardId))
      enqueueSnackbar('Update priority successfully!', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error'
      })
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const deletePriority = createAsyncThunk(
  'priority/deletePriority',
  async (data: IDeletePriority, thunkApi) => {
    try {
      await deletePriorityService(data.priorityId, data.boardId, data.cb)
      thunkApi.dispatch(fetchPriorities(data.boardId))
      enqueueSnackbar('Delete priority successfully!', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error'
      })
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
