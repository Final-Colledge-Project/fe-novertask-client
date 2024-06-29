import { createAsyncThunk } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import {
  addSchedules,
  getSchedulesByUserId,
  updateSchedule
} from '~/services/scheduleService'
import {
  IAddScheduleDto,
  IUpdateScheduleDto
} from '~/services/scheduleService/reqTypes'

export const getSchedules = createAsyncThunk(
  'schedule/getSchedules',
  async (_, thunkApi) => {
    try {
      // get all schedules by current user
      const res = await getSchedulesByUserId()

      if (res) return res.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const addSchedule = createAsyncThunk(
  'schedule/addSchedule',
  async (data: IAddScheduleDto, thunkApi) => {
    try {
      await addSchedules(data)
      thunkApi.dispatch(getSchedules())
    } catch (err) {
      const message = 'Add schedule failed! Please try again.'
      enqueueSnackbar(message, { variant: 'error' })
    }
  }
)

export const updateScheduleReducer = createAsyncThunk(
  'schedule/updateSchedule',
  async ({ id, data }: { id: string; data: IUpdateScheduleDto }, thunkApi) => {
    try {
      await updateSchedule(id, data)
      thunkApi.dispatch(getSchedules())
      enqueueSnackbar('Update schedule successfully!', { variant: 'success' })
    } catch (err) {
      const message = 'Update schedule failed! Please try again.'
      enqueueSnackbar(message, { variant: 'error' })
    }
  }
)
