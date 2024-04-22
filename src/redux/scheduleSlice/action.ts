import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '~/services/axiosInstance'
import { verifyGoogleToken } from '~/services/scheduleService'
import requests from '~/services/scheduleService/request'

export const syncGoogleEvents = createAsyncThunk(
  'schedule/syncGoogleEvents',
  async (id: string, thunkApi) => {
    try {
      const isValid = await verifyGoogleToken()
      if (!isValid) {
        const dataRes = await axiosInstance.get(
          requests.loginGoogleCalendar(id)
        )
        console.log('🚀 ~ dataRes:', dataRes)
      } else {
        const res = await axiosInstance.get(requests.getGoogleCalendar())
        console.log('🚀 ~ res:', res)
        return res
      }
      const dataRes = await axiosInstance.get(requests.loginGoogleCalendar(id))
      console.log('🚀 ~ dataRes:', dataRes)
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const getGoogleCalendar = createAsyncThunk(
  'schedule/getGoogleCalendar',
  async () => {
    try {
      const res = await axiosInstance.get(requests.getGoogleCalendar())
      return res
    } catch (error) {
      return []
    }
  }
)
