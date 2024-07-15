import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import { IGetIssueLogBody } from './reqTypes'
import requests from './requests'
import { IGetIssueLogResponse } from './resTypes'

export const getIssueLog = async (body: IGetIssueLogBody) => {
  try {
    const res = await axiosInstance.get<IGetIssueLogResponse>(
      requests.getIssueLog(body.boardId),
      {
        params: {
          model: body.model,
          id: body.id
        }
      }
    )
    if (res && res.status === 200 && res.data) {
      return res.data
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
