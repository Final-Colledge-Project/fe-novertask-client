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

export const markReadNotification = async (notificationId: string) => {
  try {
    const res = await axiosInstance.patch(requests.markReadNotification(notificationId))
    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    throw new Error('Something went wrong! Please try later.')
  }
}

export const markReadAllNotification = async () => {
  try {
    const res = await axiosInstance.patch(requests.markReadAllNotification)
    if (res.status === 200) {
      return res.data
    }
  }
  catch (error) {
    throw new Error('Something went wrong! Please try later.')
  }
}