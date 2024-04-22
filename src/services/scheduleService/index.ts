import axiosInstance from '../axiosInstance'
import requests from './request'

export const verifyGoogleToken = async () => {
  try {
    console.log('~~~~~~~~>VerifyGoogleToken')
    const res = await axiosInstance.get(requests.verifyGoogleToken())
    if (res.status === 200) {
      return true
    }
  } catch (error) {
    return false
  }
}

export const getGoogleCalendar = async () => {
  console.log('~~~~~~~~>GetGoogleCalendar');
  try {
    const res = await axiosInstance.get(requests.getGoogleCalendar())
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    return []
  }
}

