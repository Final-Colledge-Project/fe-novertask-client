import axiosInstance from '../axiosInstance'
import { IGetAllByUserIdResponse, IGetAllByWSIdResponse } from './resTypes'
import requests from './requests'
import { IGetAllByWSIdBody } from './reqTypes'
import { AxiosError } from 'axios'

export const getAllByUserId = async () => {
  try {
    const res = await axiosInstance.get<IGetAllByUserIdResponse>(
      requests.getAllByUserId
    )

    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    // const status = (error as AxiosError).response?.status

    // // invatation is not exist
    // if (status && status === 500) {
    //   throw new Error(`Invitation is not exist! Please check your email.`)
    // }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const getAllByWSId = async (body: IGetAllByWSIdBody) => {
  try {
    const res = await axiosInstance.get<IGetAllByWSIdResponse>(
      // handle option first
      requests.getAllByWSId(body.wsId)
    )
    if (res && res.data) {
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
