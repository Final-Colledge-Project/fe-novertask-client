import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import { IGetColumnsInBoardBody } from './reqTypes'
import requests from './requests'
import { IGetColumnsInBoardResponse } from './resTypes'

export const getColumnInBoard = async (body: IGetColumnsInBoardBody) => {
  try {
    const res = await axiosInstance.get<IGetColumnsInBoardResponse>(
      requests.getColumnInBoard(body.id as string)
    )
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    // user is not allowed to
    if (status && status === 409) {
      throw new Error(`UNAUTHORIZED`)
    }
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
