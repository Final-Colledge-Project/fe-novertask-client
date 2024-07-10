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

export const getAllLabelByBoardId = createAsyncThunk(
  'label/getAllByBoard',
  async (data: string, thunkApi) => {
    try {
      // get all label by board id
      const res = await getAllByBoard({ boardId: data as string })

      if (res) return res.data
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
      thunkApi.dispatch(getAllLabelByBoardId(payload.boardId))
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
      thunkApi.dispatch(getAllLabelByBoardId(payload.boardId))
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
      thunkApi.dispatch(getAllLabelByBoardId(data.boardId))
      enqueueSnackbar('Delete label successfully!', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error'
      })
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
