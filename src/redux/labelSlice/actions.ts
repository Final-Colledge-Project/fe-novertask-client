import { createAsyncThunk } from '@reduxjs/toolkit'

import { enqueueSnackbar } from 'notistack'
import {
  createLabel,
  deleteLabel,
  getAllByBoard,
  updateLabel
} from '~/services/labelService'
import { IDeleteLabelBody } from '~/services/labelService/reqTypes'
import { ICreateLabel, IUpdateLabel } from './types'

export const fetchLabels = createAsyncThunk(
  'label/fetchLabels',
  async (boardId: string, thunkApi) => {
    try {
      const data = await getAllByBoard({ boardId })
      return data?.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const createLabelThunk = createAsyncThunk(
  'label/createLabel',
  async (data: ICreateLabel, thunkApi) => {
    try {
      const { data: payload } = data
      await createLabel(payload)
      thunkApi.dispatch(fetchLabels(payload.boardId))
      enqueueSnackbar('Create label successfully!', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error'
      })
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const updateLabelThunk = createAsyncThunk(
  'label/updateLabel',
  async (data: IUpdateLabel, thunkApi) => {
    try {
      const { data: payload } = data
      await updateLabel(payload)
      thunkApi.dispatch(fetchLabels(payload.boardId))
      enqueueSnackbar('Update label successfully!', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error'
      })
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const deleteLabelThunk = createAsyncThunk(
  'label/deleteLabel',
  async (data: IDeleteLabelBody, thunkApi) => {
    try {
      await deleteLabel(data)
      thunkApi.dispatch(fetchLabels(data.boardId))
      enqueueSnackbar('Delete label successfully!', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error'
      })
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
