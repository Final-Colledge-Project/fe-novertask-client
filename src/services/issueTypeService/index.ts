import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import requests from './request'
import { IIssueTypeResponse } from './resTypes'
export const getAllIssueTypesByBoard = async (
  boardId: string,
  query: string
) => {
  try {
    const res = await axiosInstance.get<IIssueTypeResponse>(
      requests.getAllByBoard(boardId, query)
    )
    if (res && res.status === 200 && res.data) {
      return res.data?.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status
    const message = (error as AxiosError).message
    if (status && status.toString().startsWith('4')) {
      throw new Error(message)
    }
    throw new Error('Something went wrong! Please try later.')
  }
}
