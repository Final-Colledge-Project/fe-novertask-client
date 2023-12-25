import { createAsyncThunk } from '@reduxjs/toolkit';
import  { getNotificationByUserId as getNotification, markReadAllNotification, markReadNotification } from '~/services/notificationService/index';

export const getNotificationByUserId = createAsyncThunk(
  'notification/getNotificationByUserId',
  async (_data, thunkApi) => {
    try {
      // get all board by current user
      const res = await getNotification();
      if (res) return res.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string);
    }
  }
);

export const getMarkReadNotification = createAsyncThunk(
  'notification/markReadNotification',
  async (notificationId: string, thunkApi) => {
    try {
      // get all board by current user
      const res = await markReadNotification(notificationId);
      if (res) return res.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string);
    }
  }
)

export const getMarkReadAllNotification = createAsyncThunk(
  'notification/markReadAllNotification',
  async (_data, thunkApi) => {
    try {
      // get all board by current user
      const res = await markReadAllNotification();
      if (res) return res.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string);
    }
  }
)
