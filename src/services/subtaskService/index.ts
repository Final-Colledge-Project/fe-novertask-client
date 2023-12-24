import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import { IGetAllSubtasksBody } from './reqTypes'
import requests from './requests'

export const getAllSubTaskInCard = async (body: IGetAllSubtasksBody) => {
  try {
    const res = await axiosInstance.get(requests.getAllSubtask(body.cardId))
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      throw new Error('Card not found!')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
