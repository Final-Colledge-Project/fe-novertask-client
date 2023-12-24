import axiosInstance from '../axiosInstance'
import requests from './requests'
import { IGetNotificationsByUserIdResponse } from './resTypes'

export const getNotificationByUserId = async () => {
  try {
    const res = await axiosInstance.get<IGetNotificationsByUserIdResponse>(
      requests.getNotificationByUserId
    )
    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    throw new Error('Something went wrong! Please try later.')
  }
}
