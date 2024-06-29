import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import { ISprintByBoardResponse } from './resTypes'
import requests from './request'

export const getAllSprintsByBoard = async (boardId: string) => {
  try {
    const res = await axiosInstance.get<ISprintByBoardResponse>(
      requests.getAllByBoard(boardId)
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
