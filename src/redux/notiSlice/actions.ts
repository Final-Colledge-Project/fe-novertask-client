import { createAsyncThunk } from '@reduxjs/toolkit';
import  { getNotificationByUserId as getNotification } from '~/services/notificationService/index';

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
