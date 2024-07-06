import axiosInstance from '../axiosInstance'
import {
  IAverageAgeReportResponse,
  IGetBurnDownReportResponse,
  IGetVelocityReport,
  ISprintReportResponse
} from './resTypes'
import requests from './request'

export const getBurnDownReport = async (boardId: string, sprintId: string) => {
  try {
    const res = await axiosInstance.get<IGetBurnDownReportResponse>(
      requests.getBurnDownReport(boardId, sprintId)
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

export const getSprintReport = async (boardId: string, sprintId: string) => {
  try {
    const res = await axiosInstance.get<ISprintReportResponse>(
      requests.getSprintReport(boardId, sprintId)
    )
    if (res && res.status === 200 && res.data) {
      return res.data?.data
    }
  } catch (error) {
    throw new Error('Something went wrong! Please try later.')
  }
}

export const getAverageAgeReport = async (
  boardId: string,
  queryString: string
) => {
  try {
    const res = await axiosInstance.get<IAverageAgeReportResponse>(
      requests.getAverageAgeReport(boardId, queryString)
    )
    if (res && res.status === 200 && res.data) {
      return res.data?.data
    }
  } catch (error) {
    throw new Error('Something went wrong! Please try later.')
  }
}
