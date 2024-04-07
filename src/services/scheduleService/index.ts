import axiosInstance from '../axiosInstance'
import requests from './request'
export const getGoogleCalendar = async () => {
  try {
    const res = await axiosInstance.get(requests.getGoogleCalendar())
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    throw new Error('Something went wrong! Please try later.')
  }
}
