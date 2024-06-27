import axiosInstance from '../axiosInstance'
import { IGetBurnDownReport, IGetVelocityReport } from './resTypes'
import requests from './request'

export const getBurnDownReport = async (boardId: string, stringId: string) => {
  try {
    const res = await axiosInstance.get<IGetBurnDownReport>(
      requests.getBurnDownReport(boardId, stringId)
    )
    if (res && res.status === 200 && res.data) {
      return res.data?.data
    }
  } catch (error) {
    throw new Error('Something went wrong! Please try later.')
  }
}

export const getVelocityReport = async (boardId: string) => {
  try {
    const res = await axiosInstance.get<IGetVelocityReport>(
      requests.getVelocityReport(boardId)
    )
    if (res && res.status === 200 && res.data) {
      return res.data?.data
    }
  } catch (error) {
    throw new Error('Something went wrong! Please try later.')
  }
}
